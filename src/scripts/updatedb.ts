import { getAllMovies, getMovieById, updateMovie } from '../api';

// firebaseInit();
const updateDb = async () => {
  try {
    const dbMovies = await getAllMovies();
    dbMovies.forEach(async (dbMovie) => {
      const detailedMovie = await getMovieById(dbMovie.imdbid);
      await updateMovie(detailedMovie);
    });
  } catch (error) {
    console.log('error: ', error);
  }
};

updateDb();
