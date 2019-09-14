const imdb = require('imdb-api')
const imdbClient = new imdb.Client({ apiKey: '50ca2246' });

export const getMovieById = async (movieId: string) => {
  return await imdbClient.get({ id: movieId })
}
