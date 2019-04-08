import React from 'react';
import {accountRef} from "../config/firebase";
import {connect} from 'react-redux';
import {push} from 'connected-react-router';
import {AccountAction} from '../common/constants'


class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            dateofbirth: null,
            gender: '',
            avatarurl: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.onRegisterAccount = this.onRegisterAccount.bind(this);
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
            
            case "dateofbirth":
                this.setState({
                    dateofbirth: value
                });
                break;
            
            case "gender":
                this.setState({
                    gender: value
                });
                break;
            
            case "avatarurl":
                this.setState({
                    avatarurl: value
                });
                break;
                
        }
    }

    onRegisterAccount(e) {
        //create account on firebase
        accountRef.push().set({
            username: this.state.username,
            password: this.state.password,
            dateofbirth: this.state.dateofbirth,
            gender: this.state.gender,
            avatarurl: this.state.avatarurl,
        });

        this.props.dispatch({
            type: AccountAction.Register,
            data: {
                currentUser: {
                    username: this.state.username,
                    avatar: this.state.avatarurl
                }
            }
        })
        this.props.dispatch(push('/Welcome'))
        e.preventDefault();
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onRegisterAccount}>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">User Name</label>
                        <div className="col-sm-10">
                            <input type="text" name="username" value={this.state.username} onChange={this.handleChange} className="form-control" placeholder="User Name" />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Password</label>
                        <div className="col-sm-10">
                            <input type="password" name="password" value={this.state.password} onChange={this.handleChange}  className="form-control" placeholder="Password" />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Date of birth</label>
                        <div className="col-sm-10">
                            <input type="date" name="dateofbirth" value={this.state.dateofbirth} onChange={this.handleChange}  className="form-control" placeholder="Date of birth" />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Gender</label>
                        <div className="col-sm-10">                            
                            <select name="gender" className="form-control" value={this.state.gender} onChange={this.handleChange}>
                                <option value=""></option>
                                <option value="Famle">Famle</option>
                                <option value="Female">Female</option>                                
                            </select>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Avatar Url</label>
                        <div className="col-sm-10">
                            <input type="text" name="avatarurl" value={this.state.avatarurl} onChange={this.handleChange} className="form-control" placeholder="Avatar Url" />
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-sm-2"></div>
                        <div className="col-sm-10">
                            <button type="submit" className="btn btn-primary">Register</button>
                            <button className="btn btn-danger">Cancel</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default connect(
    null,
    null
)(Register)



