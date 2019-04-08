//modules/index.js => rootReducer
import {combineReducers } from 'redux';
import {connectRouter } from 'connected-react-router';
import counter from './counter';
import account from '../reducers/account';

export default (history) => combineReducers ({
    router: connectRouter(history),
    counter,
    account
});