import { IDetailedMovie, IDBMovie } from "../screens/MovieList"
import { getMovieById } from "../api"
import moment from "moment"

export const calculateAvailability = (movie: IDetailedMovie) => {
  if (movie.dvd) {
    let dvdDate = Date.parse(movie.dvd)
    if (Date.now() > dvdDate) return true
    else return false
  }
  else if (movie.released) {
    let releaseDate = Date.parse(movie.released.toString())
    let newDate = new Date()
    newDate.setMonth(newDate.getMonth() - 3)
    let dateToCalculate1 = Date.parse(newDate.toString())
    if (dateToCalculate1 > releaseDate) return true
    else {
      let newDate2 = new Date()
      newDate2.setMonth(newDate2.getMonth() - 2)
      let dateToCalculate2 = Date.parse(newDate2.toString())
      if (dateToCalculate2 > releaseDate) return true
      else return false
    }
  }
  else return false
}

export const parseMovies: (movies: IDBMovie[]) => Promise<IDetailedMovie[]> = (movies) => {
  return new Promise((resolve, reject) => {
    let parsedMovies: IDetailedMovie[] = []
    let promiseArray: Promise<IDetailedMovie>[] = [];

    movies.forEach(async (movie: IDBMovie) => {
      promiseArray.push(getMovieById(movie.imdbid))
    });

    Promise.all(promiseArray)
      .then((detailedMovies) => {
        detailedMovies.forEach((detailedMovie: IDetailedMovie) => {
          detailedMovie.releasedFmt = moment(detailedMovie.released).format('DD/MM/YYYY')
          detailedMovie.ready = calculateAvailability(detailedMovie)
          parsedMovies.push(detailedMovie)
        })

        return resolve(parsedMovies)
      })
      .catch(err => { return reject(err) })

  })
}