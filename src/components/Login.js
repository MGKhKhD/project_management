import React, { Component } from 'react';
import PropTypes from 'prop-types';

import withStyles  from '@material-ui/core/styles/withStyles';

import Grid from '@material-ui/core/Grid';
import { Typography, TextField, Button } from '@material-ui/core';

const styles = {
    form: {
        textAlign: 'center'
    },
    pageTitle: {
        margin: '20px auto 20px auto'
    },
    textField: {
        margin: '20px auto 20px auto'
    },
    button: {
        marginTop: 10,
        marginRight: 20
    }

}

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loginPage: true,
            username: '',
            email: '',
            password: '',
            confirmpassword: '',
            loading: false,
            errors: {}
        };
    }

    handleClick = () => {
        this.setState(prevState => {
            return {loginPage: !prevState.loginPage};
        });
    }

    handleSumbit = (event) => {
        event.preventDefault();

        const reqLogin = {
            email: this.state.email,
            password: this.state.password
        };

        const reqSignup = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        }

        fetch(`/api/users/${this.state.loginPage? 'login' : 'signup' }`, {
            method: 'POST',
            body: JSON.stringify(this.state.loginPage? reqLogin : reqSignup),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            return res.json();
        })
        .then(data => {
            this.props.handlelogin(this.state.loginPage, data.credentials);
        })
        .catch(err => {
            console.log(err);
        });
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    render () {
        const { classes } = this.props;
        

        return (
            <Grid container className={classes.form}>
                <Grid item sm />
                <Grid item sm >
                    <Typography variant="h3" 
                    className={classes.pageTitle}>{this.state.loginPage? 'Login' : 'Signup'}
                    </Typography>
                    <form className={classes.form} noValidate onSubmit={this.handleSumbit}>
                    {!this.state.loginPage && <TextField id="username" 
                    name="username" 
                    type="username" 
                    label="Username"
                    className={classes.textField} 
                    value={this.state.username}
                    onChange={this.handleChange} fullWidth >   
                    </TextField>}
                    <TextField id="email" 
                    name="email" 
                    type="email" 
                    label="Email"
                    className={classes.textField} 
                    value={this.state.email}
                    onChange={this.handleChange} fullWidth >   
                    </TextField>
                    <TextField id="password" 
                    name="password" 
                    type="password" 
                    label="Password"
                    className={classes.textField} 
                    value={this.state.password}
                    onChange={this.handleChange} fullWidth >   
                    </TextField>
                    {!this.state.loginPage && <TextField id="confirmpassword" 
                    name="confirmpassword" 
                    type="password" 
                    label="ConfirmPassword"
                    className={classes.textField} 
                    value={this.state.confirmpassword}
                    onChange={this.handleChange} fullWidth >   
                    </TextField>}
                    <Button type="submit" variant="contained" color="primary"
                    className={classes.button}>Submit</Button>
                    <Button className={classes.button}
                    variant="contained" colort="secondary" onClick={this.handleClick}>
                        Switch to {this.state.loginPage? 'Signup' : 'Login'}
                    </Button>
                </form>
                </Grid>
                <Grid  item sm/>
            </Grid>
        )
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Login);