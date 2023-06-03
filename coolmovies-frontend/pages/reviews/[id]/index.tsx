import { NextPage } from 'next';
import AppLayout from '../../../components/layouts/AppLayout';
import { useRouter } from 'next/router';
import { reviewsActions, useAppDispatch, useAppSelector } from '../../../redux';
import { useEffect } from 'react';
import MovieInfo from '../../../components/movies/MovieInfo';
import Typography from '@mui/material/Typography';
import MovieReview from '../../../components/movies/MovieReview';

const Reviews: NextPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { reviews, movie, loading, error } = useAppSelector(
    (state) => state.reviews
  );

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
        />
      ))}
    </AppLayout>
  );
};

export default Reviews;
