import '../styles/globals.css';
import type { AppProps } from 'next/app';
import React, { FC } from 'react';
import Head from 'next/head';
import { ReduxProvider } from '../redux';
import { ThemeProvider } from '@mui/material';
import { MuiTheme } from '../libs/mui';

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>{'Coolmovies Frontend'}</title>
        <meta charSet='UTF-8' />
        <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      </Head>
      <ReduxProvider>
        <ThemeProvider theme={MuiTheme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </ReduxProvider>
    </>
  );
};

export default App;
