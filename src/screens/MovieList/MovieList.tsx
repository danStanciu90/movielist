import React, { FunctionComponent, useState, useEffect, Fragment, MouseEvent } from 'react';
import { getAllMovies, deleteMovie } from '../../api';
import { parseMovies } from '../../utils';
import { MovieDetail } from '../../components/MovieDetail';
import MaterialTable, { Action, Column } from 'material-table';
import { Alert } from '../../components/Alert';

const width = window.innerWidth;

export interface IDBMovie {
  imdbid: string;
  excitement?: number;
}

export interface IDetailedMovie {
  title: string;
  rating: number;
  year: number;
  released: Date;
  releasedFmt: string;
  poster: string;
  dvd?: string;
  actors: string;
  genres: string;
  plot: string;
  ready: boolean;
  imdbid: string;
}

export const MovieList: FunctionComponent = () => {
  const [movies, setMovies] = useState<IDetailedMovie[]>([]);
  const [pageReady, setPageReady] = useState(false);
  const [deleteAlertOpen, setDeleteAlertOpen] = useState(false);
  const [movieToDelete, setMovieToDelete] = useState<IDetailedMovie>()

  useEffect(() => {
    getAllMovies().then(async (dbMovies: IDBMovie[]) => {
      try {
        const parsedMovies = await parseMovies(dbMovies);
        setMovies(parsedMovies)
        setPageReady(true)
      } catch (error) {
        console.log('error parsing the movies: ', error);
      }

    })
  }, [])

  const handleDeleteMovie = async () => {
    if (!movieToDelete) {
      return;
    }
    try {
      await deleteMovie(movieToDelete.imdbid)
      const remaining: IDetailedMovie[] = movies.filter(m => m.imdbid !== movieToDelete.imdbid)
      setMovies(remaining)
      setDeleteAlertOpen(false)
    } catch (error) {
      console.log('error deleting the movie', error);

    }
  }

  const handleRowClick = (_event: MouseEvent | undefined, _rowData: IDetailedMovie | undefined, togglePanel: ((panelIndex?: number) => void) | undefined) => {
    if (!togglePanel) {
      return;
    }
    togglePanel()
  }

  const renderDetailPanel = (rowData: IDetailedMovie) => {
    return <MovieDetail movie={rowData} />
  }

  const tableActions: (Action<IDetailedMovie> | ((rowData: IDetailedMovie) => Action<IDetailedMovie>))[] = [
    {
      icon: 'delete',
      iconProps: { color: 'error' },
      tooltip: 'Delete',
      onClick: (_event, rowData) => {
        setDeleteAlertOpen(true);
        if (rowData instanceof Array) {
          return;
        }
        setMovieToDelete(rowData)
      }
    }
  ]

  let tableColumns: Column<IDetailedMovie>[] = [
    { title: 'Title', field: 'title' },
    { title: 'Release  Date', field: 'releasedFmt', customSort: (a, b) => a.released.getTime() - b.released.getTime() },
    { title: 'Rating', field: 'rating', type: 'numeric' },
    { title: 'FL Ready', field: 'ready', lookup: { true: 'Yes', false: 'No' } }
  ]

  if (width < 1000) {
    tableColumns = [
      { title: 'Title', field: 'title' },
      { title: 'FL Ready', field: 'ready', lookup: { true: 'Yes', false: 'No' } }
    ]
  }

  return (
    <Fragment>
      <MaterialTable
        columns={tableColumns}
        data={movies}
        options={{ paging: false, detailPanelType: 'single' }}
        isLoading={!pageReady}
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
          setMovieToDelete(undefined)
        }}
        onSuccess={handleDeleteMovie}
      />
    </Fragment>
  );
}