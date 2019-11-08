import * as userTypes from '../actions/usersActions';

const initialState = {
    users: [],
    loading: false,
    error: ''
};

const getUsersStart = (state, action) => {
    return {
        ...state, loading: true
    };
};

const getUsersSuccess = (state, action) => {
    return {
        ...state,
        users: action.users,
        loading: false
    };
};

const getUsersFail = (state, action) => {
    return {
        users: [],
        loading: false,
        error: action.error
    };
};

export const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case userTypes.GET_USERS_START:
            return getUsersStart(state, action);
        case userTypes.GET_USERS_SUCCESS:
            return getUsersSuccess(state, action);
        case userTypes.GET_USERS_FAIL:
            return getUsersFail(state, action);
        default:
            return state;
    }
};

export default usersReducer;
