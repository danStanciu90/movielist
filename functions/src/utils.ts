/* eslint-disable @typescript-eslint/ban-ts-ignore */
import axios from 'axios';
import { config as firebaseConfig } from 'firebase-functions';
import { initializeApp } from 'firebase/app';
import {
  collection,
  DocumentData,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where
} from 'firebase/firestore';
import { IDetailedMovie } from './types';

const fbConfig = {
  apiKey: firebaseConfig().env.API_KEY,
  authDomain: firebaseConfig().env.AUTH_DOMAIN,
  databaseURL: firebaseConfig().env.DB_URL,
  projectId: firebaseConfig().env.PROJECT_ID,
  storageBucket: firebaseConfig().env.STORAGE_BUCKET,
  messagingSenderId: firebaseConfig().env.MSG_SENDER_ID,
  appId: firebaseConfig().env.APP_ID,
};

const app = initializeApp(fbConfig);
const db = collection(getFirestore(app), 'movies');

const imdbAxiosBaseParams = {
  apiKey: '50ca2246',
  r: 'json',
};
const imdbAxiosInstance = axios.create({
  baseURL: 'https://www.omdbapi.com',
});

const parseResponse = <T>(data: any): T => {
  const returnObj = {};
  Object.keys(data).forEach((key) => {
    //@ts-ignore
    returnObj[key.toLowerCase()] = data[key];
  });

  return returnObj as T;
};

export const getAllMovies = async (): Promise<DocumentData[]> => {
  try {
    const snapshot = await getDocs(db);
    const movies = snapshot.docs.map((doc) => doc.data());

    return movies;
  } catch (error) {
    throw error;
  }
};

export const getMovieById = async (movieId: string): Promise<IDetailedMovie> => {
  try {
    const { data } = await imdbAxiosInstance.get('', {
      params: { ...imdbAxiosBaseParams, i: movieId },
    });

    if (data.Error) {
      throw new Error(data.Error);
    }

    return parseResponse<IDetailedMovie>(data);
  } catch (error) {
    throw error;
  }
};

export const getFLReady = async (
  movie: IDetailedMovie
): Promise<{
  imdbid: string;
  flReady: boolean;
}> => {
  try {
    const { data } = await axios.get('https://filelist.io/api.php?', {
      params: {
        action: 'search-torrents',
        type: 'imdb',
        category: '4,19',
        query: movie.imdbid,
      },
      auth: {
        username: 'danstanciu90',
        password: firebaseConfig().env.FL_TOKEN || '',
      },
    });

    return { imdbid: movie.imdbid, flReady: data.length > 0 };
  } catch (error) {
    throw error;
  }
};

export const updateMovie = async (newMovieDetails: IDetailedMovie): Promise<void> => {
  try {
    const moviesQuery = query(db, where('imdbid', '==', newMovieDetails.imdbid));
    const snapshot = await getDocs(moviesQuery);
    const promiseArray: Promise<void>[] = [];
    snapshot.forEach((doc) => {
      promiseArray.push(setDoc(doc.ref, { ...newMovieDetails }));
    });
    await Promise.all(promiseArray);
  } catch (error) {
    throw error;
  }
};
