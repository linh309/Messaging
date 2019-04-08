//reducer/account
import {initialState} from '../common/initialState';
import {AccountAction} from '../common/constants'

export default (state = initialState, action) => {
    switch (action.type) {
        case AccountAction.Register:            
        case AccountAction.Login:           
            return Object.assign(
                {}, 
                state, 
                action.data);
        default:
            return state;
    }
};