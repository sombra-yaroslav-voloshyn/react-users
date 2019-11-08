import axios from '../../axios-users';

export const PUT_USER_START = 'PUT_USER';
export const PUT_USER_SUCCESS = 'PUT_USER_SUCCESS';
export const PUT_USER_FAIL = 'PUT_USER_FAIL';

export const requestUserSuccess = (user, isNeedToUpdate) => {
    return {
        type: PUT_USER_SUCCESS,
        user,
        isNeedToUpdate
    };
};

export const requestUserFail = (error, isNeedToUpdate) => {
    return {
        type: PUT_USER_FAIL,
        error: error,
        isNeedToUpdate
    };
};

export const requestUserStart = (isNeedToUpdate) => {
    return {
        type: PUT_USER_START,
        isNeedToUpdate
    };
};

export const putUser = (token, userIndex, user) => {
    return dispatch => {
        dispatch(requestUserStart(false));
        axios.put(`/users/${userIndex}.json?auth=` + token, user)
            .then(res => {
                dispatch(requestUserSuccess(res.data, true));
            })
            .catch(err => {
                dispatch(requestUserFail(err, false));
            });
    };
};

export const postUser = (token, user) => {
    return dispatch => {
        dispatch(requestUserStart(false));
        axios.post(`/users.json?auth=` + token, JSON.stringify(user))
            .then(res => {
                dispatch(requestUserSuccess(res.data, true));
            })
            .catch(err => {
                dispatch(requestUserFail(err, false));
            });
    };
};

export const deleteUser = (token, userIndex) => {
    return dispatch => {
        dispatch(requestUserStart(false));
        axios.delete(`/users/${userIndex}.json?auth=` + token)
            .then(res => {
                dispatch(requestUserSuccess(res.data, true));
            })
            .catch(err => {
                dispatch(requestUserFail(err, false));
            });
    };
};


