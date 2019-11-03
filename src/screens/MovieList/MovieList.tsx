import { DeleteForever, Favorite } from '@material-ui/icons';
import { Rating } from '@material-ui/lab';
import { withStyles } from '@material-ui/styles';
import MaterialTable, { Action, Column } from 'material-table';
import moment from 'moment';
import React, { Fragment, FunctionComponent, MouseEvent, useEffect, useState } from 'react';
import { deleteMovie, getAllMovies, updateMovieField } from '../../api';
import { Alert } from '../../components/Alert';
import { MovieDetail } from '../../components/MovieDetail';
import { useWindowSize } from '../../hooks/useWindowSize';
import { calculateAvailability } from '../../utils';

export interface IDBMovie {
  imdbid: string;
  excitement?: number;
}

const StyledRating = withStyles({
  iconFilled: {
    color: '#f50057',
  },
  iconHover: {
    color: '#c51162',
  },
})(Rating);

export interface IDetailedMovie {
  title: string;
  rating: number;
  year: number;
  released: any;
  releasedFmt: string;
  poster: string;
  dvd?: string;
  actors: string;
  genres: string;
  plot: string;
  ready: boolean;
  imdbid: string;
  excitement: number;
}

export const MovieList: FunctionComponent = () => {
  const [movies, setMovies] = useState<IDetailedMovie[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteAlertOpen, setDeleteAlertOpen] = useState(false);
  const [movieToDelete, setMovieToDelete] = useState<IDetailedMovie>();
  const { width } = useWindowSize();

  useEffect(() => {
    getTableData();
  }, []);

  const getTableData = async () => {
    getAllMovies()
      .then(async (dbMovies: IDetailedMovie[]) => {
        dbMovies.forEach((dbMovie: IDetailedMovie) => {
          dbMovie.releasedFmt = moment(dbMovie.released.seconds * 1000).format('DD/MM/YYYY');
          dbMovie.ready = calculateAvailability(dbMovie);
        });
        setMovies(dbMovies);
        setLoading(false);
      })
      .catch((err) => console.log('error getting the movies', err));
  };

  const handleDeleteMovie = async () => {
    if (!movieToDelete) {
      return;
    }
    try {
      await deleteMovie(movieToDelete.imdbid);
      const remaining: IDetailedMovie[] = movies.filter((m) => m.imdbid !== movieToDelete.imdbid);
      setMovies(remaining);
      setDeleteAlertOpen(false);
    } catch (error) {
      console.log('error deleting the movie', error);
    }
  };

  const handleRowClick = (
    _event: MouseEvent | undefined,
    _rowData: IDetailedMovie | undefined,
    togglePanel: ((panelIndex?: number) => void) | undefined
  ) => {
    if (!togglePanel) {
      return;
    }
    togglePanel();
  };

  const handleExcitementChange = async (imdbid: string, value: number) => {
    try {
      await updateMovieField(imdbid, 'excitement', value);
      const movieArray = [...movies];
      const movieToChange = movieArray.find((movie) => movie.imdbid === imdbid);
      if (movieToChange) {
        movieToChange.excitement = value;
      }
      setMovies(movieArray);
    } catch (error) {
      console.log('error updating the movie', error);
    }
  };

  const renderDetailPanel = (rowData: IDetailedMovie) => {
    return <MovieDetail movie={rowData} onExcitementChange={handleExcitementChange} />;
  };

  const tableActions: (
    | Action<IDetailedMovie>
    | ((rowData: IDetailedMovie) => Action<IDetailedMovie>))[] = [
    {
      icon: () => <DeleteForever color="secondary" />,
      tooltip: 'Delete',
      onClick: (_event, rowData) => {
        setDeleteAlertOpen(true);
        if (rowData instanceof Array) {
          return;
        }
        setMovieToDelete(rowData);
      },
    },
  ];

  let tableColumns: Column<IDetailedMovie>[] = [
    { title: 'Title', field: 'title' },
    {
      title: 'Release  Date',
      field: 'releasedFmt',
      customSort: (a, b) => a.released.getTime() - b.released.getTime(),
    },
    {
      title: 'Excitement',
      field: 'excitement',
      render: (data) => (
        <StyledRating
          name="Excitement Level"
          value={data.excitement}
          icon={<Favorite fontSize="inherit" />}
          readOnly
        />
      ),
    },
    { title: 'Rating', field: 'rating', type: 'numeric' },
    { title: 'FL Ready', field: 'ready', lookup: { true: 'Yes', false: 'No' } },
    { title: 'Actors', field: 'actors', hidden: true, searchable: true },
    { title: 'Genre', field: 'genres', hidden: true, searchable: true },
  ];

  if (width < 700) {
    tableColumns = [
      { title: 'Title', field: 'title' },
      {
        title: 'FL Ready',
        field: 'ready',
        lookup: { true: 'Yes', false: 'No' },
      },
      { title: 'Actors', field: 'actors', hidden: true, searchable: true },
      { title: 'Genre', field: 'genres', hidden: true, searchable: true },
    ];
  }

  return (
    <Fragment>
      <MaterialTable
        columns={tableColumns}
        data={movies}
        options={{ paging: false, detailPanelType: 'single' }}
        isLoading={loading}
        title=""
        actions={tableActions}
        detailPanel={renderDetailPanel}
        onRowClick={handleRowClick}
      />
      <Alert
        open={deleteAlertOpen}
        title={`Delete "${movieToDelete ? movieToDelete.title : 'movie'}"`}
        message="Are you sure you want to delete this movie?"
        onCancel={() => {
          setDeleteAlertOpen(false);
          setMovieToDelete(undefined);
        }}
        onSuccess={handleDeleteMovie}
      />
    </Fragment>
  );
};
