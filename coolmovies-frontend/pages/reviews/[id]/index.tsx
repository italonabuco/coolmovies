import { NextPage } from 'next';
import AppLayout from '../../../components/layouts/AppLayout';
import { useRouter } from 'next/router';
import { reviewsActions, useAppDispatch, useAppSelector } from '../../../redux';
import { useCallback, useEffect } from 'react';
import MovieInfo from '../../../components/movies/MovieInfo';
import Typography from '@mui/material/Typography';
import MovieReview from '../../../components/movies/MovieReview';
import MovieReviewForm, {
  IMovieReviewForm,
} from '../../../components/movies/MovieReviewForm';
import Box from '@mui/material/Box';

const Reviews: NextPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { reviews, movie, mutation, editingId } = useAppSelector(
    (state) => state.reviews
  );
  const { loading, error } = mutation;

  useEffect(() => {
    if (router.query.id)
      dispatch(reviewsActions.fetch({ id: router.query.id.toString() }));
  }, [dispatch, router.query.id]);

  const onSubmitMovieReviewForm: IMovieReviewForm['onSubmit'] = useCallback(
    (data, editing) => {
      if (router.query.id) {
        if (editing) {
          return dispatch(reviewsActions.update({ ...data }));
        }
        return dispatch(
          reviewsActions.add({
            ...data,
            movieId: router.query.id.toString(),
          })
        );
      }
    },
    [dispatch, router.query.id]
  );

  return (
    <AppLayout title={'Reviews'}>
      {movie && (
        <MovieInfo
          img={movie.imgUrl}
          title={movie.title}
          year={movie.releaseDate.slice(0, 'yyyy'.length)}
        />
      )}
      {router.query.id && !Boolean(editingId) && (
        <Box sx={{ mt: 2 }}>
          <MovieReviewForm
            title='Add review'
            onSubmit={onSubmitMovieReviewForm}
            loading={loading}
          />
        </Box>
      )}

      <Typography
        sx={{ marginTop: 3 }}
        component='p'
        variant='h6'
        color='text.secondary'
      >
        People reviews
      </Typography>
      {reviews.map(({ body, id, title, rating, userByUserReviewerId }) =>
        id !== editingId ? (
          <MovieReview
            key={id}
            {...{ body, title, rating, userName: userByUserReviewerId.name }}
            onEdit={() => dispatch(reviewsActions.editing(id))}
            onDelete={() => dispatch(reviewsActions.delete({ id }))}
          />
        ) : (
          <MovieReviewForm
            key={id}
            title='Edit review'
            initialValues={{
              body,
              title,
              rating,
              userByUserReviewerId,
            }}
            editing
            onSubmit={onSubmitMovieReviewForm}
            loading={loading}
            onCancel={() => dispatch(reviewsActions.editing())}
          />
        )
      )}
    </AppLayout>
  );
};

export default Reviews;
