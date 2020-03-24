import { Avatar, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import React, { FunctionComponent } from 'react';
import { IDetailedMovie } from '../../screens/MovieList';

export interface IMovieListItemProps {
  movie: IDetailedMovie;
  onClick(movieId: string): void;
}

export const MovieListItem: FunctionComponent<IMovieListItemProps> = ({ movie, onClick }) => {
  return (
    <ListItem button={true} onClick={() => onClick(movie.imdbid)}>
      <ListItemAvatar>
        <Avatar src={movie.poster} style={{ width: 60, height: 60, marginRight: 20 }} />
      </ListItemAvatar>
      <ListItemText>{`${movie.title} (${movie.year})`}</ListItemText>
    </ListItem>
  );
};
