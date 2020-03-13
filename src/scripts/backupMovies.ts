import fs from 'fs';
import { getAllMovies } from '../api';
import { IDetailedMovie } from '../screens/MovieList';

const backupMovies = async () => {
  const movies: IDetailedMovie[] = await getAllMovies();
  const json = JSON.stringify(movies);
  fs.writeFile(`movie-backup-${Date.now()}.json`, json, 'utf8', (err) => {
    // eslint-disable-next-line no-console
    console.log('eror: ', err);
  });
};

backupMovies();
