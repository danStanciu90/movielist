import React, { FunctionComponent } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { MovieList } from '../MovieList';
import { AddMovie } from '../AddMovie';
import { HeaderWithRouter } from '../../components/Header';

export const App: FunctionComponent = () => {
  return (
    <Router>
      <HeaderWithRouter />
      <div style={{ marginTop: 20, padding: 20, paddingTop: 0 }}>
        <Switch>
          <Route exact path="/" component={MovieList} />
          <Route path="/add" component={AddMovie} />
        </Switch>
      </div>
    </Router>
  )
}
