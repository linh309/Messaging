import React from 'react';
import {accountRef, todoRef, conversationRef} from "../config/firebase";
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
    const messageList = props.messageList.map((item) => 
        <MessageItem 
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
    }

    onSendMessage(e) {
        const messageContent = this.messageContent.value;   
        const sendDate = (new Date()).getTime();

        conversationRef.push().set({
            fromUserKey: this.props.fromUserKey,
            toUserKey: this.props.toUserkey,
            messages: [
                {
                    sentFromUserKey: this.props.fromUserKey,
                    sentToUserKey: this.props.toUserkey,
                    sentDate: sendDate,
                    content: messageContent
                }
            ]
        });

        e.preventDefault();
    }

    render() {
        const messageList = [];
        const that = this;
        this.props.conversations.forEach((item)=>{
            if (item.fromUserKey === this.props.fromUserKey && item.toUserKey === this.props.toUserKey) {
                item.messages.forEach((itemMessage, index) => {
                    messageList.push({
                        sentFromUserKey: itemMessage.sentFromUserKey,
                        sentToUserKey: itemMessage.sentToUserKey,
                        currentUserKey: that.props.currentUserKey,
                        content: itemMessage.content
                    })
                })
            }     
        })

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
                        <div className="card-body bg-white">
                            <div className="list-group">
                                <MessageList messageList={messageList}  />                              
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
        fromUserKey: account.currentMessaging.fromUserKey,
        toUserKey: account.currentMessaging.toUserKey,
        friendList: account.currentUser.friendList,
        conversations: account.conversations,
        currentUserKey: account.currentUser.userkey
    }
}

export default connect(
    mapStateToProps,
    null
)(Message)