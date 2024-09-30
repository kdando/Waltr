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
                triggerError('Failed to load the image. Please try again later.');
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
                flexDirection: 'column',
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
                        textAlign: 'center',
                        textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                    }}
                >
                    <Typography variant="h1" component="h1" color="white" sx={{ fontSize: { xs: '4rem', sm: '6rem', md: '8rem' }, fontWeight: 'bold' }}>
                        Waltr
                    </Typography>
                    <Typography variant="h4" component="h2" color="white" sx={{ mt: 2 }}>
                        The world&apos;s treasures at your fingertips
                    </Typography>
                </Box>
            )}
        </Box>
    );
};

export default HeroSection;