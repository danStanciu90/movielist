import { firebase } from '../utils/firebase';
import { IDBMovie } from '../screens/App';

const imdb = require('imdb-api')
const imdbClient = new imdb.Client({ apiKey: '50ca2246' });

export const getMovieById = async (movieId: string) => {
  return await imdbClient.get({ id: movieId })
}

export const getAllMovies = async () => {
  const snapshot = await firebase.firestore().collection('movies').get()
  const movies = snapshot.docs.map(doc => doc.data())

  return movies as IDBMovie[];
}