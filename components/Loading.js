// components/Loading.js
import React, { useState, useEffect } from 'react';
import { useLoading } from '../contexts/LoadingContext';
import quotes from '../public/quotes.json';


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
        <div>
            <blockquote>{randomQuote.text}</blockquote>
            <p>{randomQuote.author}</p>
            <p>Loading...</p>
        </div>
    );
};

export default Loading;