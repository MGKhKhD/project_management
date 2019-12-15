import React, { useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';

import AuthContext from '../context/AuthContex';
import AdminContxt from '../context/AdminContext';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

const MainHeader = () => {
    let history = useHistory();
    const auth = useContext(AuthContext);
    const admin = useContext(AdminContxt);

    return (
        <AppBar>
            <Toolbar className="nav-container">
                {!auth.authenticated && <Button color="inherit" component={NavLink} to="/login">Login</Button>}
                <Button color="inherit" component={NavLink} to="/messages">Messages</Button>
                {!admin.admin && <Button color="inherit" component={NavLink} to="/userdashboard">Dashboard</Button>}
                {admin.admin && <Button color="inherit" component={NavLink} to="/admindashboard">Admin</Button>}
                {auth.authenticated && <Button color="inherit" onClick={() =>
                    {
                        history.push("/login");
                        auth.logout();
                    }
                }>Logout</Button>}
            </Toolbar>
        </AppBar>
    );
}

export default MainHeader;