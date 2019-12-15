import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import AdminContext from '../context/AdminContext';

const AdminRoute = ({children, ...rest}) => {
    const admin = useContext(AdminContext);
    return <Route {...rest} render={({ location }) => 
        admin.admin? children : <Redirect to={{
            path:'/userdashboard', state:{from: {location}}
        }} />
    } />
}

export default AdminRoute;