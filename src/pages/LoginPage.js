import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import AuthContex from '../context/AuthContex';
import Login from '../components/Login';


const LoginPage = (props) => {
    let history = useHistory();
    let context = useContext(AuthContex);

    return (
        <Login handlelogin={(loginPage, credentials) => {
            context.login(credentials);
            if (!loginPage) {
                alert('new user is created');
            } 
            history.push('/projects');
        }} />)
}

export default LoginPage;