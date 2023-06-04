import { css } from '@emotion/react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';
import React from 'react';

interface IAppLayout {
  children?: React.ReactNode;
  title?: string;
}

const AppLayout: React.FC<IAppLayout> = ({ children, title }) => {
  const router = useRouter();
  const goToHome = () => router.push('/');
  return (
    <Box css={styles.root} sx={{ backgroundColor: 'background.default' }}>
      <AppBar position='static'>
        <Toolbar variant='dense'>
          <Typography onClick={goToHome} sx={{ cursor: 'pointer' }}>
            {'CoolMovies'}
          </Typography>
        </Toolbar>
      </AppBar>
      <Container sx={{ my: 3 }} maxWidth='md'>
        <Typography
          sx={{ marginBottom: 3, color: 'text.secondary' }}
          variant='h4'
        >
          {title}
        </Typography>
        {children}
      </Container>
    </Box>
  );
};

const styles = {
  root: css({
    minHeight: '100vh',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }),
};

export default AppLayout;
