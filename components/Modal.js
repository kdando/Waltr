import React from 'react';
import { Modal, Backdrop, Fade, Box, Typography, ImageList, ImageListItem, Button } from '@mui/material';

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
        // BackdropComponent={Backdrop}
        // BackdropProps={{
        //     timeout: 500,
        // }} DEPRECATED
        >
            <Fade in={isOpen}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '80%',
                        maxWidth: 800,
                        bgcolor: 'background.paper',
                        border: '2px solid #000',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 2,
                    }}
                >
                    <Box sx={{ flex: 1, maxWidth: '400px', padding: 1 }}>
                        <ImageList cols={1} rowHeight={164} style={{ height: 164 }}>
                            <ImageListItem key={content.primaryImageSmall}>
                                <img
                                    src={content.primaryImageSmall}
                                    alt={content.title}
                                    loading="lazy"
                                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                                />
                            </ImageListItem>
                        </ImageList>
                    </Box>
                    <Box sx={{ flex: 1, maxWidth: '400px', padding: 1 }}>
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
    );
};

export default CustomModal;