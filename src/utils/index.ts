import moment from 'moment';
import { getMovieById } from '../api';
import { IDBMovie, IDetailedMovie } from '../screens/MovieList';

export const calculateAvailability = (movie: IDetailedMovie) => {
  if (movie.dvd && movie.dvd !== 'N/A') {
    let dvdDate = Date.parse(movie.dvd);
    if (Date.now() > dvdDate) return true;
    else return false;
  } else if (movie.released.seconds) {
    let releaseDate = Date.parse(movie.released.seconds.toString());
    let newDate = new Date();
    newDate.setMonth(newDate.getMonth() - 3);
    let dateToCalculate = Date.parse(newDate.toString());
    if (dateToCalculate > releaseDate) return true;
  }

  return false;
};

export const getMovieExcitement = (movie: IDetailedMovie, dbMovies: IDBMovie[]) => {
  const target = dbMovies.find((el) => el.imdbid === movie.imdbid);
  return target && target.excitement ? target.excitement : 0;
};

export const parseMovies: (movies: IDBMovie[]) => Promise<IDetailedMovie[]> = (movies) => {
  return new Promise((resolve, reject) => {
    let parsedMovies: IDetailedMovie[] = [];
    let promiseArray: Promise<IDetailedMovie>[] = [];

    movies.forEach(async (movie: IDBMovie) => {
      promiseArray.push(getMovieById(movie.imdbid));
    });

    Promise.all(promiseArray)
      .then((detailedMovies) => {
        detailedMovies.forEach((detailedMovie: IDetailedMovie) => {
          detailedMovie.releasedFmt = moment(detailedMovie.released).format('DD/MM/YYYY');
          detailedMovie.ready = calculateAvailability(detailedMovie);
          detailedMovie.excitement = getMovieExcitement(detailedMovie, movies);
          parsedMovies.push(detailedMovie);
        });

        return resolve(parsedMovies);
      })
      .catch((err) => {
        return reject(err);
      });
  });
};
