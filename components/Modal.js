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
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '80%',
                        padding: 2,
                    }}
                >
                    <Box sx={{ width: '50%', maxWidth: '300px', padding: 1 }}>
                        <ImageList cols={1} rowHeight={164}>
                            <ImageListItem key={content.primaryImageSmall}>
                                <img
                                    src={content.primaryImageSmall}
                                    alt={content.title}
                                    loading="lazy"
                                    style={{ width: '100%', height: 'auto' }}
                                />
                            </ImageListItem>
                        </ImageList>
                    </Box>
                    <Box sx={{ width: '50%', maxWidth: '300px', padding: 1 }}>
                        <Typography variant="h4" id="transition-modal-title">
                            {content.title}
                        </Typography>
                        <Typography variant="body1" id="transition-modal-description">
                            {content.objectName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" mt={2}>
                            <strong>Period:</strong> {content.period}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            <strong>Repository:</strong> {content.repository}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            <strong>Date:</strong> {content.objectDate}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            <strong>Culture:</strong> {content.culture}
                        </Typography>
                        <Button
                            size="small"
                            target="_blank"
                            href={content.objectURL}
                            rel="noopener noreferrer"
                        >
                            More Details
                        </Button>
                    </Box>
                </Box>
            </Fade>
        </Modal>
    )
};

export default CustomModal;