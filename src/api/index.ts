import { IDBMovie, IDetailedMovie } from '../screens/MovieList';
import { firebase } from '../utils/firebase';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const imdb = require('imdb-api');

const imdbClient = new imdb.Client({
  apiKey: `${process.env.REACT_APP_IMDB_API_KEY}`,
});
const moviesdb = firebase.firestore().collection('movies');

export const getMovieById = async (movieId: string) => {
  return imdbClient.get({ id: movieId });
};

export const getAllMovies = async () => {
  try {
    const snapshot = await moviesdb.get();
    const movies = snapshot.docs.map((doc) => doc.data());

    return movies as IDetailedMovie[];
  } catch (error) {
    throw error;
  }
};

export const addMovie = async (imdbid: string, excitement: number) => {
  try {
    const detailedMovie = await getMovieById(imdbid);
    await moviesdb.add({
      ...detailedMovie,
      excitement,
    });
  } catch (error) {
    throw error;
  }
};

export const deleteMovie = async (imdbid: string) => {
  try {
    const moviesQuery = moviesdb.where('imdbid', '==', imdbid);
    const snapshot = await moviesQuery.get();
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    snapshot.forEach(async (item) => {
      await item.ref.delete();
    });

    return 'ok';
  } catch (error) {
    throw error;
  }
};

export const searchMovie = async (title: string) => {
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

export const updateMovieField = async (
  imdbid: string,
  fieldToUpdate: keyof IDBMovie,
  value: string | number
) => {
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

export const updateMovie = async (newMovieDetails: any) => {
  try {
    const moviesQuery = moviesdb.where('imdbid', '==', newMovieDetails.imdbid);
    const snapshot = await moviesQuery.get();
    snapshot.forEach((doc) => {
      const docData = doc.data();
      doc.ref.set({ ...docData, ...newMovieDetails });
    });
  } catch (error) {
    throw error;
  }
};
