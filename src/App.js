import React, {useEffect} from 'react';
import './App.scss';
import Header from './components/header/header'
import Login from './containers/auth/login'
import {BrowserRouter} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Redirect, Route, Switch} from "react-router";
import Home from "./containers/home/home";
import Users from "./containers/users/users";
import {checkAuthState} from "./store/actions/authActions";
import PrivateRoute from "./components/privateRoute/privateRoute";

const App = (props) => {
    const dispatch = useDispatch();

    const {token} = useSelector((state) => ({
        ...state.authReducer
    }));

    useEffect(() => {
        dispatch(checkAuthState());
    }, [props, dispatch]);

    return (
        <BrowserRouter>
            <div className="App">
                {token ? <Header/> : null}
                <Switch>
                    <Route path="/login" component={Login}/>
                    <PrivateRoute path="/home" component={Home}/>
                    <PrivateRoute path="/users" component={Users}/>
                    <Redirect from="/" to="/login"/>
                </Switch>
            </div>
        </BrowserRouter>
    );
};

export default App;
