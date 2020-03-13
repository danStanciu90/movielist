import { Typography } from '@material-ui/core';
import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

export interface IHeaderTitleProps {
  isLink: boolean;
}
export const HeaderTitle: FunctionComponent<IHeaderTitleProps> = ({ isLink }) => {
  if (isLink) {
    return (
      <Link style={{ textDecoration: 'none', color: '#FFFFFF' }} to="/">
        <Typography color="inherit" variant="h6">
          Movies to watch
        </Typography>
      </Link>
    );
  }

  return (
    <Typography color="inherit" variant="h6">
      Movies to watch
    </Typography>
  );
};
