import { css } from '@emotion/react';
import type { NextPage } from 'next';
import { moviesActions, useAppDispatch, useAppSelector } from '../redux';
import { useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MoviesList from '../components/movies/MoviesList';
import Box from '@mui/material/Box';

const Home: NextPage = () => {
  const dispatch = useAppDispatch();
  const moviesState = useAppSelector((state) => state.movies);
  const { data, loading } = moviesState;

  useEffect(() => {
    dispatch(moviesActions.fetch());
  }, [dispatch]);

  return (
    <Box css={styles.root} sx={{ backgroundColor: 'background.default' }}>
      <AppBar position='static'>
        <Toolbar variant='dense'>
          <Typography>{'CoolMovies'}</Typography>
        </Toolbar>
      </AppBar>
      <MoviesList {...{ data, loading }} />
    </Box>
  );
};

const styles = {
  root: css({
    height: '100vh',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }),
};

export default Home;
