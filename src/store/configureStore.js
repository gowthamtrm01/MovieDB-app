import { createStore, combineReducers } from 'redux';
import movieReducers from './../reducers/movieReducers';

export default () => {
    const store = createStore(combineReducers({
        movieStore: movieReducers
    }))
    return store;
}