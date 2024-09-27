// components/CustomModal.js

import React, { useState, useEffect } from 'react';
import { Modal, Fade, Box, Typography, Button, IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CloseIcon from '@mui/icons-material/Close';

const CustomModal = ({ isOpen, onRequestClose, content }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [images, setImages] = useState([]);

    useEffect(() => {
        if (content.objectImages && content.objectImages.length > 0) {
            setImages(content.objectImages);
        } else if (content.primaryImageSmall) {
            setImages([content.primaryImageSmall]);
        } else {
            setImages([]);
        }
    }, [content]);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                onRequestClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onRequestClose]);

    const handleClose = () => {
        onRequestClose();
    };

    const handlePrevImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex > 0 ? prevIndex - 1 : images.length - 1
        );
    };

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex < images.length - 1 ? prevIndex + 1 : 0
        );
    };

    return (
        <Modal
            open={isOpen}
            onClose={handleClose}
            closeAfterTransition
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
        >
            <Fade in={isOpen}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '90%',
                        maxWidth: 1000,
                        maxHeight: '90vh',
                        bgcolor: 'background.paper',
                        border: '2px solid #000',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 2,
                        overflow: 'auto',
                    }}
                >
                    {/* Close Button */}
                    <IconButton
                        onClick={handleClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                        aria-label="Close modal"
                    >
                        <CloseIcon />
                    </IconButton>

                    {/* Image being viewed */}
                    {images.length > 0 && (
                        <Box sx={{ width: '100%', height: 400, mb: 2, position: 'relative' }}>
                            <img
                                src={images[currentImageIndex]}
                                alt={content.title || 'Artwork image'}
                                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                            />
                            {images.length > 1 && (
                                <>
                                    <IconButton
                                        onClick={handlePrevImage}
                                        sx={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)' }}
                                        aria-label="Previous image"
                                    >
                                        <ArrowBackIosNewIcon />
                                    </IconButton>
                                    <IconButton
                                        onClick={handleNextImage}
                                        sx={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)' }}
                                        aria-label="Next image"
                                    >
                                        <ArrowForwardIosIcon />
                                    </IconButton>
                                </>
                            )}
                        </Box>
                    )}

                    {/* Image Carousel */}
                    {images.length > 1 && (
                        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2, overflow: 'hidden' }}>
                            <Box sx={{ display: 'flex', overflowX: 'auto', maxWidth: '100%' }}>
                                {images.map((image, index) => (
                                    <Box
                                        key={index}
                                        onClick={() => setCurrentImageIndex(index)}
                                        sx={{
                                            width: 80,
                                            height: 80,
                                            flexShrink: 0,
                                            mx: 0.5,
                                            cursor: 'pointer',
                                            border: currentImageIndex === index ? '2px solid blue' : 'none',
                                        }}
                                    >
                                        <img
                                            src={image}
                                            alt={`Thumbnail ${index + 1}`}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                    )}


                    <Typography variant="h4" id="transition-modal-title" gutterBottom>
                        {content.title}
                    </Typography>
                    <Typography variant="body1" id="transition-modal-description" gutterBottom>
                        {content.objectName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                        <strong>Culture or Place of Origin:</strong> {content.culture}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                        <strong>Period:</strong> {content.period}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                        {content.briefDescription}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                        <strong>Repository:</strong> {content.repository}
                    </Typography>
                    <Button
                        size="small"
                        target="_blank"
                        href={content.objectURL}
                        rel="noopener noreferrer"
                        aria-label="More details about the artwork"
                    >
                        More Details (External Site)
                    </Button>
                </Box>
            </Fade>
        </Modal>
    );
};

export default CustomModal;
