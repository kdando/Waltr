// components/Error.js

import React from 'react';
import { Alert, AlertTitle, IconButton, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useError } from '@/contexts/ErrorContext';

const Error = () => {
    const { errorMessage, clearError } = useError();

    console.log("Current error message:", errorMessage); // FYI


    // if (!errorMessage) return null;

    const handleClose = () => {
        clearError();
        window.location.reload(); // Reloads the page when we close the error alert
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
                zIndex: 1300, // MUI zIndex for modals/dialogs

                padding: 2, // Add some padding to the container
            }}
        >
            <Alert
                severity="error"
                variant="filled"
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
                    backgroundColor: 'rgba(255, 0, 0, 0.1)',
                    border: '1px solid red',
                    width: { xs: '90%', sm: '80%', md: '60%' }, // Responsive width
                }}
            >
                <AlertTitle id="error-title">Something went wrong :(</AlertTitle>
                <span id="error-description">{errorMessage}</span>
                <span> Close this box to reload the page.</span>
            </Alert>
        </Box>
    );
};

export default Error;
