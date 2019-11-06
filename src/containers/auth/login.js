import React, {useEffect, useState} from 'react'
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import './login.scss';
import {useDispatch, useSelector} from "react-redux";
import Snackbar from "@material-ui/core/Snackbar";
import {auth, authFail} from "../../store/actions/authActions";
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import CircularProgress from "@material-ui/core/CircularProgress";


const Login = (props) => {
    const dispatch = useDispatch();

    const {loading, error, token} = useSelector((state) => ({
        ...state.authReducer
    }));

    const [loginState, setLoginState] = useState({
        email: '',
        password: '',
        touched: false,
        isSignUp: false
    });

    useEffect(() => {
        console.log('LOGIN useEffect', props);
        if (token) {
            props.history.push('/home');
        }
    }, [props, token]);

    const handleLogin = () => {
        const req = {
            email: loginState.email,
            password: loginState.password
        };

        dispatch(auth(req, loginState.isSignUp))
    };

    let form;
    if (loading) {
        form = <CircularProgress size={100}/>
    } else {
        form =
            <div>
                <Typography component="h1" variant="h5">
                    {loginState.isSignUp ? 'Sign up' : 'Log in'}
                </Typography>
                <ValidatorForm className={null}
                               onSubmit={handleLogin}>
                    <TextValidator
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        value={loginState.email}
                        autoComplete="email"
                        validators={['required', 'isEmail']}
                        errorMessages={['this field is required', 'email is not valid']}
                        onChange={(event) => setLoginState({...loginState, email: event.target.value})}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        error={loginState.touched && loginState.password.length < 6}
                        helperText={loginState.touched && loginState.password.length < 6 ? 'password must be at least 6 characters' : ' '}
                        onChange={(event) => {
                            setLoginState({...loginState, touched: true, password: event.target.value})
                        }}
                        autoComplete="current-password"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary">
                        {loginState.isSignUp ? 'Sign up' : 'Log in'}
                    </Button>
                    <Button
                        className={'switch-button'}
                        type="button"
                        fullWidth
                        variant="contained"
                        onClick={() => setLoginState({...loginState, isSignUp: !loginState.isSignUp})}
                        color="secondary">
                        Switch to {!loginState.isSignUp ? 'Sign up' : 'Log in'}
                    </Button>
                </ValidatorForm>
            </div>
    }

    return (
        <div className="Login">
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                {form}
                <Snackbar open={!!error}
                          autoHideDuration={2000}
                          anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                          onClose={() => dispatch(authFail(''))}
                          message={error}/>
            </Container>
        </div>

    );
};

export default Login;
