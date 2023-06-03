import { NextPage } from 'next';
import AppLayout from '../../../components/layouts/AppLayout';
import { useRouter } from 'next/router';
import { reviewsActions, useAppDispatch, useAppSelector } from '../../../redux';
import { useEffect } from 'react';
import MovieInfo from '../../../components/movies/MovieInfo';

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
    </AppLayout>
  );
};

export default Reviews;
