// components/FeatureBox.js

import React from 'react';
import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useTheme } from '@mui/material/styles';

const FeatureBox = ({ text }) => {
    const theme = useTheme();
    const [firstWord, ...restWords] = text.split(' ');

    return (
        <Grid xs={12} md={4}>
            <Box
                sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    padding: '40px', // Chunkier feel
                    borderRadius: '12px', // Increased border radius
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center', // Ensure content is centered vertically and horizontally
                    height: '100%', // Full height for equal height
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                    textAlign: 'center', // Center the text inside the box
                }}
            >
                <Typography variant="h5" component="h3">
                    <Box component="span" sx={{ color: theme.palette.primary.main, fontStyle: 'italic', fontFamily: theme.typography.h5.fontFamily }}>
                        {firstWord}
                    </Box>
                    <Box component="span" sx={{ fontFamily: theme.typography.fontFamily }}>
                        {' ' + restWords.join(' ')}
                    </Box>
                </Typography>
            </Box>
        </Grid>
    );
};

export default FeatureBox;
