import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import GoogleLogin from 'react-google-login';

import useStyles from './authStyles.js';
import Input from './Input.js';
import Icon from './icon.js';
import { googleLogin, login, signup } from '../../redux/actions/authActions.js';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const Auth = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignUp) {
      if (formData.password !== formData.confirmPassword) {
        setErrorMessage('Paswwords do not match.');
        setFormData({ ...formData, confirmPassword: '' });
      } else {
        setErrorMessage('');
        dispatch(signup(formData, navigate));
      }
    } else {
      dispatch(login(formData, navigate));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const switchMode = () => {
    setIsSignUp((prevSignUp) => !prevSignUp);
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;
    //const data = { result, token };
    try {
      dispatch(googleLogin(result, token));
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  const googleFailure = () => {
    console.log('Google Sign In was unsuccessful. Try Again Later.');
  };

  return (
    <Container component='main' maxWidth='xs'>
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant='h5'>{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignUp && (
              <>
                <Input
                  name='firstName'
                  label='First Name'
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name='lastName'
                  label='Last Name'
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name='email'
              label='Email Address'
              handleChange={handleChange}
              type='email'
            />
            <Input
              name='password'
              label='Password'
              handleChange={handleChange}
              type={showPassword ? 'text' : 'password'}
              handleShowPassword={handleShowPassword}
            />
            {isSignUp && (
              <Input
                name='confirmPassword'
                label='Confirm Password'
                handleChange={handleChange}
                type='password'
                error={errorMessage}
              />
            )}
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </Button>
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            render={(renderProps) => (
              <Button
                className={classes.googleButton}
                color='primary'
                fullWidth
                variant='contained'
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
              >
                Sign In with Google
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy='single_host_origin'
          />
          <Grid container justifyContent='center'>
            <Grid item>
              <Button onClick={switchMode}>
                {isSignUp
                  ? 'Already have an account? Sign In'
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
