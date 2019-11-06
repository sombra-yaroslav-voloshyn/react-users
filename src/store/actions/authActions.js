import axios from 'axios';
export const AUTH_START = 'AUTH_START';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAIL = 'AUTH_FAIL';
export const LOGOUT = 'LOGOUT';

export const authStart = () => {
    return {
        type: AUTH_START
    }
};

export const authSuccess = (token, userId) => {
    return {
        type: AUTH_SUCCESS,
        idToken: token,
        userId
    }
};

export const authFail = (error) => {
    return {
        type: AUTH_FAIL,
        error
    }
};


export const logout = (message = '') => {
    localStorage.clear();
    return {
        type: LOGOUT,
        message
    }
};

const checkAuthTimeout = (expireTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout('Token has expired'));
        }, expireTime * 1000);
    }
};

export const auth = (user, isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        const req = {
            email: user.email,
            password: user.password,
            returnSecureToken: true
        };
        let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCNkMOcUAThQN1hf6NZ-OCQgZtjB0H8sb0`;
        if (!isSignUp) {
            url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCNkMOcUAThQN1hf6NZ-OCQgZtjB0H8sb0`
        }
        axios.post(url, req)
            .then((res) => {
                const expirationDate = new Date (new Date().getTime() + res.data.expiresIn * 1000);
                localStorage.setItem('token', res.data.idToken);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', res.data.localId);
                dispatch(authSuccess(res.data.idToken, res.data.localId));
                dispatch(checkAuthTimeout(res.data.expiresIn));
            })
            .catch(err => {
                dispatch(authFail(err.response.data.error.message));
            })
    }
};

export const checkAuthState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout())
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout())
            } else {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
            }
        }
    }
};
