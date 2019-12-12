import React from 'react';

const AuthContex = React.createContext({
    authenticated: false,
    login: (credentials) => {},
    logout: () => {}
});

export default AuthContex;