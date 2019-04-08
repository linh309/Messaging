import React from 'react';
import {accountRef} from "../config/firebase";
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

class Message extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="row" className="message">
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

                        </div>
                        <div className="card-footer text-muted bg-white no-border-radius">
                            <form className="form-inline">
                                <div className="form-group mx-sm-3 mb-2 col-sm-9 margin-left-0">                                    
                                    <input type="text" class="form-control" placeholder="messages" style={{width: "100%"}} />                                
                                </div>
                                <button type="submit" class="btn btn-primary mb-2">Send</button>
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
        friendList: account.currentUser.friendList
    }
}

export default connect(
    mapStateToProps,
    null
)(Message)