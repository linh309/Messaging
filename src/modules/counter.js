const initialState = {
    count: 0,
    isIncrementing: false,
    isDecrementing: false
};

//define reducer will return new state
export default (state = initialState, action) => {
    switch (action.type) {
        case "Incrementing":
            return {
                ...state,
                count: state.count + 1,
                isIncrementing: !state.isIncrementing
            };
        case "Decrementing":
            return {
                ...state,
                count: state.count - 1,
                isDecrementing: !state.isDecrementing
            }
        default:
            return state;
    }
};