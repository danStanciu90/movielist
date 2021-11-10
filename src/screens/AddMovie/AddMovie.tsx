import { Container, List } from '@material-ui/core';
import React, { Fragment, FunctionComponent, useState } from 'react';
import { addMovie, searchMovie } from '../../api';
import { ExcitementDialog } from '../../components/ExcitementDialog';
import { LoadingOverlay } from '../../components/LoadingOverlay/LoadingOverlay';
import { MovieListItem } from '../../components/MovieListItem';
import { Searchbar } from '../../components/Searchbar';
import { IDetailedMovie } from '../MovieList';

export const AddMovie: FunctionComponent = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState('');
  const [searchResults, setSearchResults] = useState<IDetailedMovie[]>([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [movieToAdd, setMovieToAdd] = useState('');
  const [excitementLevel, setExcitementLevel] = useState(0);

  // useEffect(() => {
  //   firebase.auth().onAuthStateChanged((user) => {
  //     if (!user) {
  //       window.open('/signin', '_self');
  //     }
  //   });
  // }, []);

  const handleSearchRequest = async () => {
    try {
      setError('');
      const results = await searchMovie(searchQuery);
      setSearchResults(results);
    } catch (e) {
      const err = e as Error;
      setError(err.message);
    } finally {
      setSearchQuery('');
    }
  };

  const handleMovieClick = (movieId: string) => {
    setMovieToAdd(movieId);
    setShowModal(true);
  };

  const handleAddMovie = async () => {
    try {
      setLoading(true);
      await addMovie(movieToAdd, excitementLevel);
      window.open('/', '_self');
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log('error adding a movie');
      setLoading(false);
      setShowModal(false);
    }
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleExcitementChange = (_event: React.ChangeEvent<{}>, value: number) => {
    setExcitementLevel(value);
  };

  return (
    <Fragment>
      <Container>
        <Searchbar
          inputValue={searchQuery}
          label="Movie title"
          onChange={setSearchQuery}
          onSearchRequest={handleSearchRequest}
        />
        {searchResults.length ? (
          <List>
            {searchResults.map((movie, index) => (
              <MovieListItem
                key={`SearchResults-MovieItem-${index}`}
                movie={movie}
                onClick={handleMovieClick}
              />
            ))}
          </List>
        ) : (
          <div>{error ? error : 'No movie found'}</div>
        )}
        <ExcitementDialog
          excitementLevel={excitementLevel}
          onAddMovie={handleAddMovie}
          onClose={handleClose}
          onExcitementChange={handleExcitementChange}
          show={showModal}
        />
      </Container>
      {loading && <LoadingOverlay />}
    </Fragment>
  );
};
