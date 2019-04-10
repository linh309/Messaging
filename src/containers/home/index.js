//container/home/index.js
import React from 'react';
import {push} from 'connected-react-router';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {increment} from '../../actioncreators/counterActionCreators'

const Home = (props) => (
    <div className="row">
        <div className="col-sm-12">
            <div className="jumbotron">
                <h3 className="display-4">Welcome to messaging app</h3>
                <p className="lead">If you don't have account, please register new account.</p>
                <p >If you already have the account, please click login to continute.</p>                    
            </div>
    

        </div>
    </div>
);

export default Home;