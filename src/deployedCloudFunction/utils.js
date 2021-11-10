const { collection, getFirestore, getDocs, query, setDoc, where } = require('firebase/firestore');
const axios = require('axios');
const { initializeApp } = require('firebase/app');

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DB_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MSG_SENDER_ID,
  appId: process.env.APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = collection(getFirestore(app), 'movies');

const imdbAxiosBaseParams = {
  apiKey: '50ca2246',
  r: 'json',
};
const imdbAxiosInstance = axios.create({
  baseURL: 'https://www.omdbapi.com',
});

const parseResponse = (data) => {
  const returnObj = {};
  Object.keys(data).forEach((key) => {
    returnObj[key.toLowerCase()] = data[key];
  });
  return returnObj;
};

exports.getAllMovies = async () => {
  try {
    const snapshot = await getDocs(db);
    const movies = snapshot.docs.map((doc) => doc.data());
    return movies;
  } catch (error) {
    throw error;
  }
}

exports.getMovieById = async (movieId) => {
  try {
    const { data } = await imdbAxiosInstance.get('', {
      params: { ...imdbAxiosBaseParams, i: movieId },
    });

    if (data.Error) {
      throw new Error(data.Error);
    }

    return parseResponse(data);
  } catch (error) {
    throw error;
  }
};

exports.getFLReady = async (movie) => {
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
        password: process.env.FL_TOKEN,
      },
    });

    return { imdbid: movie.imdbid, flReady: data.length > 0 };
  } catch (error) {
    throw error;
  }
};

exports.updateMovie = async (newMovieDetails) => {
  try {
    const moviesQuery = query(db, where('imdbid', '==', newMovieDetails.imdbid));
    const snapshot = await getDocs(moviesQuery);
    const promiseArray = [];
    snapshot.forEach((doc) => {
      promiseArray.push(setDoc(doc.ref, { ...newMovieDetails }));
    });
    await Promise.all(promiseArray);
  } catch (error) {
    throw error;
  }
};