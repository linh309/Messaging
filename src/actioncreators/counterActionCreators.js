// export const increment = dispatch => {
//     //describe action need to dispatched to redurcer
//     dispatch({
//         type: "Incrementing",
        
//     });
// }



import {push} from 'connected-react-router';

export const increment = () => {
    return dispatch => {
      dispatch({
        type: "Incrementing"
      })
    }
}



