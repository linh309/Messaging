import React from 'react';
import {accountRef} from "../config/firebase";
import {connect} from 'react-redux';
import {push} from 'connected-react-router';
import {AccountAction} from '../common/constants'

class Message extends React.Component {
    constructor(props) {
        super(props);
    }

    

    render() {
        return (
            <div className="row">
                <div className='col-12'>
                    <h1>Message</h1>
                </div>
                <div className='col-3'>
                    <div className="list-group list-user">
                        <a href="#" className="list-group-item list-group-item-action flex-column align-items-start active">
                            <img className="user-avatar" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01.jpg" alt="avatar" />
                            <div class="about">
                                <div class="name">Vincent Porter</div>
                                <div class="status">
                                    <i class="fa fa-circle online"></i> online
                                </div>
                            </div>
                        </a>
                        <a href="#" className="list-group-item list-group-item-action flex-column align-items-start">
                            <img className="user-avatar" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01.jpg" alt="avatar" />
                            <div class="about">
                                <div class="name">Vincent Porter</div>
                                <div class="status">
                                    <i class="fa fa-circle online"></i> Last seen 5 days ago
                                </div>
                            </div>                          
                        </a>
                    </div>
                </div>
                <div className='col-9'>

                </div>
            </div>
        );
    }
}

export default connect(
    null,
    null
)(Message)