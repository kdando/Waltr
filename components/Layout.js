import React from 'react';
import Navbar from './Navbar';
import { Container } from '@mui/material';
import Head from 'next/head';
import { useError } from '@/contexts/ErrorContext';
import Error from './Error';

const Layout = ({ children }) => {
    const { errorMessage, clearError } = useError();

    return (
        <>
            <Head>
                <title>Waltr</title>
                <meta name="description" content="Explore and curate your own art collection" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Navbar />


            {/* Conditionally render the Error component if there's an error */}
            {errorMessage && <Error />}

            {/* Main stuff */}
            {children}

        </>
    );
};

export default Layout;
