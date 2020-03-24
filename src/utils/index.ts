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

export const getFLReady: (
  movie: IDetailedMovie
) => Promise<{ imdbid: string; flReady: boolean }> = async (movie) => {
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

  return { imdbid: movie.imdbid, flReady: data.length > 0 };
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

// eslint-disable-next-line require-unicode-regexp
export const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export const validateEmail: (email: string) => boolean = (email) => {
  // eslint-disable-next-line require-unicode-regexp
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return re.test(email.toLowerCase());
};
