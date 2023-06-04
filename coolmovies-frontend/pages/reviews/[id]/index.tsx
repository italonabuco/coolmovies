import { NextPage } from 'next';
import AppLayout from '../../../components/layouts/AppLayout';
import { useRouter } from 'next/router';
import { reviewsActions, useAppDispatch, useAppSelector } from '../../../redux';
import { useEffect } from 'react';
import MovieInfo from '../../../components/movies/MovieInfo';
import Typography from '@mui/material/Typography';
import MovieReview from '../../../components/movies/MovieReview';
import MovieReviewForm from '../../../components/movies/MovieReviewForm';
import Box from '@mui/material/Box';

const Reviews: NextPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { reviews, movie, mutation } = useAppSelector((state) => state.reviews);
  const { loading, error } = mutation;

  useEffect(() => {
    if (router.query.id)
      dispatch(reviewsActions.fetch({ id: router.query.id.toString() }));
  }, [dispatch, router.query.id]);

  return (
    <AppLayout title={'Reviews'}>
      {movie && (
        <MovieInfo
          img={movie.imgUrl}
          title={movie.title}
          year={movie.releaseDate.slice(0, 'yyyy'.length)}
        />
      )}
      {router.query.id && (
        <Box sx={{ mt: 2 }}>
          <MovieReviewForm
            onSubmit={(data, isNew) => {
              if (router.query.id) {
                dispatch(
                  reviewsActions.add({
                    ...data,
                    movieId: router.query.id.toString(),
                  })
                );
              }
            }}
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
      {reviews.map(({ body, id, title, rating, userByUserReviewerId }) => (
        <MovieReview
          key={id}
          {...{ body, title, rating, userName: userByUserReviewerId.name }}
          onDelete={() => dispatch(reviewsActions.delete({ id }))}
        />
      ))}
    </AppLayout>
  );
};

export default Reviews;
