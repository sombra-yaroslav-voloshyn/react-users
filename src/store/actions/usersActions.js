import axios from '../../axios-users';

export const GET_USERS_START = 'GET_USERS';
export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
export const GET_USERS_FAIL = 'GET_USERS_FAIL';

export const getUsersSuccess = (users) => {
    return {
        type: GET_USERS_SUCCESS,
        users
    };
};

export const getUsersFail = (error) => {
    return {
        type: GET_USERS_FAIL,
        error: error
    };
};

export const getUsersStart = () => {
    return {
        type: GET_USERS_START
    };
};

export const getUsers = (token) => {
    return dispatch => {
        dispatch(getUsersStart());
        axios.get('/users.json?auth=' + token)
            .then(res => {
                dispatch(getUsersSuccess(Object.values(res.data)));
            })
            .catch(err => {
                console.log(err);
                dispatch(getUsersFail(err));
            });
    };
};
