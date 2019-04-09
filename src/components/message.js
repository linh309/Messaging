import React from 'react';
import {database, conversationRef} from '../config/firebase';
import {connect} from 'react-redux';
import {push} from 'connected-react-router';
import {AccountAction, FirebasePath} from '../common/constants'

const FriendList = (props) => {
    if (props.list===null || props.list===undefined) return null;
    const activeClass = "list-group-item list-group-item-action flex-column align-items-start";
    const list = props.list.map((item, index)=> 
        
        <button key={item.userkey} href="#" className={index==0?activeClass+" active":activeClass}>
             <img className="user-avatar" src={item.avatar} alt="avatar" />
             <div className="about">
                <div className="name">{item.username}</div>
                <div className="status">
                    <i className="fa fa-circle online"></i> online
                </div>
            </div>
        </button>
    )

    return (
        <div className="list-group list-user">
            {list}
        </div>
    );    
}

const MessageItem = (props) => {
    {if (props.sentFromUserKey === props.currentUserKey) {
        return (
            <p className="list-group-item list-group-item-action message-from right">
                <span className="list-group-item-primary message-text">{props.content}</span>
            </p>
        )
    } else if (props.senToUserKey === props.currentUserKey) {
        return (
            <p className="list-group-item list-group-item-action message-from left">
                <span className="list-group-item-secondary message-text">{props.content}</span>
            </p>
        )
    }}
}

const MessageList = (props) => {
    const messageList = props.messageList.map((item, index) => 
        <MessageItem 
            key={index}
            sentFromUserKey={item.sentFromUserKey}   
            senToUserKey={item.sentFromUserKey}   
            currentUserKey={item.currentUserKey}  
            content = {item.content}    
        /> 
    )

    return (
        <div className="list-group">
            {messageList}
        </div>
    );
}

class Message extends React.Component {
    constructor(props) {
        super(props);
        this.onSendMessage = this.onSendMessage.bind(this);
        this.getMessageList = this.getMessageList.bind(this);
        
    }

    componentDidMount() {
        const that = this;
        const convRef = database.ref(FirebasePath.conversations);
        const sendMessageAction = AccountAction.SendMessage;

        convRef.on("value", snapshot => {            
            const conversations = snapshot.val();
            if (conversations != null ) {
                const convKeys = Object.keys(conversations);
                convKeys.forEach((key) => {
                    const conversationData = conversations[key];
                    const chatUsers = [that.props.fromUserKey, that.props.toUserKey];
                    if (chatUsers.indexOf(conversationData.fromUserKey) >= 0 && chatUsers.indexOf(conversationData.toUserKey) >= 0) {
                        const messages = conversationData !== null && conversationData !== undefined ? conversationData.messages : null;
                        if (messages !== null) {
                            that.props.dispatch({
                                type: sendMessageAction,
                                data: 
                                    {
                                        conversation: {
                                            conversationKey: key,
                                            fromUserKey: conversationData.fromUserKey,
                                            toUserKey: conversationData.toUserKey,
                                            lastSentMessageDate: conversationData.lastSentMessageDate,      
                                            messages: messages
                                        }
                                    }
                                }
                            )
                        }
                    }
                })
            }
        })
    }
    
    onSendMessage(e) {    
        const content = this.messageContent.value;   
        const sendDate = (new Date()).getTime();
        const that = this;
        const convRef = database.ref(FirebasePath.conversations);

        convRef.once("value", snapshot => {
            const isExisted = snapshot.val() !== null;
            if (!isExisted) {                
                convRef.push().set({
                    fromUserKey: that.props.fromUserKey,
                    toUserKey: that.props.toUserKey,
                    lastSentMessageDate: sendDate,
                    messages: [{
                        content : content,
                        sendDate : sendDate,
                        sentFromUserKey : that.props.fromUserKey,
                        sentToUserKey : that.props.toUserKey
                    }]
                });
            }
            else {
                conversationRef
                    .child(this.props.conversationKey + "/messages")
                    .once("value", snapshot => {
                        const currentMessages =  snapshot.val();            
                        const messages = currentMessages === null || currentMessages === undefined ? [] : currentMessages;
                        const updatedConversationRef = conversationRef.child(that.props.conversationKey);

                        //add new message
                        messages.push({
                            content,
                            sendDate,
                            sentFromUserKey: that.props.fromUserKey,
                            sentToUserKey: that.props.toUserKey,
                        });

                        //Update messages for conversation
                        updatedConversationRef.update({
                            messages: messages              
                        });

                        //Each time a message is sent need to update lastSentMessageDate
                        const conv = conversationRef.child(this.props.conversationKey);
                        conv.update({                    
                            lastSentMessageDate: (new Date()).getTime()
                        });

                        this.messageContent.value = "";
                    })
            }

            this.messageContent.value = "";
        });
        
        e.preventDefault();
    }

    getMessageList() {
        debugger;
        const messageList = [];
        const that = this;
        const currentConversation = this.props.conversations.filter(c => c.conversationKey === this.props.conversationKey);
        const messages = currentConversation.length 
                            && currentConversation[0].messages !== undefined 
                            && currentConversation[0].messages.length
                        ? currentConversation[0].messages
                        : null;
        
        if (messages !== null) {
            messages.map(itemMessage => {
                messageList.push({
                    sentFromUserKey: itemMessage.sentFromUserKey,
                    sentToUserKey: itemMessage.sentToUserKey,
                    currentUserKey: that.props.currentUserKey,
                    content: itemMessage.content
                })
            })
        }
        
        return messageList;
    }

    render() {
        return (
            <div className="row message">
                <div className='col-12'>
                    <h1>Message</h1>
                </div>
                <div className='col-3'>
                    <FriendList list={this.props.friendList} />
                </div>
                <div className='col-9'>
                    <div className="card text-white bg-info no-border-radius">
                        <div className="card-header"><h4>Messages</h4></div>
                        <div className="card-body bg-white" style={{overflow: "scroll", height: "600px"}}>
                            <div className="list-group">
                                <MessageList messageList={this.getMessageList()}  />                              
                            </div>
                        </div>
                        <div className="card-footer text-muted bg-white no-border-radius">
                            <form className="form-inline" onSubmit={this.onSendMessage}>
                                <div className="form-group mx-sm-3 mb-2 col-sm-9 margin-left-0">                                    
                                    <input type="text" name="messageContent" ref={(input) => this.messageContent = input} className="form-control" placeholder="messages" style={{width: "100%"}} />                                
                                </div>
                                <button type="submit" className="btn btn-primary mb-2">Send</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({account}) => {
    return {        
        currentUserKey: account.currentUser.userkey,        
        friendList: account.currentUser.friendList,        
        fromUserKey: account.currentMessaging.fromUserKey,
        toUserKey: account.currentMessaging.toUserKey,
        conversationKey: account.currentMessaging.conversationKey,
        conversations: account.conversations
    }
}

export default connect(
    mapStateToProps,
    null
)(Message)