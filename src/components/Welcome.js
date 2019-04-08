import React from 'react';
import {connect} from 'react-redux';
import {accountRef} from "../config/firebase";
import {push} from 'connected-react-router';
import {AccountAction} from '../common/constants';

class Welcome extends React.Component {
    constructor(props) {
        super(props);
        this.onStartMessaging = this.onStartMessaging.bind(this);
    }

    onStartMessaging(e) {        
        const that = this;
        accountRef.once("value", snapshot => {
            const friendList = [];
            snapshot.forEach((item) => {                               
                const user = item.val(); 
                const userkey = item.key;                
                if (user !== null && that.props.userkey !== userkey ) {                    
                    friendList.push({
                        userkey: userkey, 
                        username: user.username,
                        avatar: user.avatarurl,
                        isLogin: user.isLogin!==undefined?user.isLogin:false
                    });                    
                }
            })

            //Update state
            that.props.dispatch({    
                type: AccountAction.StartMessaging,
                data: {
                    currentUser: {
                        friendList: friendList
                    }
                }
            });

            //Redirect to Message page
            that.props.dispatch(push('/Message'));
        })
    }

    render() {
        return (
                <div className="jumbotron">
                    {this.props.username !== undefined && this.props.username !== ''
                        ? (
                            <div>
                                <img alt="avatar" src={this.props.avatar} />
                                <h2 className="display-4">Welcome {this.props.username}</h2>
                                <p className="lead">
                                    <button className="btn btn-primary btn-lg" onClick={this.onStartMessaging}>Start Messaging</button>
                                </p>
                            </div>
                        ) 
                        : (
                            <h2 className="display-4">Welcome Guest!</h2>
                        )
                    }
                </div>
        );
    }
}

const mapStateToProps = ({account}) => {    
    return {
        userkey: account.currentUser.userkey,
        username: account.currentUser.username,
        avatar: account.currentUser.avatar
    }    
}

export default connect(
    mapStateToProps,
    null
)(Welcome)