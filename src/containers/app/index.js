//container/app/index.js
//1. Navigation Header
//2. Containing component need to be rendered

import React from 'react';
import {Route, Link, Redirect } from 'react-router-dom';
import Home from '../home';
import About from '../about';
import Register from '../../components/register';
import Welcome from '../../components/Welcome';
import Login from '../../components/login';
import Message from '../../components/message';
import {connect} from 'react-redux';

//need to include home and about components
const App = (props) => (
    <div className="container">
        <div className="row">
            <div className="col-sm-12">                
                <header>
                    <Link to='/'>Home</Link>
                    <Link to='/about-us'>About</Link>
                    <Link to='/register'>Register</Link>
                    <Link to='/Welcome'>Welcome</Link>
                    <Link to='/Login'>Login</Link>
                    <Link to='/message'>Message</Link>
                    <span>Hello {props.username}</span>
                </header>
            </div>
            <main className="col-sm-12">
                <Route exact path="/" component={Home} />
                <Route exact path = '/about-us' component={About} />
                <Route exact path = '/register' component={Register} />
                <Route exact path = '/Welcome' component={Welcome} />
                <Route exact path = '/Login' component={Login} />
                <Route exact path = '/message' component={Message} />            
            </main>
        </div>   
    </div>   
)

const mapStateToProps = ({account}) => {
    return {        
        username: account.currentUser.username
    }
};

export default connect(
    mapStateToProps,
    null)
(App);