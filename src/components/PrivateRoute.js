import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContex from '../context/AuthContex';

const PrivateRoute = ({children, ...rest}) => {
    return (
        <AuthContex.Consumer>
            {context => {
                return <Route {...rest} render={({ location }) => 
            context.authenticated? children : <Redirect to = {{
                path: '/login', state: {from: location}
            }} />} />
            }}
        </AuthContex.Consumer>
    )
}

export default PrivateRoute;