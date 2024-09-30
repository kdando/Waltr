// components/HomeContent.js

import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import Grid from '@mui/material/Grid2';
import FeatureBox from '../components/FeatureBox';

const HomeContent = ({ imageUrl }) => {
    return (
        <>
            <Box sx={{ backgroundColor: '#f5f5f5', py: 4 }}>
                <Container maxWidth="md">
                    <Typography
                        variant="h6"
                        sx={{ mt: 2 }}
                        aria-label="Quote by Walter Benjamin"
                    >
                        &quot;Every passion borders on the chaotic, but the collector&apos;s passion borders on the chaos of memories.&quot;
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{ mt: 1 }}
                        aria-label="Author of the quote"
                    >
                        - Walter Benjamin
                    </Typography>
                </Container>
            </Box>

            <Box
                sx={{
                    backgroundImage: `url(${imageUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    py: 8,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '60vh',
                }}
            >
                <Container maxWidth="lg">
                    <Grid
                        container
                        spacing={4}
                        justifyContent="center"
                        alignItems="center"
                    >
                        <FeatureBox text="Search the world's museums and browse their treasures." />
                        <FeatureBox text="Save your favourites in your own personal collection." />
                        <FeatureBox text="Sign in to save your collection to your account, and it will be waiting for you at your next visit." />
                    </Grid>
                </Container>
            </Box>
        </>
    );
};

export default HomeContent;


