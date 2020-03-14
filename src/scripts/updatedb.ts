/* eslint-disable no-console */

// eslint-disable-next-line @typescript-eslint/no-var-requires
import firebase from 'firebase';
import { getAllMovies, getMovieById, updateMovie } from '../api';
import { IDetailedMovie } from '../screens/MovieList';
import { getFLReady } from '../utils';

// firebaseInit();
const updateDb = async () => {
  try {
    console.log('Authenticating to firebase');
    const { REACT_APP_USER_EMAIL, REACT_APP_USER_PWD } = process.env;
    if (!REACT_APP_USER_EMAIL || !REACT_APP_USER_PWD) {
      throw new Error('Missing environment variables');
    }
    await firebase.auth().signInWithEmailAndPassword(REACT_APP_USER_EMAIL, REACT_APP_USER_PWD);
    const dbMovies = await getAllMovies();
    const allMoviesArray: Promise<any>[] = [];
    console.log('All movies received');
    // const updateMoviesArray: Promise<any>[] = [];
    dbMovies.forEach((dbMovie: IDetailedMovie) => {
      allMoviesArray.push(getMovieById(dbMovie.imdbid));
      // const detailedMovie = await getMovieById(dbMovie.imdbid);
      // updateMoviesArray.push(updateMovie(detailedMovie));
    });
    console.log('Getting latest details from IMDB');
    Promise.all(allMoviesArray)
      .then((res) => {
        console.log('All movie details received');
        const updateMoviesArray: Promise<any>[] = [];
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        res.forEach(async (updatedMovie: IDetailedMovie) => {
          console.log('Getting movie details from FL');
          // eslint-disable-next-line require-atomic-updates
          updatedMovie.ready = await getFLReady(updatedMovie);
          updateMoviesArray.push(updateMovie(updatedMovie));
        });
        Promise.all(updateMoviesArray)
          .then(() => {
            console.log('All movies updated successfully');
            // eslint-disable-next-line no-process-exit
            process.exit(0);
          })
          .catch((err) => {
            throw err;
          });
      })
      .catch((err) => {
        throw err;
      });
  } catch (error) {
    throw error;
  }
};

updateDb();
