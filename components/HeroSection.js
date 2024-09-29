import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography } from '@mui/material';
import { useLoading } from '../contexts/LoadingContext';
import { useError } from '../contexts/ErrorContext';
import Loading from '../components/Loading';

const HeroSection = () => {
    const [imageUrl, setImageUrl] = useState('');
    const { isLoading, setIsLoading } = useLoading();
    const { triggerError, clearError } = useError();

    useEffect(() => {
        const fetchRandomMuseumImage = async () => {
            setIsLoading(true);
            clearError();
            try {
                const response = await axios.get('/api/home-image-search');
                setImageUrl(response.data.imageUrl);
            } catch (error) {
                console.error('Error fetching random image:', error);
                triggerError('Failed to load the hero image. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchRandomMuseumImage();
    }, [setIsLoading, triggerError, clearError]);

    return (
        <Box
            sx={{
                position: 'relative',
                height: '80vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#000',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundImage: `url(${imageUrl})`,
            }}
        >
            {isLoading ? (
                <Loading />
            ) : (
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: '20%',
                        textAlign: 'center',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        padding: '20px',
                        borderRadius: '8px',
                    }}
                >
                    <Typography variant="h2" component="h1" color="white">
                        Explore the World's Museums
                    </Typography>
                </Box>
            )}
        </Box>
    );
};

export default HeroSection;
