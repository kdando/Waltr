// components/Modal.js

import React from 'react';
import { Modal, Backdrop, Fade, Box, Typography, ImageList, ImageListItem, ImageListItemBar, Button } from '@mui/material';

const CustomModal = ({ isOpen, onRequestClose, content }) => {
    const handleClose = () => {
        onRequestClose();
    };

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={isOpen}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
                style: { backgroundColor: 'rgba(0, 0, 0, 0.75)' },
            }}
        >
            <Fade in={isOpen}>
                <Box sx={{ maxWidth: '80%', maxHeight: '80%', margin: 'auto', padding: 2, display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="h6" id="transition-modal-title">
                        {content.title}
                    </Typography>
                    <Typography variant="body1" id="transition-modal-description">
                        {content.objectName}
                    </Typography>
                    <ImageList sx={{ flexGrow: 1, marginTop: '1rem' }} cols={2} rowHeight={164}>
                        <ImageListItem key={content.primaryImageSmall}>
                            <img
                                src={content.primaryImageSmall}
                                alt={content.title}
                                loading="lazy"
                                style={{ width: '100%', height: 'auto' }}
                            />
                            <ImageListItemBar
                                title={content.title}
                                subtitle={`${content.objectDate} | ${content.culture}`}
                                actionIcon={
                                    <Button
                                        size="small"
                                        target="_blank"
                                        href={content.objectURL}
                                        rel="noopener noreferrer"
                                    >
                                        More Details
                                    </Button>
                                }
                            />
                        </ImageListItem>
                    </ImageList>
                    <Typography variant="body2" color="text.secondary" mt={2}>
                        <strong>Period:</strong> {content.period}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <strong>Repository:</strong> {content.repository}
                    </Typography>
                </Box>
            </Fade>
        </Modal>
    );
};

export default CustomModal;