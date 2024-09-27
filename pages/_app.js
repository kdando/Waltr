import { LoadingProvider } from '@/contexts/LoadingContext';
import { ErrorProvider } from '@/contexts/ErrorContext';

import { CollectionProvider } from '../contexts/CollectionContext';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../contexts/ThemeProvider';
import '../styles/globals.css';
import Layout from '../components/Layout';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
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
  );
}

export default MyApp;
