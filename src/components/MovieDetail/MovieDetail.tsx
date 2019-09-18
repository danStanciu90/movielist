import React, { FunctionComponent } from 'react';
import { IDetailedMovie } from '../../screens/App';

interface IMovieDetailProps {
    movie: IDetailedMovie;
}

export const MovieDetail: FunctionComponent<IMovieDetailProps> = ({ movie }) => {
    return <div>{movie.actors}</div>
}