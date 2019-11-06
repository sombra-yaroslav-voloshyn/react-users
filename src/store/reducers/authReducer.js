import * as authActions from './../actions/authActions';

const initialState = {
    token: localStorage.getItem('token') ? localStorage.getItem('token') : null,
    userId: null,
    error: null,
    loading: false
};

const authStart = (state, action) => {
    return {
        ...state,
        error: null,
        loading: true
    };
};

const authSuccess = (state, action) => {
    return {
        ...state,
        token: action.idToken,
        userId: action.userId,
        error: null,
        loading: false
    };
};

const authFail = (state, action) => {
    return {
        ...state,
        error: action.error,
        loading: false
    };
};

const authLogout = (state, action) => {
    return {
        ...state,
        token: null,
        userId: null,
        error: action.message
    };
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case authActions.AUTH_START: return authStart(state, action);
        case authActions.AUTH_SUCCESS: return authSuccess(state, action);
        case authActions.AUTH_FAIL: return authFail(state, action);
        case authActions.LOGOUT: return authLogout(state, action);
        default:
            return state
    }
};


export default authReducer;
