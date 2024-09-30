// pages/index.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HeroSection from '../components/HeroSection';
import HomeContent from '../components/HomeContent';
import { useLoading } from '../contexts/LoadingContext';
import { useError } from '../contexts/ErrorContext';
import Loading from '../components/Loading';

const Home = () => {
  const [images, setImages] = useState([]);
  const { isLoading, setIsLoading } = useLoading();
  const { triggerError, clearError } = useError();

  useEffect(() => {
    const fetchImages = async () => {
      setIsLoading(true);
      clearError();
      try {
        const response = await axios.get('/api/home-image-search?count=2');
        setImages(response.data.imageUrls);
      } catch (error) {
        console.error('Error fetching images:', error);
        triggerError('Failed to load the images from Unsplash.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [setIsLoading, triggerError, clearError]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {images.length === 2 && (
        <>
          <HeroSection imageUrl={images[0]} />
          <HomeContent imageUrl={images[1]} />
        </>
      )}
    </>
  );
};

export default Home;
