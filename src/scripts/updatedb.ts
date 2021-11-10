/* eslint-disable no-console */
import { getAllMovies, getMovieById, updateMovie } from '../api';
import { getFLReady } from '../utils';

const updateDb: () => Promise<void> = async () => {
  try {
    // console.log('Authenticating to firebase');
    // const { REACT_APP_USER_EMAIL, REACT_APP_USER_PWD } = process.env;
    // if (!REACT_APP_USER_EMAIL || !REACT_APP_USER_PWD) {
    //   throw new Error('Missing environment variables');
    // }
    // await firebase.auth().signInWithEmailAndPassword(REACT_APP_USER_EMAIL, REACT_APP_USER_PWD);
    const dbMovies = await getAllMovies();
    console.log('All movies received from firebase db', dbMovies[1]);

    const imdbMoviesArray = dbMovies.map((movie) => getMovieById(movie.imdbid));

    const imdbMovies = await Promise.all(imdbMoviesArray);
    console.log('All movie details received', imdbMovies[1], imdbMovies.length);

    const flMoviesArray = imdbMovies.map((movie) => getFLReady(movie));
    const flMovies = await Promise.all(flMoviesArray);

    console.log('All movie details from FL received', flMovies);

    imdbMovies.forEach((imdbMovie) => {
      const flMovie = flMovies.find((m) => m.imdbid === imdbMovie.imdbid);
      const dbMovie = dbMovies.find((m) => m.imdbid === imdbMovie.imdbid);
      imdbMovie.ready = flMovie?.flReady ?? false;
      if(dbMovie?.excitement) {
        imdbMovie.excitement = dbMovie?.excitement
      }
    });

    const updateMoviesArray = imdbMovies.map((movie) => updateMovie(movie));
    await Promise.all(updateMoviesArray);
    console.log('All movies updated');

    // eslint-disable-next-line no-process-exit
    // process.exit(0);
  } catch (error) {
    throw error;
  }
};

updateDb();
