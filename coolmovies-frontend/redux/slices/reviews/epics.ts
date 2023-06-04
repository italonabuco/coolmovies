import { Epic, StateObservable } from 'redux-observable';
import { Observable } from 'rxjs';
import { switchMap, filter } from 'rxjs/operators';
import { RootState } from '../../store';
import { EpicDependencies } from '../../types';
import { actions, SliceAction } from './slice';
import {
  allMovieReviewsQuery,
  createMovieReviewMutation,
  deleteMovieReviewByIdMutation,
  updateMovieReviewByIdMutation,
} from './queries';

export const fetchReviewsEpic: Epic = (
  action$: Observable<SliceAction['fetch']>,
  state$: StateObservable<RootState>,
  { client }: EpicDependencies
) =>
  action$.pipe(
    filter(actions.fetch.match),
    switchMap(async (action) => {
      try {
        const result = await client.query({
          query: allMovieReviewsQuery,
          variables: { movieId: action.payload.id },
        });
        return actions.loaded({ data: result.data });
      } catch (err) {
        return actions.loadError();
      }
    })
  );

export const addReviewEpic: Epic = (
  action$: Observable<SliceAction['add']>,
  state$: StateObservable<RootState>,
  { client }: EpicDependencies
) =>
  action$.pipe(
    filter(actions.add.match),
    switchMap(async (action) => {
      try {
        const partialReviewInfo = {
          title: action.payload.title,
          body: action.payload.body,
          rating: action.payload.rating,
        };
        const result = await client.mutate({
          mutation: createMovieReviewMutation,
          variables: {
            input: {
              movieReview: {
                ...partialReviewInfo,
                movieId: action.payload.movieId,
                userReviewerId: action.payload.userId,
              },
            },
          },
        });
        const { createMovieReview } = result.data;
        return actions.added({
          ...partialReviewInfo,
          id: createMovieReview.movieReview.id,
          userByUserReviewerId:
            createMovieReview.movieReview.userByUserReviewerId,
        });
      } catch (err: any) {
        const errorMessage = err?.message || 'Error adding :(';
        alert(errorMessage);
        return actions.addError(errorMessage);
      }
    })
  );

export const deleteReviewEpic: Epic = (
  action$: Observable<SliceAction['delete']>,
  state$: StateObservable<RootState>,
  { client }: EpicDependencies
) =>
  action$.pipe(
    filter(actions.delete.match),
    switchMap(async (action) => {
      try {
        const result = await client.mutate({
          mutation: deleteMovieReviewByIdMutation,
          variables: { input: { id: action.payload.id } },
        });
        return actions.deleted({
          id: result.data.deleteMovieReviewById.movieReview.id,
        });
      } catch (err: any) {
        alert(err?.message || 'Error deleting');
      }
    })
  );

export const updateReviewEpic: Epic = (
  action$: Observable<SliceAction['update']>,
  state$: StateObservable<RootState>,
  { client }: EpicDependencies
) =>
  action$.pipe(
    filter(actions.update.match),
    switchMap(async (action) => {
      try {
        const { body, rating, title } = action.payload;
        const result = await client.mutate({
          mutation: updateMovieReviewByIdMutation,
          variables: {
            input: {
              id: state$.value.reviews.editingId,
              movieReviewPatch: { body, title, rating },
            },
          },
        });
        return actions.updated({
          id: result.data.updateMovieReviewById.movieReview.id,
          body,
          title,
          rating,
        });
      } catch (err: any) {
        alert(err?.message || 'Error updating');
      }
    })
  );
