import { ThemeProvider } from '@material-ui/styles';
import React, { FunctionComponent } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { HeaderWithRouter } from '../../components/Header';
import { theme } from '../../theme/theme';
import { AddMovie } from '../AddMovie';
import { Login, Signup } from '../Auth';
import { MovieList } from '../MovieList';

export const App: FunctionComponent = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <HeaderWithRouter />
        <div style={{ marginTop: 20, padding: 20, paddingTop: 0 }}>
          <Switch>
            <Route component={Login} path="/signin" />
            <Route component={Signup} path="/signup" />
            <Route component={MovieList} exact={true} path="/" />
            <Route component={AddMovie} path="/add" />
          </Switch>
        </div>
      </Router>
    </ThemeProvider>
  );
};
