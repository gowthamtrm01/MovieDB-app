

const defaultState = {
    original: [],
    filterArray: []
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case 'ADD_MOVIE_FROM_API':
            return {
                original: [...state.original, ...action.data],
                filterArray: [...state.original, ...action.data]
            }
        case 'ADD_MOVIE':
            return {
                original: [...state.original, action.movie],
                filterArray: [...state.original, action.movie]
            }
        case 'REMOVE_MOVIE':
            return {
                original: state.original.filter((movie) => movie._id !== action.id),
                filterArray: state.original.filter((movie) => movie._id !== action.id)
            }
        case 'EDIT_MOVIE':
            return {
                original: state.original.map((movie) => {
                    if (movie._id === action.movie._id) {
                        return action.movie
                    } else {
                        return movie
                    }
                }),
                filterArray: state.filterArray.map((movie) => {
                    if (movie._id === action.movie._id) {
                        return action.movie
                    } else {
                        return movie
                    }
                })
            }
        case 'SEARCH_MOVIE':
            return {
                original: [...state.original],
                filterArray: [...action.movies]
            }
        case 'FILTER_MOVIE':
            return {
                original: [...state.original],
                filterArray: [...action.filteredMovies]
            }
        default:
            return state
    }
}