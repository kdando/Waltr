// pages/_app.js

import { SessionProvider } from 'next-auth/react';
import { LoadingProvider } from '@/contexts/LoadingContext';
import { ErrorProvider } from '@/contexts/ErrorContext';
import { CollectionProvider } from '../contexts/CollectionContext';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Head from 'next/head';
import theme from '../contexts/ThemeProvider';
import '../styles/globals.css';
import Layout from '../components/Layout';

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <LoadingProvider>
          <ErrorProvider>
            <CollectionProvider>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </CollectionProvider>
          </ErrorProvider>
        </LoadingProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}

export default MyApp;
