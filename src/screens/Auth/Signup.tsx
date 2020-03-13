/* eslint-disable no-console */
import {
  Avatar,
  Button,
  Container,
  CssBaseline,
  Grid,
  Link,
  TextField,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import firebase from 'firebase';
import React, { useState } from 'react';
import { validateEmail } from '../../utils';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export const Signup = () => {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [errMessage, setErrMessage] = useState('');

  const handleSignup = () => {
    if (email !== 'danstanciu90@gmail.com' && email !== 'raluca.moroc@gmail.com') {
      setErrMessage('You are not authorized to signup. Contact danstanciu90@gmail.com for access');

      return;
    }
    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(() => {
        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(() => {
            window.open('/', '_self');
          })
          .catch((err) => console.log('signup err: ', err));
      })
      .catch((err) => {
        console.log('Persistence error', err);
      });
  };

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
    setEmailError(validateEmail(e.target.value) ? '' : 'Invalid format');
  };

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
    setPasswordError(
      e.target.value.length < 6 ? 'Your password must be at least 6 characters long' : ''
    );
  };

  return (
    <Container maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">Sign up</Typography>
        <Typography style={{ color: '#ff0000', margin: '30px auto' }} variant="body1">
          {errMessage}
        </Typography>
        <form className={classes.form} noValidate={true}>
          <Grid container={true} spacing={2}>
            <Grid item={true} xs={12}>
              <TextField
                autoComplete="email"
                error={!!emailError}
                fullWidth={true}
                helperText={emailError}
                id="email"
                label="Email Address"
                name="email"
                onChange={handleEmailChange}
                required={true}
                variant="outlined"
              />
            </Grid>
            <Grid item={true} xs={12}>
              <TextField
                autoComplete="current-password"
                error={!!passwordError}
                fullWidth={true}
                helperText={passwordError}
                id="password"
                label="Password"
                name="password"
                onChange={handlePasswordChange}
                required={true}
                type="password"
                variant="outlined"
              />
            </Grid>
          </Grid>
          <Button
            className={classes.submit}
            color="primary"
            disabled={!!emailError || !!passwordError || !email || !password}
            fullWidth={true}
            onClick={handleSignup}
            variant="contained"
          >
            Sign Up
          </Button>
          <Grid container={true} justify="flex-end">
            <Grid item={true}>
              <Link href="/signin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};
