//reducer/account
import {initialState} from '../common/initialState';
import {AccountAction} from '../common/constants';
import {accountRef} from "../config/firebase";

export default (state = initialState, action) => {
    switch (action.type) {
        case AccountAction.Register:      
        case AccountAction.StartMessaging:
            return Object.assign(
                {}, 
                state, 
                action.data);

        case AccountAction.Login:
            //User is current logged so just need to update against to database
            const userRef = accountRef.child(action.data.currentUser.userkey);
            userRef.update({
                isLogin: true,
                lastLogin: new Date()
            });           

            return Object.assign(
                {}, 
                state, 
                action.data);
        default:
            return state;
    }
};