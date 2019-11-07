import * as userTypes from '../actions/userActions';

const initialState = {
    user: {},
    loading: false,
    error: ''
};

const putUsersStart = (state, action) => {
    return {
        ...state, loading: true
    };
};

const putUsersSuccess = (state, action) => {
    return {
        ...state,
        user: action.user,
        loading: false
    };
};

const putUsersFail = (state, action) => {
    return {
        ...state,
        loading: false,
        error: action.error
    };
};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case userTypes.PUT_USER_START:
            return putUsersStart(state, action);
        case userTypes.PUT_USER_SUCCESS:
            return putUsersSuccess(state, action);
        case userTypes.PUT_USER_FAIL:
            return putUsersFail(state, action);
        default:
            return state;
    }
};

export default userReducer;
