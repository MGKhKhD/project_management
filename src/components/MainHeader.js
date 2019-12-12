import React from 'react';
import { NavLink } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

const MainHeader = () => {
    return (
        <AppBar>
            <Toolbar className="nav-container">
                <Button colot="inherit" component={NavLink} to="/login">Login</Button>
                <Button colot="inherit" component={NavLink} to="/projects">Project</Button>
                <Button colot="inherit" component={NavLink} to="/profile">Profile</Button>
            </Toolbar>
        </AppBar>
    );
}

export default MainHeader;