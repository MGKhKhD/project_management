import React from 'react';
import { NavLink } from 'react-router-dom';

import AuthContext from '../context/AuthContex';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

const MainHeader = () => {
    return (
        <AuthContext.Consumer>
            {context => (
            <AppBar>
                <Toolbar className="nav-container">
                    {!context.authenticated && <Button color="inherit" component={NavLink} to="/login">Login</Button>}
                    <Button color="inherit" component={NavLink} to="/projects">Project</Button>
                    <Button color="inherit" component={NavLink} to="/profile">Profile</Button>
                    {context.authenticated && <Button color="inherit" onClick={() =>
                        context.logout()
                    }>Logout</Button>}
                </Toolbar>
            </AppBar>
            )}
        </AuthContext.Consumer>
    );
}

export default MainHeader;