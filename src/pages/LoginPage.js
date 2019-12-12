import React, { useContext, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import AuthContex from '../context/AuthContex';
import Login from '../components/Login';


const LoginPage = (props) => {
    let history = useHistory();
    let location = useLocation();
    let context = useContext(AuthContex);

    useEffect(() => {
        if (!context.authenticated) {
            context.autoAuth();
        }

        if (!context.authenticated) {
            history.push('/login');
        } else {
            let { from } = location.state || { from: {pathname: '/projects'}};
            console.log(from);
            history.push(from);
        }

    }, [context.authenticated]);

    return (
        <Login auth={context.authenticated} handlelogin={(loginPage, credentials) => {
            context.login(credentials);
            if (!loginPage) {
                alert('new user is created');
            } 
            history.push('/projects');
        }} />)
}

export default LoginPage;