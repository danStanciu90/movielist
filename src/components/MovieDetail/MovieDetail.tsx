import { Typography, withStyles } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { Rating } from "@material-ui/lab";
import React, { FunctionComponent } from "react";
import { useWindowSize } from "../../hooks/useWindowSize";
import { IDetailedMovie } from "../../screens/MovieList";
import { MovieDetailListItem } from "./MovieDetailListItem/MovieDetailListItem";

interface IMovieDetailProps {
  movie: IDetailedMovie;
}

const StyledRating = withStyles({
  iconFilled: {
    color: "#ff6d75"
  },
  iconHover: {
    color: "#ff3d47"
  }
})(Rating);

export const MovieDetail: FunctionComponent<IMovieDetailProps> = ({
  movie
}) => {
  const { width } = useWindowSize();
  return (
    <div
      style={{
        display: "flex",
        padding: 20,
        flexDirection: width > 700 ? "row" : "column"
      }}
    >
      <div
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          padding: 20,
          textAlign: "center"
        }}
      >
        <img
          src={movie.poster}
          style={{ maxHeight: 200, textAlign: "center" }}
          alt="movie-poster"
        />
      </div>
      <div style={{ flex: 4 }}>
        <Typography variant="h6">
          {movie.title} ({movie.year})
        </Typography>
        <MovieDetailListItem name="Rating: " value={`${movie.rating}`} />
        <MovieDetailListItem
          name="Excitement: "
          component={
            <StyledRating
              readOnly
              value={movie.excitement}
              icon={<FavoriteIcon fontSize="inherit" />}
            />
          }
        />
        <MovieDetailListItem
          name="Release Date: "
          value={`${movie.releasedFmt}`}
        />
        {movie.dvd && (
          <MovieDetailListItem
            name="DVD Release Date: "
            value={`${movie.dvd}`}
          />
        )}
        <MovieDetailListItem
          name="Ready to watch: "
          value={movie.ready ? "Yes" : "Not yet"}
        />
        <MovieDetailListItem name="Actors: " value={movie.actors} />
        <MovieDetailListItem name="Genre: " value={movie.genres} />
        <MovieDetailListItem name="Plot: " value={movie.plot} />
      </div>
    </div>
  );
};
