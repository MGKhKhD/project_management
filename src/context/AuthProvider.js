import React from 'react';
import  AuthContext  from './AuthContex';

class AuthProvider extends React.Component {

    state = {
        authenticated: false
    }

    handleLogin = (credentials) => {
        console.log(credentials);
        localStorage.setItem('token',credentials.token);
        localStorage.setItem('expiresIn', credentials.expiresIn);
        localStorage.setItem('username', credentials.username);
        this.setState({ authenticated: true });
    }

    handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('expiresIn');
        localStorage.removeItem('username');
        this.setState({authenticated: false});
    }

    render() {
        return (
            <AuthContext.Provider value={{
                authenticated: this.state.authenticated,
                login: (data) => this.handleLogin(data),
                logout: this.handleLogout
            }}>
                {this.props.children}
            </AuthContext.Provider>
        );
    }
}

export default AuthProvider;