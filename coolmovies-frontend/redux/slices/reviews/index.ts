export { actions as reviewsActions } from './slice';
export { default as reviewsReducer } from './slice';
import { combineEpics } from 'redux-observable';
import {
  addReviewEpic,
  deleteReviewEpic,
  fetchReviewsEpic,
  updateReviewEpic,
} from './epics';

export const reviewsEpics = combineEpics(
  fetchReviewsEpic,
  addReviewEpic,
  deleteReviewEpic,
  updateReviewEpic
);
