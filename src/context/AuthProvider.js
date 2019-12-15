import React from 'react';
import  AuthContext  from './AuthContex';

class AuthProvider extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            authenticated: false
        };
    }

    componentDidMount = () => {
        this.handleAutoAuth();
    }

    getDuration = (time) => {
        let now = new Date();
        let duration = time * 1000 + now.getTime();
        return new Date(duration);
    }

    handleLogin = (credentials) => {
        this.authTimer(credentials.expiresIn);
        this.saveAuthData(credentials, this.getDuration(credentials.expiresIn));
        this.setState({ authenticated: true });
    }

    handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('authDuration');
        localStorage.removeItem('username');
        localStorage.removeItem('userId');
        localStorage.removeItem('role');
        this.setState({authenticated: false});
        clearTimeout(this.tokenTimer);
    }

    saveAuthData = (credentials, duration) => {
        localStorage.setItem('token',credentials.token);
        localStorage.setItem('authDuration', duration.toISOString());
        localStorage.setItem('username', credentials.username);
        localStorage.setItem('userId', credentials.id);
        localStorage.setItem('role', credentials.role? credentials.role : 'regular');
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
                    const time = this.getDuration(reminedTime / 1000);
                    localStorage.setItem('authDuration', time.toISOString());
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