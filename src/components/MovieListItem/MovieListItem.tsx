import React, { FunctionComponent } from 'react';
import { ListItem, ListItemText, ListItemAvatar, Avatar } from '@material-ui/core';

export interface ISearchMovie {
  imdbid: string;
  name: string;
  poster: string;
  title: string;
  type: string;
  year: number;
}

export interface IMovieListItemProps {
  movie: ISearchMovie;
  onClick(movieId: string): void;
}

export const MovieListItem: FunctionComponent<IMovieListItemProps> = ({ movie, onClick }) => {
  return (
    <ListItem button onClick={() => onClick(movie.imdbid)}>
      <ListItemAvatar>
        <Avatar src={movie.poster} style={{ width: 60, height: 60, marginRight: 20 }} />
      </ListItemAvatar>
      <ListItemText>
        {`${movie.title} (${movie.year})`}
      </ListItemText>
    </ListItem>
  )
}