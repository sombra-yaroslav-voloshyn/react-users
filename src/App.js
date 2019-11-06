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

const App = (props) => {
    const dispatch = useDispatch();

    const {token} = useSelector((state) => ({
        ...state.authReducer
    }));

    useEffect(() => {
        dispatch(checkAuthState());
    }, []);

    let routes = (
        <Switch>
            <Route path="/login" component={Login}/>
            <Redirect from="/" to="/login"/>
        </Switch>
    );

    if (token) {
        routes = (
            <div>
                <Header/>
                <Switch>
                    <Route path="/users" component={Users}/>
                    <Route path="/home" component={Home}/>
                    <Redirect to="/home"/>
                </Switch>
            </div>
        );
    }

    return (
        <BrowserRouter>
            <div className="App">
                {routes}
            </div>
        </BrowserRouter>
    );
};

export default App;
