import { Button, Icon } from '@material-ui/core';
import React, { Fragment, FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

export interface IAddMovieHeader {
  show: boolean;
}
export const AddMovieHeader: FunctionComponent<IAddMovieHeader> = ({ show }) => {
  if (show) {
    return (
      <Link style={{ textDecoration: 'none' }} to="/add">
        <Button color="primary" style={{ color: '#FFFFFF' }}>
          <Icon style={{ marginRight: 5 }}>add</Icon>
          Add Movie
        </Button>
      </Link>
    );
  }

  return <Fragment />;
};
