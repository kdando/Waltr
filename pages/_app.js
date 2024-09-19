// pages/_app.js

import { CollectionProvider } from '../contexts/CollectionContext';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <CollectionProvider>
      <Component {...pageProps} />
    </CollectionProvider>
  );
}

export default MyApp;