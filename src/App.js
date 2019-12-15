import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import AuthProvider from './context/AuthProvider';
import AdminProvider from './context/AdminProvider';

import  LoginPage  from './pages/LoginPage';
import  MessagePage  from './pages/MessagePage';
import  UserDashboard  from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import  MainHeader  from './components/MainHeader';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';

import { MuiThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#33c9dc',
      main: '#00bcd4',
      dark: '#008394',
      contrastText: '#fff'
    },
    secondary: {
      light: '#ff6333',
      main: '#ff3d00',
      dark: '#b22a00',
      contrastText: '#fff'
    }
  },
  typography: {
    useNextVariants: true
  },
});

function App() {
  return (
    <MuiThemeProvider theme = {theme}>
        <AuthProvider>
          <AdminProvider>
            <BrowserRouter>
            <MainHeader />
              <div className="container">
              <Switch>
                <Redirect exact from="/" to="/login" component={null}  />
                <Route path="/login" component={LoginPage} />
                <AdminRoute path="/admindashboard">
                    <AdminDashboard />
                </AdminRoute>
                <PrivateRoute path="/userdashboard">
                  <UserDashboard />
                </PrivateRoute>
                <PrivateRoute path="/messages" >
                  <MessagePage />
                </PrivateRoute>
              </Switch>
              </div>
            </BrowserRouter>
          </AdminProvider>  
        </AuthProvider>
    </MuiThemeProvider>
  );
}

export default App;
