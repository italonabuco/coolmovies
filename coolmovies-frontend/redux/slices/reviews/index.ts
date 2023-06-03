export { actions as reviewsActions } from './slice';
export { default as reviewsReducer } from './slice';
import { combineEpics } from 'redux-observable';
import { fetchReviewsEpic } from './epics';

export const reviewsEpics = combineEpics(fetchReviewsEpic);