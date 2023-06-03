import { gql } from '@apollo/client';
import { Epic, StateObservable } from 'redux-observable';
import { Observable } from 'rxjs';
import { switchMap, filter } from 'rxjs/operators';
import { RootState } from '../../store';
import { EpicDependencies } from '../../types';
import { actions, SliceAction } from './slice';

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

const allMovieReviewsQuery = gql`
  query AllMovieReviews($movieId: UUID!) {
    reviews: allMovieReviews(condition: { movieId: $movieId }) {
      nodes {
        id
        rating
        title
        body
        userByUserReviewerId {
          name
          id
        }
      }
    }
    movie: movieById(id: $movieId) {
      id
      imgUrl
      title
      releaseDate
    }
  }
`;
