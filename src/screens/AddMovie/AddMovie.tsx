import { Container, List } from "@material-ui/core";
import React, { Fragment, FunctionComponent, useState } from "react";
import { addMovie, searchMovie } from "../../api";
import { ExcitementDialog } from "../../components/ExcitementDialog";
import { LoadingOverlay } from "../../components/LoadingOverlay/LoadingOverlay";
import { MovieListItem } from "../../components/MovieListItem";
import { Searchbar } from "../../components/Searchbar";

export const AddMovie: FunctionComponent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [movieToAdd, setMovieToAdd] = useState("");
  const [excitementLevel, setExcitementLevel] = useState(0);

  const handleSearchRequest = async () => {
    try {
      const results = await searchMovie(searchQuery);
      setSearchResults(results);
    } catch (error) {
      console.log("error searching for the movie", error);
    } finally {
      setSearchQuery("");
    }
  };

  const handleMovieClick = async (movieId: string) => {
    setMovieToAdd(movieId);
    setShowModal(true);
  };

  const handleAddMovie = async () => {
    try {
      setLoading(true);
      await addMovie(movieToAdd, excitementLevel);
      window.open("/", "_self");
    } catch (error) {
      console.log("error adding a movie");
      setLoading(false);
      setShowModal(false);
    }
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleExcitementChange = (
    _event: React.ChangeEvent<{}>,
    value: number
  ) => {
    setExcitementLevel(value);
  };

  return (
    <Fragment>
      <Container>
        <Searchbar
          onChange={setSearchQuery}
          onSearchRequest={handleSearchRequest}
          inputValue={searchQuery}
          label="Movie title"
        />
        {searchResults.length ? (
          <List>
            {searchResults.map((movie, index) => (
              <MovieListItem
                movie={movie}
                onClick={handleMovieClick}
                key={`SearchResults-MovieItem-${index}`}
              />
            ))}
          </List>
        ) : (
          <div>No movie found</div>
        )}
        <ExcitementDialog
          show={showModal}
          excitementLevel={excitementLevel}
          onClose={handleClose}
          onAddMovie={handleAddMovie}
          onExcitementChange={handleExcitementChange}
        />
      </Container>
      {loading && <LoadingOverlay />}
    </Fragment>
  );
};
