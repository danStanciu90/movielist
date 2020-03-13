import { Typography } from '@material-ui/core';
import React, { FunctionComponent } from 'react';

export interface IMovieDetailListItemProps {
  name: string;
  value?: string;
  component?: any;
}

export const MovieDetailListItem: FunctionComponent<IMovieDetailListItemProps> = ({
  name,
  value,
  component,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginTop: 5,
        marginBottom: 5,
      }}
    >
      <Typography style={{ marginRight: 5, fontSize: '1rem' }} variant="subtitle2">
        {name}
      </Typography>
      {component ? component : <Typography variant="body1">{value}</Typography>}
    </div>
  );
};
