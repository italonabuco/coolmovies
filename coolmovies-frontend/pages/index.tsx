import type { NextPage } from 'next';
import { moviesActions, useAppDispatch, useAppSelector } from '../redux';
import { useEffect } from 'react';
import MoviesList from '../components/movies/MoviesList';
import AppLayout from '../components/layouts/AppLayout';

const Home: NextPage = () => {
  const dispatch = useAppDispatch();
  const moviesState = useAppSelector((state) => state.movies);
  const { data, loading } = moviesState;

  useEffect(() => {
    dispatch(moviesActions.fetch());
  }, [dispatch]);

  return (
    <AppLayout title="Movies">
      <MoviesList {...{ data, loading }} />
    </AppLayout>
  );
};

export default Home;
