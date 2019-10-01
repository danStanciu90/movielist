import React, { FunctionComponent, Fragment, useState } from 'react';
import { Container, List } from '@material-ui/core';
import { Searchbar } from '../../components/Searchbar';
import { searchMovie, addMovie } from '../../api';
import { MovieListItem } from '../../components/MovieListItem';
import { LoadingOverlay } from '../../components/LoadingOverlay/LoadingOverlay';

export const AddMovie: FunctionComponent = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearchRequest = async () => {
    try {
      const results = await searchMovie(searchQuery)
      setSearchResults(results)
    } catch (error) {
      console.log('error searching for the movie', error);
    } finally {
      setSearchQuery('')
    }
  }

  const handleMovieClick = async (movieId: string) => {
    try {
      setLoading(true)
      await addMovie(movieId)
      window.open('/', '_self')
    } catch (error) {
      console.log('error adding a movie');
      setLoading(false)
    }
  }

  return (
    <Fragment>
      <Container>
        <Searchbar
          onChange={setSearchQuery}
          onSearchRequest={handleSearchRequest}
          inputValue={searchQuery}
          label="Movie title"
        />
        {searchResults.length ?
          (<List>
            {searchResults.map((movie, index) => <MovieListItem movie={movie} onClick={handleMovieClick} key={`SearchResults-MovieItem-${index}`} />)}
          </List>) : <div>No movie found</div>
        }
      </Container>
      {loading && <LoadingOverlay />}
    </Fragment>
  )
}
