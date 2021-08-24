
export const addMovie = (data) => {
    return {
        type: 'ADD_MOVIE_FROM_API',
        data
    }
}

export const addSingleMovie = (movie) => {
    return {
        type: 'ADD_MOVIE',
        movie
    }
}

export const removeMovie = ({ id }) => {
    return {
        type: 'REMOVE_MOVIE',
        id
    }
}

export const editMovie = (movie) => {
    return {
        type: 'EDIT_MOVIE',
        movie
    }
}

export const searchMovie = (movies) => {
    return {
        type: 'SEARCH_MOVIE',
        movies
    }
}

export const filteredMovies = (filteredMovies) => {
    return {
        type: 'FILTER_MOVIE',
        filteredMovies
    }
}