/* eslint-disable @typescript-eslint/ban-ts-ignore */
/* eslint-disable no-console */
import axios from 'axios';
import { addDoc, deleteDoc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { IDetailedMovie } from '../screens/MovieList';
import { parseResponse } from '../utils';
import { db } from '../utils/firebase';


const imdbAxiosBaseParams = {
  apiKey: '50ca2246',
  r: 'json',
};

const imdbAxiosInstance = axios.create({
  baseURL: 'https://www.omdbapi.com',
});

export const getMovieById = async (movieId: string): Promise<IDetailedMovie> => {
  try {
    const { data } = await imdbAxiosInstance.get<IDetailedMovie>('', {
      params: { ...imdbAxiosBaseParams, i: movieId },
    });

    // @ts-ignore
    if (data.Error) {
      // @ts-ignore
      throw new Error(data.Error);
    }

    // @ts-ignore
    return parseResponse(data);
  } catch (error) {
    throw error;
  }
};

export const getAllMovies: () => Promise<IDetailedMovie[]> = async () => {
  try {
    const snapshot = await getDocs(db);
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
    await addDoc(db, {
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
    const moviesQuery = query(db, where('imdbid', '==', imdbid));
    const snapshot = await getDocs(moviesQuery);
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    snapshot.forEach(async (item) => {
      await deleteDoc(item.ref);
    });
  } catch (error) {
    throw error;
  }
};

export const searchMovie = async (title: string): Promise<IDetailedMovie[]> => {
  try {
    const { data } = await imdbAxiosInstance.get<{
      Response: 'True' | 'False';
      Search: IDetailedMovie[];
      totalResults: string;
    }>('', {
      params: { ...imdbAxiosBaseParams, s: title },
    });

    if (data.Response === 'True') {
      return data.Search.map((res) => parseResponse<IDetailedMovie>(res));
    }

    const movie = await getMovieById(title);

    return [movie];
  } catch (error) {
    throw error;
  }
};

export const updateMovieField: (
  imdbid: string,
  fieldToUpdate: 'imdbid' | 'excitement',
  value: string | number
) => Promise<void> = async (imdbid, fieldToUpdate, value) => {
  try {
    const moviesQuery = query(db, where('imdbid', '==', imdbid));
    const snapshot = await getDocs(moviesQuery);
    snapshot.forEach((doc) => {
      const docData = doc.data();
      setDoc(doc.ref, { ...docData, [fieldToUpdate]: value });
    });
  } catch (error) {
    throw error;
  }
};

export const updateMovie: (newMovieDetails: IDetailedMovie) => Promise<void> = async (
  newMovieDetails
) => {
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
