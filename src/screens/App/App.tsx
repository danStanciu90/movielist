import React, { FunctionComponent } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { HeaderWithRouter } from '../../components/Header';
import { AddMovie } from '../AddMovie';
import { MovieList } from '../MovieList';

export const App: FunctionComponent = () => {
  return (
    <Router>
      <HeaderWithRouter />
      <div style={{ marginTop: 20, padding: 20, paddingTop: 0 }}>
        <Switch>
          <Route component={MovieList} exact={true} path="/" />
          <Route component={AddMovie} path="/add" />
        </Switch>
      </div>
    </Router>
  );
};
