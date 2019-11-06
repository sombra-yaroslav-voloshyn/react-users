import React from 'react';
import './App.scss';
import Header from './components/header/header'
import Login from './containers/auth/login'
import {BrowserRouter} from "react-router-dom";
import {connect} from "react-redux";
import {Redirect, Route} from "react-router";
import Home from "./containers/home/home";

const App = (props) => {
    return (
        <BrowserRouter>
            <div className="App">
                {props.authenticated ? <Header/> : null}
                {!props.authenticated ? <Redirect exact from="/" to="/login"/> : null}
                <Route path="/home" component={Home}/>
                <Route path="/login" component={Login}/>
            </div>
        </BrowserRouter>
    );
};

const mapStateToProps = (state) => {
    return {
        authenticated: state.authReducer.authenticated
    };
};

export default connect(mapStateToProps, null)(App);
