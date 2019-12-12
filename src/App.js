import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import AuthProvider from './context/AuthProvider';

import  Login  from './pages/Login';
import  Projects  from './pages/Projects';
import  Profile  from './pages/Profile';
import  MainHeader  from './components/MainHeader';

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
        <BrowserRouter>
          <MainHeader />
          <Switch>
          <div className="container">
            <Switch>
              <Redirect exact from="/" to="/login" component={null}  />
              <Route path="/login" component={Login} />
              <Route path="/projects" component={Projects} />
              <Route path="/profile" component={Profile} />
            </Switch>
          </div>
          </Switch>
        </BrowserRouter>
      </AuthProvider>
    </MuiThemeProvider>
  );
}

export default App;
