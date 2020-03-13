/* eslint-disable no-console */

// eslint-disable-next-line @typescript-eslint/no-var-requires
import { getAllMovies, getMovieById, updateMovie } from '../api';
import { IDetailedMovie } from '../screens/MovieList';
import { getFLReady } from '../utils';

// firebaseInit();
const updateDb = async () => {
  try {
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
          .catch((err) => console.log('error updating movies', err));
      })
      .catch((err) => {
        console.log('error getting movie details from imdb', err);
      });
  } catch (error) {
    console.log('error: ', error);
  }
};

updateDb();
