export const AUTHENTICATED = 'AUTHENTICATED';

const saveResult = (result) => {
    if (result.email === 'a' && result.password === 'a') {
        localStorage.setItem('authenticated', true.toString());
        return {
            type: AUTHENTICATED,
            authenticated: true
        }
    } else {
        return {
            type: AUTHENTICATED,
            authenticated: false,
        }
    }
};

export const setAuthenticated  = (result) => {
    return dispatch => {
        dispatch(saveResult(result))
    };
};
const setLogout = () => {
    localStorage.clear();
    return {
        type: AUTHENTICATED,
        authenticated: false
    }
};

export const logout = () => {
    return dispatch => {
        dispatch(setLogout())
    }
};
