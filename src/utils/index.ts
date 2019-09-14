import { IDetailedMovie } from "../screens/App/App"

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