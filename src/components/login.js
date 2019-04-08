import React from 'react';
import {accountRef} from "../config/firebase";
import {connect} from 'react-redux';
import {push} from 'connected-react-router';
import {AccountAction} from '../common/constants';

class Login extends React.Component {
    constructor(props) {
        super(props);       
        this.handleChange = this.handleChange.bind(this);
        this.onLogin = this.onLogin.bind(this);
    }

    handleChange(e) {
        const value = e.target.value;
        const field = e.target.name;
        switch (field) {
            case "username":
                this.setState({
                    username: value
                });
                break;
            case "password":
                this.setState({
                    password: value
                });
                break;                   
        }
    }

    onLogin(e) {
        const that = this;
        const stateUserName = this.state.username;
        const statePassword = this.state.password;

        accountRef
            .orderByChild("username")
            .equalTo(this.state.username)
            .on('value', (snapshot) => {
                const data = snapshot.val();
                const isExisted = data !== null;

                if (isExisted) {
                    snapshot.forEach((userData)=> {
                        const userId = userData.key;
                        const user = userData.val();
                        if (user.username===stateUserName && user.password === statePassword)
                        {
                            that.props.dispatch
                            ({
                                type: AccountAction.Login,
                                data: {
                                    currentUser: {
                                        username: user.username,
                                        avatar: user.avatarurl
                                }}
                            }) 
    
                            that.props.dispatch(push('/Welcome'));
                        }
                        else {                            
                            alert("Wrong user name or password");                            
                        }
                    })
                } else {
                    alert("Wrong user name or password");
                }
            })

        e.preventDefault();

    }

    render() {
        return (
            <div className="row justify-content-center align-items-center">
                <div className="col-4">
                    <div className="card">
                        <div className="card-body">
                            <form onSubmit={this.onLogin} autoComplete="off">
                                <div className="form-group">
                                    <input type="text" className="form-control" name="username" value={this.state.username} onChange={this.handleChange}/>
                                </div>
                                <div className="form-group">
                                    <input type="password" className="form-control" name="password"  value={this.state.password} onChange={this.handleChange}/>
                                </div>
                                <button type="submit" id="sendlogin" className="btn btn-primary">login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        username: state.currentUser.username,
        password: ''
    }
};

export default connect(
    null,
    null
)(Login)

