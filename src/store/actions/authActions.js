export const AUTHENTICATED = 'AUTHENTICATED';

const saveResult = (result) => {
    localStorage.setItem('authenticated', result);
    return {
        type: AUTHENTICATED,
        authenticated: result
    }
};

export const setAuthenticated  = (result) => {
    return dispatch => {
        dispatch(saveResult(result))
    };
};
