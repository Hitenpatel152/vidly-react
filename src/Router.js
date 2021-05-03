import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import React, { Component } from 'react';
import AuthRoute from "./AuthRoute";
import LoginClass from './components/user/LoginClass';
import SignUpClass from './components/user/SignUpClass';
const AutheticateRoute = ({ component: Component, ...rest }) => {
const authToken = localStorage.getItem("authToken");
    
    return (
        <Route
        {...rest}
        render={(props) =>
            authToken ? <AuthRoute {...props} /> : <Redirect to="/login" />
        }
        />
    );
};
const loading = (
    <div className="pt-3 text-center">
        <div className="sk-spinner sk-spinner-pulse"></div>
    </div>
);
const Routes = () => {
    return (
    <Router>
        <React.Suspense fallback={loading}>
        <Switch>
            <Route exact path='/login' component={LoginClass} />
            <Route exact path='/register' component={SignUpClass} />
            <AutheticateRoute
                path="/"
                name="Login"
                render={(props) => <AuthRoute {...props} />}
            />

            <Route path="/" render={() => <Redirect to="/login" />} />
        </Switch>
        </React.Suspense>
    </Router>)}

export default Routes;