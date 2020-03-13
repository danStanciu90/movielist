import axios from 'axios';
import moment from 'moment';
import { getMovieById } from '../api';
import { IDBMovie, IDetailedMovie } from '../screens/MovieList';

export const calculateAvailability: (movie: IDetailedMovie) => boolean = (movie) => {
  if (movie.dvd && movie.dvd !== 'N/A') {
    const dvdDate = Date.parse(movie.dvd);
    if (Date.now() > dvdDate) return true;
    else return false;
  } else if (movie.released.seconds) {
    const releaseDate = Date.parse((movie.released.seconds * 1000).toString());
    const newDate = new Date();
    newDate.setMonth(newDate.getMonth() - 3);
    const dateToCalculate = Date.parse(newDate.toString());
    if (dateToCalculate > releaseDate) return true;
  }

  return false;
};

export const getFLReady: (movie: IDetailedMovie) => Promise<boolean> = async (movie) => {
  const { data } = await axios.get('https://filelist.ro/api.php?', {
    params: {
      action: 'search-torrents',
      type: 'imdb',
      category: '4,19',
      query: movie.imdbid,
    },
    auth: {
      username: 'danstanciu90',
      password: process.env.REACT_APP_FL_TOKEN || '',
    },
  });

  return data.length > 0;
};

export const getMovieExcitement: (movie: IDetailedMovie, dbMovies: IDBMovie[]) => number = (
  movie,
  dbMovies
) => {
  const target = dbMovies.find((el) => el.imdbid === movie.imdbid);

  return target && target.excitement ? target.excitement : 0;
};

export const parseMovies: (movies: IDBMovie[]) => Promise<IDetailedMovie[]> = (movies) => {
  return new Promise((resolve, reject) => {
    const parsedMovies: IDetailedMovie[] = [];
    const promiseArray: Promise<IDetailedMovie>[] = [];

    movies.forEach((movie: IDBMovie) => {
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
