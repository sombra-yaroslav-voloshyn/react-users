import React, {useEffect} from 'react';
import './App.scss';
import Header from './components/header/header'
import Login from './containers/auth/login'
import {BrowserRouter} from "react-router-dom";
import {connect} from "react-redux";

const App = (props) => {

    useEffect(() => {
        console.log('APP', props);
    });

    return (
        <BrowserRouter>
            <div className="App">
                {props.authenticated ? <Header/> : null}
                {!props.authenticated ? <Login/> : null}
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
