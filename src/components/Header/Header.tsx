import { AppBar, Toolbar } from '@material-ui/core';
import React, { Fragment, FunctionComponent } from 'react';
import { StaticContext } from 'react-router';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { AddMovieHeader } from '../AddMovieHeader/AddMovieHeader';
import { HeaderTitle } from '../HeaderTitle';

const Header: FunctionComponent<React.PropsWithChildren<
  RouteComponentProps<any, StaticContext, any>
>> = ({ location }) => {
  const { pathname } = location;
  if (pathname === '/signin' || pathname === 'signup') {
    return <Fragment />;
  }

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

export const HeaderWithRouter = withRouter((props) => <Header {...props} />);
