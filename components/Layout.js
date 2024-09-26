// components/Layout.js

import React from 'react';
import Navbar from './Navbar';
import { Container } from '@mui/material';
import Head from 'next/head';

const Layout = ({ children }) => {
    return (
        <>
            <Head>
                <title>Waltr</title>
                <meta name="description" content="Explore and curate your own art collection" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Navbar />
            <Container maxWidth="lg">
                {children}
            </Container>
        </>
    );
};

export default Layout;
