const { getFLReady, getAllMovies, getMovieById, updateMovie } = require('./utils');

exports.handler = async () => {
  try {
    const dbMovies = await getAllMovies();
    console.log('All movies received from firebase db');

    const imdbMoviesArray = dbMovies.map((movie) => getMovieById(movie.imdbid));

    const imdbMovies = await Promise.all(imdbMoviesArray);
    console.log('All movie details received');

    const flMoviesArray = imdbMovies.map((movie) => getFLReady(movie));
    const flMovies = await Promise.all(flMoviesArray);

    console.log('All movie details from FL received');

    imdbMovies.forEach((imdbMovie) => {
      const flMovie = flMovies.find((m) => m.imdbid === imdbMovie.imdbid);
      const dbMovie = dbMovies.find((m) => m.imdbid === imdbMovie.imdbid);
      imdbMovie.ready = flMovie?.flReady ?? false;
      if (dbMovie?.excitement) {
        imdbMovie.excitement = dbMovie?.excitement;
      }
    });

    const updateMoviesArray = imdbMovies.map((movie) => updateMovie(movie));
    await Promise.all(updateMoviesArray);
    console.log('All movies updated');
  } catch (error) {
    throw error;
  }
};
