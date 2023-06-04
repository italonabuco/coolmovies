import type { NextPage } from 'next';
import { moviesActions, useAppDispatch, useAppSelector } from '../redux';
import { useEffect } from 'react';
import MoviesList from '../components/movies/MoviesList';
import AppLayout from '../components/layouts/AppLayout';
import { useRouter } from 'next/router';

const Home: NextPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const moviesState = useAppSelector((state) => state.movies);
  const { data, loading } = moviesState;

  useEffect(() => {
    dispatch(moviesActions.fetch());
  }, [dispatch]);

  const handleItemClick = (id: string) => {
    router.push(`/reviews/${id}`);
  };

  return (
    <AppLayout title='Movies'>
      <MoviesList {...{ data, loading }} onItemClick={handleItemClick} />
    </AppLayout>
  );
};

export default Home;
