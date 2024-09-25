// components/Layout.js
import React from 'react';
import Navbar from './Navbar';
import { Container } from '@mui/material';

const Layout = ({ children }) => {
    return (
        <>
            <Navbar /> {/* This will now appear on every page */}
            <Container maxWidth="lg">
                {children} {/* This is where the individual page content will be rendered */}
            </Container>
        </>
    );
};

export default Layout;
