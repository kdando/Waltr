// components/Error.js

import React from 'react';
import { Alert, AlertTitle, IconButton, Box, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useError } from '@/contexts/ErrorContext';

const Error = () => {
    const { errorMessage, clearError } = useError();

    const handleClose = () => {
        clearError();
        window.location.reload();
    };

    return (
        <Box
            role="alertdialog"
            aria-labelledby="error-title"
            aria-describedby="error-description"
            sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1300,
                padding: 2
            }}
        >
            <Alert
                severity="error"
                action={
                    <IconButton
                        aria-label="close error alert"
                        color="inherit"
                        size="small"
                        onClick={handleClose}
                    >
                        <CloseIcon fontSize="inherit" />
                    </IconButton>
                }
                sx={{
                    backgroundColor: 'red',
                    border: '1px solid red',
                    width: { xs: '90%', sm: '80%', md: '60%' }
                }}
            >
                <AlertTitle id="error-title">Something went wrong :(</AlertTitle>
                <Typography variant="body2" id="error-description" gutterBottom>
                    {errorMessage ? errorMessage : "An unknown error occurred."}
                </Typography>
                <Typography variant="body2">
                    Close this box to reload the page.
                </Typography>
            </Alert>
        </Box>
    );
};

export default Error;
