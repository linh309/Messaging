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
            const newState = Object.assign(
                {},
                state, 
                {
                    currentUser: Object.assign({}, {...state.currentUser}, {...action.data.currentUser}),
                    currentMessaging: Object.assign({}, {...state.currentMessaging}, {...action.data.currentMessaging})
                }
            );

            return newState;

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
                {
                    currentUser: Object.assign({}, state.currentUser, action.data.currentUser)
                }
            );
        
        case AccountAction.InitializeMessage:        
            const currentState =  Object.assign(
                {}, 
                state, 
                {
                    conversations: action.data.conversations,
                    currentMessaging: Object.assign({}, state.currentMessaging, action.data.currentMessaging)
                }
            );

            //Currently, always get fetching data by UserFromKey with current user
            return currentState;
        
        case AccountAction.SendMessage:
            debugger;
            const conversations = [];
            state.conversations.map((conv) => {
                if (conv.conversationKey === action.data.conversationKey) {
                    conv.messages = action.data.messages;
                }

                conversations.push(conv);
            });

            const state1 =  Object.assign(
                {},
                state, 
                {
                    conversations: conversations                    
                });

            return state1;                

        default:
            return state;
    }
};