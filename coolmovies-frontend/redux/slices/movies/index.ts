export { actions as moviesActions } from './slice';
export { default as moviesReducer } from './slice';
import { combineEpics } from 'redux-observable';
import { fetchMoviesEpic } from './epics';

export const moviesEpics = combineEpics(fetchMoviesEpic);
