import React, {useEffect, useState} from 'react'
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import './login.scss';
import * as authActions from '../../store/actions/authActions'
import {connect} from "react-redux";

const Login = (props) => {
    const [loginState, setLoginState] = useState({
        email: null,
        password: null
    });

    useEffect(() => {
        console.log('LOGIN useEffect', props);
        if (props.authenticated) {
            props.history.push('/home');
        }
    }, [props, props.authenticated]);

    const handleLogin = () => {
        const req = {
            email: loginState.email,
            password: loginState.password
        };

        props.onAuth(req);
    };

    return (
        <div className="Login">
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <div className={null}>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form className={null}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            error={loginState.email === ""}
                            helperText={loginState.email === "" ? 'Email can\'t be empty!' : ' '}
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
                            error={loginState.password === ""}
                            helperText={loginState.password === "" ? 'Passwoed can\'t be empty!' : ' '}
                            onChange={(event) => setLoginState({...loginState, password: event.target.value})}
                            autoComplete="current-password"
                        />
                        <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            color="primary"
                            disabled={!loginState.password || !loginState.email}
                            onClick={handleLogin}
                        >
                            Sign In
                        </Button>
                    </form>
                </div>
            </Container>
        </div>

    );
};

const mapStateToProps = (state) => {
    return {
        authenticated: state.authReducer.authenticated
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (req) => dispatch(authActions.setAuthenticated(req)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
