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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export const Login = () => {
  const classes = useStyles();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMessage, setErrMessage] = useState('');

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  const handleSigninError = (err: any) => {
    console.log('error', err);
    switch (err.code) {
      case 'auth/user-not-found':
        setErrMessage('The user was not found. Please signup first.');
        break;
      case 'auth/invalid-email':
        setErrMessage('The email address is not valid');
        break;
      default:
        setErrMessage('Unknown error occured');
    }
  };

  const handleSignin = () => {
    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(() => {
        firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then(() => {
            window.open('/', '_self');
          })
          .catch((err) => {
            handleSigninError(err);
          });
      })
      .catch((err) => console.log('Persistence error', err));
  };

  return (
    <Container maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">Sign in</Typography>
        <Typography style={{ color: '#ff0000', margin: '30px auto' }} variant="body1">
          {errMessage}
        </Typography>

        <form className={classes.form} noValidate={true}>
          <TextField
            autoComplete="email"
            autoFocus={true}
            fullWidth={true}
            id="email"
            label="Email Address"
            margin="normal"
            name="email"
            onChange={handleEmailChange}
            required={true}
            variant="outlined"
          />
          <TextField
            autoComplete="current-password"
            fullWidth={true}
            id="password"
            label="Password"
            margin="normal"
            name="password"
            onChange={handlePasswordChange}
            required={true}
            type="password"
            variant="outlined"
          />
          <Button
            className={classes.submit}
            color="primary"
            disabled={!email || !password}
            fullWidth={true}
            onClick={handleSignin}
            variant="contained"
          >
            Sign In
          </Button>
          <Grid container={true}>
            <Grid item={true} xs={true} />
            <Grid item={true}>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};
