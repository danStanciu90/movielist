import MaterialTable, { Action, Column } from "material-table";
import React, {
  Fragment,
  FunctionComponent,
  MouseEvent,
  useEffect,
  useState
} from "react";
import { deleteMovie, getAllMovies } from "../../api";
import { Alert } from "../../components/Alert";
import { MovieDetail } from "../../components/MovieDetail";
import { useWindowSize } from "../../hooks/useWindowSize";
import { parseMovies } from "../../utils";

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
  excitement: number;
}

export const MovieList: FunctionComponent = () => {
  const [movies, setMovies] = useState<IDetailedMovie[]>([]);
  const [pageReady, setPageReady] = useState(false);
  const [deleteAlertOpen, setDeleteAlertOpen] = useState(false);
  const [movieToDelete, setMovieToDelete] = useState<IDetailedMovie>();
  const { width } = useWindowSize();

  useEffect(() => {
    getAllMovies().then(async (dbMovies: IDBMovie[]) => {
      try {
        const parsedMovies = await parseMovies(dbMovies);
        setMovies(parsedMovies);
        const x = parsedMovies.find(movie => movie.imdbid === "tt6866224");
        console.log("x: ", x);
        setPageReady(true);
      } catch (error) {
        console.log("error parsing the movies: ", error);
      }
    });
  }, []);

  const handleDeleteMovie = async () => {
    if (!movieToDelete) {
      return;
    }
    try {
      await deleteMovie(movieToDelete.imdbid);
      const remaining: IDetailedMovie[] = movies.filter(
        m => m.imdbid !== movieToDelete.imdbid
      );
      setMovies(remaining);
      setDeleteAlertOpen(false);
    } catch (error) {
      console.log("error deleting the movie", error);
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

  const renderDetailPanel = (rowData: IDetailedMovie) => {
    return <MovieDetail movie={rowData} />;
  };

  const tableActions: (
    | Action<IDetailedMovie>
    | ((rowData: IDetailedMovie) => Action<IDetailedMovie>))[] = [
    {
      icon: "delete",
      iconProps: { color: "error" },
      tooltip: "Delete",
      onClick: (_event, rowData) => {
        setDeleteAlertOpen(true);
        if (rowData instanceof Array) {
          return;
        }
        setMovieToDelete(rowData);
      }
    }
  ];

  let tableColumns: Column<IDetailedMovie>[] = [
    { title: "Title", field: "title" },
    {
      title: "Release  Date",
      field: "releasedFmt",
      customSort: (a, b) => a.released.getTime() - b.released.getTime()
    },
    { title: "Rating", field: "rating", type: "numeric" },
    { title: "FL Ready", field: "ready", lookup: { true: "Yes", false: "No" } }
  ];

  if (width < 700) {
    tableColumns = [
      { title: "Title", field: "title" },
      {
        title: "FL Ready",
        field: "ready",
        lookup: { true: "Yes", false: "No" }
      }
    ];
  }

  return (
    <Fragment>
      <MaterialTable
        columns={tableColumns}
        data={movies}
        options={{ paging: false, detailPanelType: "single" }}
        isLoading={!pageReady}
        title=""
        actions={tableActions}
        detailPanel={renderDetailPanel}
        onRowClick={handleRowClick}
      />
      <Alert
        open={deleteAlertOpen}
        title={`Delete "${movieToDelete ? movieToDelete.title : "movie"}"`}
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
