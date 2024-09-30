// components/HeroSection.js

import React from 'react';
import { Box, Typography } from '@mui/material';

const HeroSection = ({ imageUrl }) => {
    return (
        <Box
            sx={{
                position: 'relative',
                height: '80vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#000',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundImage: `url(${imageUrl})`,
            }}
        >
            <Box
                sx={{
                    textAlign: 'center',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                }}
            >
                <Typography
                    variant="h1"
                    component="h1"
                    color="white"
                    sx={{ fontSize: { xs: '4rem', sm: '6rem', md: '8rem' }, fontWeight: 'bold' }}
                >
                    Waltr
                </Typography>
                <Typography variant="h4" component="h2" color="white" sx={{ mt: 2 }}>
                    The world&apos;s treasures at your fingertips
                </Typography>
            </Box>
        </Box>
    );
};

export default HeroSection;
