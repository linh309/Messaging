//reducer/account
import {initialState} from '../common/initialState';
import {AccountAction} from '../common/constants';
import {accountRef} from "../config/firebase";

export default (state = initialState, action) => {
    switch (action.type) {
        case AccountAction.Register:
            return Object.assign(
                {}, 
                state, 
                action.data);

        case AccountAction.StartMessaging:        
            debugger;    
            var xxx= Object.assign(
                {}, 
                state, 
                {
                    currentUser: { 
                        friendList: action.data.friendList 
                    }
                }
            )
            return xxx;

        case AccountAction.Login:
            //User is current logged so just need to update against to database
            const userRef = accountRef.child(action.data.currentUser.userkey);
            userRef.update({
                isLogin: true,
                lastLogin: new Date()
            });    

            const currentUser =   Object.assign(
                {}, 
                state.currentUser, 
                action.data.currentUser);

            return Object.assign(
                {}, 
                state, 
                {currentUser});
        
        case AccountAction.InitializeMessage:
            debugger;
            const currentState =  Object.assign(
                {}, 
                state, 
                action.data);
                //Currently, always get fetching data by UserFromKey with current user
            return currentState;
        
        default:
            return state;
    }
};