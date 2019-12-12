import React from 'react';
import  AuthContext  from './AuthContex';

class AuthProvider extends React.Component {

    state = {
        authenticated: false
    }

    componentDidMount = () => {
        this.handleAutoAuth();
    }

    handleLogin = (credentials) => {
        this.authTimer(credentials.expiresIn);
        let now = new Date();
        let duration = credentials.expiresIn * 1000 + now.getTime();
        this.saveAuthData(credentials, new Date(duration));
        this.setState({ authenticated: true });
    }

    handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('authDuration');
        localStorage.removeItem('username');
        localStorage.removeItem('userId');
        this.setState({authenticated: false});
        clearTimeout(this.tokenTimer);
    }

    saveAuthData = (credentials, duration) => {
        localStorage.setItem('token',credentials.token);
        localStorage.setItem('authDuration', duration.toISOString());
        localStorage.setItem('username', credentials.username);
        localStorage.setItem('userId', credentials.id);
    }

    authTimer = (duration) => {
        this.tokenTimer = setTimeout(() => {
            this.handleLogout();
        }, duration * 1000);
    }

    getCredentials = () => {
        const token = localStorage.getItem('token');
        const duration = localStorage.getItem('authDuration');
        const username = localStorage.getItem('username');
        const userId = localStorage.getItem('userId');

        if ( token && duration && username && userId ) {
            return { token , duration, username, userId };
        }
        return null;
    }

    handleAutoAuth = () => {
        const userInfo = this.getCredentials();
        if (userInfo !== null) {
            const { token , duration, username, userId } = userInfo;
            if (token && username && userId) {
                
                const reminedTime = (new Date(duration)).getTime() - (new Date()).getTime();
                if (reminedTime > 0) {
                    this.authTimer(reminedTime / 1000);
                    this.saveAuthData({token, username, id: userId}, new Date(reminedTime))
                    this.setState({ authenticated: true });
                }
            }
        }
    }

    render() {
        return (
            <AuthContext.Provider value={{
                authenticated: this.state.authenticated,
                login: this.handleLogin,
                logout: this.handleLogout,
                autoAuth: this.handleAutoAuth
            }}>
                {this.props.children}
            </AuthContext.Provider>
        );
    }
}

export default AuthProvider;