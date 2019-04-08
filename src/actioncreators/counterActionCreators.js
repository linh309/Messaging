// export const increment = dispatch => {
//     //describe action need to dispatched to redurcer
//     dispatch({
//         type: "Incrementing",
        
//     });
// }



import {push} from 'connected-react-router';

export const increment = () => {
    // debugger;
    // push('/about-us');
    return dispatch => {
      dispatch({
        type: "Incrementing"
      })
    }
}



