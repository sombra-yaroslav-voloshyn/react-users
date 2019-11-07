import axios from '../../axios-users';

export const PUT_USER_START = 'PUT_USER';
export const PUT_USER_SUCCESS = 'PUT_USER_SUCCESS';
export const PUT_USER_FAIL = 'PUT_USER_FAIL';

export const requestUserSuccess = (user) => {
    return {
        type: PUT_USER_SUCCESS,
        user
    };
};

export const requestUserFail = (error) => {
    return {
        type: PUT_USER_FAIL,
        error: error
    };
};

export const requestUserStart = () => {
    return {
        type: PUT_USER_START
    };
};

export const putUser = (token, userIndex, user) => {
    return dispatch => {
        dispatch(requestUserStart());
        axios.put(`/users/${userIndex}.json?auth=` + token, user)
            .then(res => {
                dispatch(requestUserSuccess(res.data));
            })
            .catch(err => {
                dispatch(requestUserFail(err));
            });
    };
};

export const postUser = (token, user) => {
    return dispatch => {
        dispatch(requestUserStart());
        axios.post(`/users.json?auth=` + token, JSON.stringify(user))
            .then(res => {
                dispatch(requestUserSuccess(res.data));
            })
            .catch(err => {
                dispatch(requestUserFail(err));
            });
    };
};


