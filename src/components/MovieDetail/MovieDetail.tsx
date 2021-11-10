import { Typography, withStyles } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { Rating } from '@material-ui/lab';
import React, { ChangeEvent, FunctionComponent } from 'react';
import { useWindowSize } from '../../hooks/useWindowSize';
import { IDetailedMovie } from '../../screens/MovieList';
import { MovieDetailListItem } from './MovieDetailListItem/MovieDetailListItem';

interface IMovieDetailProps {
  movie: IDetailedMovie;
  onExcitementChange(imdbid: string, value: number | null): void;
}

const StyledRating = withStyles({
  iconFilled: {
    color: '#f50057',
  },
  iconHover: {
    color: '#c51162',
  },
})(Rating);

export const MovieDetail: FunctionComponent<IMovieDetailProps> = ({
  movie,
  onExcitementChange,
}) => {
  const { width } = useWindowSize();

  return (
    <div
      style={{
        display: 'flex',
        padding: 20,
        flexDirection: width > 700 ? 'row' : 'column',
      }}
    >
      <div
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          padding: 20,
          textAlign: 'center',
        }}
      >
        <img
          alt="movie-poster"
          src={movie.poster}
          style={{ maxHeight: 200, textAlign: 'center' }}
        />
      </div>
      <div style={{ flex: 4 }}>
        <Typography variant="h6">
          {movie.title} ({movie.year})
        </Typography>
        <MovieDetailListItem name="Rating: " value={`${movie.rating}`} />
        <MovieDetailListItem
          component={
            <StyledRating
              icon={<FavoriteIcon fontSize="inherit" />}
              name="MovieRating"
              // eslint-disable-next-line react/jsx-no-bind
              onChange={(_event: ChangeEvent<{}>, value: number | null) =>
                onExcitementChange(movie.imdbid, value)
              }
              value={movie.excitement}
            />
          }
          name="Excitement: "
        />
        <MovieDetailListItem name="Release Date: " value={`${movie.releasedFmt}`} />
        {movie.dvd && <MovieDetailListItem name="DVD Release Date: " value={`${movie.dvd}`} />}
        <MovieDetailListItem name="Ready to watch: " value={movie.ready ? 'Yes' : 'Not yet'} />
        <MovieDetailListItem name="Actors: " value={movie.actors} />
        <MovieDetailListItem name="Genre: " value={movie.genres} />
        <MovieDetailListItem name="Plot: " value={movie.plot} />
      </div>
    </div>
  );
};
