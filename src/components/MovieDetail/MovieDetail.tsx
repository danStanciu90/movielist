import React, { FunctionComponent } from 'react';
import { IDetailedMovie } from '../../screens/MovieList';

interface IMovieDetailProps {
    movie: IDetailedMovie;
}

export const MovieDetail: FunctionComponent<IMovieDetailProps> = ({ movie }) => {
    return <div>{movie.actors}</div>
}