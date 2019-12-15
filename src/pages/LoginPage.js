import React, { useContext, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import AuthContex from '../context/AuthContex';
import AdminContext from '../context/AdminContext';
import Login from '../components/Login';


const LoginPage = (props) => {
    let history = useHistory();
    let location = useLocation();
    let auth = useContext(AuthContex);
    let admin = useContext(AdminContext);

    useEffect(() => {
        if (!auth.authenticated) {
            auth.autoAuth();
        }

        if (!auth.authenticated) {
            history.push('/login');
        } else {
            let pathname = '/userdashboard';
            if (admin.admin) {
                 pathname = '/admindashboard';
            } 
            let { from } = location.state || { from: {pathname}};
            history.push(from);
        }

    }, [auth.authenticated]);

    return (
        <Login auth={auth.authenticated} handlelogin={(loginPage, credentials) => {
            auth.login(credentials);
            if (!loginPage) {
                alert('new user is created');
            } 
            if (admin.admin) {
                history.push('/admindashboard');
            } else {
                history.push('/userdashboard');
            }
            
        }} />)
}

export default LoginPage;