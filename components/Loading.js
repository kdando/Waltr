// components/Loading.js

import React, { useState, useEffect } from 'react';
import { useLoading } from '../contexts/LoadingContext';
import quotes from '../public/quotes.json';
import { CircularProgress, Typography, Box } from '@mui/material';

const Loading = () => {
    const [randomQuote, setRandomQuote] = useState('');
    const { isLoading } = useLoading();

    useEffect(() => {
        const fetchRandomQuote = () => {
            const randomIndex = Math.floor(Math.random() * quotes.length);
            setRandomQuote(quotes[randomIndex]);
        };
        fetchRandomQuote();
    }, []);

    // Return null if not loading
    if (!isLoading) {
        return null;
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                textAlign: 'center'
            }}
            role="alert"
            aria-live="polite"
        >
            <CircularProgress />
            <Typography variant="h4" sx={{ mt: 2 }}>
                {randomQuote.text}
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
                - {randomQuote.author}
            </Typography>
        </Box>
    );
};

export default Loading;
