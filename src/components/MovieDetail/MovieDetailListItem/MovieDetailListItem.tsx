import React, { FunctionComponent } from 'react';
import { Typography } from '@material-ui/core';

export interface IMovieDetailListItemProps {
  name: string;
  value: string;
}

export const MovieDetailListItem: FunctionComponent<IMovieDetailListItemProps> = ({ name, value }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', marginTop: 5, marginBottom: 5 }}>
      <Typography variant="subtitle2" style={{ marginRight: 5, fontSize: '1rem' }}>{name}</Typography>
      <Typography variant="body1">{value}</Typography>
    </div>
  )
}