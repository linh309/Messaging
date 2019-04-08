import React from 'react';
import {connect} from 'react-redux';



class Welcome extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
                <div className="jumbotron">
                    {this.props.username !== undefined && this.props.username !== ''
                        ? (
                            <div>
                                <h2 className="display-4">Welcome {this.props.username}</h2>
                                <p class="lead">
                                    <button className="btn btn-primary btn-lg">Start Messaging</button>
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
        username: account.currentUser.username,
        avatar: account.currentUser.avatar
    }    
}

export default connect(
    mapStateToProps,
    null
)(Welcome)
