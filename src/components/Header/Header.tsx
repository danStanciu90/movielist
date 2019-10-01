import React, { FunctionComponent } from 'react';
import { AppBar, Toolbar, Typography, Button, Icon } from '@material-ui/core';
import { Link } from 'react-router-dom';

export const Header: FunctionComponent = () => {

  return (
    <AppBar position="static">
      <Toolbar variant="dense" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <Typography variant="h6" color="inherit">
          Movies to watch
        </Typography>
        <Link to="/add" style={{ textDecoration: 'none' }}>
          <Button color="primary" style={{ color: '#FFFFFF' }}>
            <Icon style={{ marginRight: 5 }}>add</Icon>
            Add Movie
          </Button>
        </Link>
      </Toolbar>
    </AppBar>
  )
}