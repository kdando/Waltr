import Head from 'next/head';
import Navbar from '../components/Navbar';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Waltr</title>
        <meta name="description" content="Explore and curate your own art collection" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to Waltr!
        </h1>
        <p className={styles.description}>
          Start exploring and curating your own art collection.
        </p>
      </main>
    </div>
  );
}