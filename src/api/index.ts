/* eslint-disable no-console */
import { IDetailedMovie } from '../screens/MovieList';
import { firebase } from '../utils/firebase';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const imdb = require('imdb-api');

const imdbClient = new imdb.Client({
  apiKey: `${process.env.REACT_APP_IMDB_API_KEY}`,
});
const moviesdb = firebase.firestore().collection('movies');

export const getMovieById: (movieId: string) => Promise<IDetailedMovie> = (movieId: string) =>
  imdbClient.get({ id: movieId });

export const getAllMovies: () => Promise<IDetailedMovie[]> = async () => {
  try {
    const snapshot = await moviesdb.get();
    const movies = snapshot.docs.map((doc) => doc.data());

    return movies as IDetailedMovie[];
  } catch (error) {
    throw error;
  }
};

export const addMovie: (imdbid: string, excitement: number) => Promise<void> = async (
  imdbid,
  excitement
) => {
  try {
    const detailedMovie = await getMovieById(imdbid);
    await moviesdb.add({
      ...detailedMovie,
      excitement,
      ready: false,
    });
  } catch (error) {
    throw error;
  }
};

export const deleteMovie: (imdbid: string) => Promise<void> = async (imdbid: string) => {
  try {
    const moviesQuery = moviesdb.where('imdbid', '==', imdbid);
    const snapshot = await moviesQuery.get();
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    snapshot.forEach(async (item) => {
      await item.ref.delete();
    });
  } catch (error) {
    throw error;
  }
};

export const searchMovie: (title: string) => Promise<IDetailedMovie[]> = async (title: string) => {
  try {
    const response = await imdbClient.search({ name: title });

    return response.results;
  } catch (error) {
    if (error.message.includes('Movie not found')) {
      const movie = await getMovieById(title);

      return [movie];
    }
    throw error;
  }
};

export const updateMovieField: (
  imdbid: string,
  fieldToUpdate: 'imdbid' | 'excitement',
  value: string | number
) => Promise<void> = async (imdbid, fieldToUpdate, value) => {
  try {
    const moviesQuery = moviesdb.where('imdbid', '==', imdbid);
    const snapshot = await moviesQuery.get();
    snapshot.forEach((doc) => {
      const docData = doc.data();
      doc.ref.set({ ...docData, [fieldToUpdate]: value });
    });
  } catch (error) {
    throw error;
  }
};

export const updateMovie: (newMovieDetails: IDetailedMovie) => Promise<void> = async (
  newMovieDetails
) => {
  try {
    const moviesQuery = moviesdb.where('imdbid', '==', newMovieDetails.imdbid);
    const snapshot = await moviesQuery.get();
    const promiseArray: Promise<void>[] = [];
    snapshot.forEach((doc) => {
      promiseArray.push(moviesdb.doc(doc.id).set({ ...newMovieDetails }));
      // doc.ref.set({ ...docData, ...newMovieDetails });
    });
    await Promise.all(promiseArray);
  } catch (error) {
    throw error;
  }
};
