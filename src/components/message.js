import React from 'react';
import {conversationRef} from "../config/firebase";
import {connect} from 'react-redux';
import {push} from 'connected-react-router';
import {AccountAction} from '../common/constants'

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
        // const sendMessageAction = AccountAction.SendMessage     
        // const that = this;        
        // debugger;

        // if (this.props.conversationKey !==undefined && this.props.conversationKey !== "") {                 
        //     debugger;
        //     conversationRef
        //     .child(this.props.conversationKey)
        //     .on("value", snapshot => {
        //         debugger;
        //         const conversation = that.props.conversationKey !== "" 
        //                                 ?  snapshot.val()[that.props.conversationKey]
        //                                 : null;                                        
        //         if (conversation !== null && conversation !== undefined && conversation.messages !== undefined && conversation.messages.length) {
        //             const messages =  conversation.messages;                    
        //             that.props.dispatch({
        //                 type: sendMessageAction,
        //                 data: {
        //                     conversationKey: that.props.conversationKey,
        //                     messages: messages
        //                 }
        //             })                   
        //         }
        //     })
        // }
        debugger;
        const convKey = this.props.conversationKey;
        const that = this;
        const sendMessageAction = AccountAction.SendMessage;
        if (this.props.conversationKey !== undefined && this.props.conversationKey !== "") {      
            conversationRef
                .child(convKey)
                .on("value", snapshot => {
                    debugger;
                    const convData = snapshot.val();
                    const messages = convData !== null && convData !== undefined ? convData.messages : null;
                    if (messages !== null) {                                 
                        that.props.dispatch({
                            type: sendMessageAction,
                            data: {
                                conversationKey: convKey,
                                messages: messages
                            }
                        })                   
                    }
                })
        }        
    }
    
    onSendMessage(e) {                 
        const content = this.messageContent.value;   
        const sendDate = (new Date()).getTime();
        const that = this;
        const sendMessageAction = AccountAction.SendMessage

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

        // conversationRef
        //     .orderByKey()
        //     .equalTo(this.props.conversationKey)
        //     .on("value", snapshot => {                
        //         const conversation =  snapshot.val()[that.props.conversationKey];
        //         if (conversation !== null && conversation !== undefined) {
        //             const messages =  conversation.messages;                    
        //             that.props.dispatch({
        //                 type: sendMessageAction,
        //                 data: {
        //                     conversationKey: that.props.conversationKey,
        //                     messages: messages
        //                 }
        //             })                   
        //         }
        //     })
        
        e.preventDefault();
    }

    getMessageList() {
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