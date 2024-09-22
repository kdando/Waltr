// components/Loading.js

import React, { useState, useEffect } from 'react';
import { useLoading } from '../contexts/LoadingContext';
import quotes from '../public/quotes.json';
import { CircularProgress, Typography } from '@mui/material';

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

    if (!isLoading) {
        return null;
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <CircularProgress />
            <Typography variant="h4" sx={{ mt: 2 }}>
                {randomQuote.text}
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
                - {randomQuote.author}
            </Typography>
        </div>
    );
};

export default Loading;