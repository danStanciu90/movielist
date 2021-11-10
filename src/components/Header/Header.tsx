import { AppBar, Toolbar } from '@material-ui/core';
import React, { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { AddMovieHeader } from '../AddMovieHeader/AddMovieHeader';
import { HeaderTitle } from '../HeaderTitle';

export const Header: FC = () => {
  const { pathname } = useLocation();

  return (
    <AppBar position="static">
      <Toolbar
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
        variant="dense"
      >
        <HeaderTitle isLink={pathname !== '/'} />
        <AddMovieHeader show={pathname !== '/add'} />
      </Toolbar>
    </AppBar>
  );
};
