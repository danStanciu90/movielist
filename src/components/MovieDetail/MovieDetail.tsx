import React, { FunctionComponent, } from 'react';
import { IDetailedMovie } from '../../screens/MovieList';
import { Typography } from '@material-ui/core';
import { MovieDetailListItem } from './MovieDetailListItem/MovieDetailListItem';

interface IMovieDetailProps {
  movie: IDetailedMovie;
}

export const MovieDetail: FunctionComponent<IMovieDetailProps> = ({ movie }) => {
  const width = window.innerWidth
  console.log('movie: ', movie)
  return (
    <div style={{ display: 'flex', padding: 20, flexDirection: width > 1000 ? 'row' : 'column' }}>
      <div style={{ flex: 1, alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <img src={movie.poster} style={{ maxHeight: 200, textAlign: 'center' }} alt="movie-poster" />
      </div>
      <div style={{ flex: 4 }}>
        <Typography variant="h6">{movie.title} ({movie.year})</Typography>
        <MovieDetailListItem name="Rating: " value={`${movie.rating}`} />
        <MovieDetailListItem name="Release Date: " value={`${movie.releasedFmt}`} />
        {movie.dvd && <MovieDetailListItem name="DVD Release Date: " value={`${movie.dvd}`} />}
        <MovieDetailListItem name="Ready to watch: " value={movie.ready ? 'Yes' : 'Not yet'} />
        <MovieDetailListItem name="Actors: " value={movie.actors} />
        <MovieDetailListItem name="Genre: " value={movie.genres} />
        <MovieDetailListItem name="Plot: " value={movie.plot} />
      </div>
    </div>
  )
}