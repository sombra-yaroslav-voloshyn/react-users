import * as authActions from './../actions/authActions';

const initialState = {
    authenticated: localStorage.getItem('authenticated') ? localStorage.getItem('authenticated') : false
};


const authReducer = (state = initialState, action) => {
    if (action.type === authActions.AUTHENTICATED) {
        return {
            ...state,
            authenticated: action.authenticated
        };
    }
    return state;
};


export default authReducer;
