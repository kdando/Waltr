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
        window.location.reload(); // reloads the page when we close the error alert
    };

    return (
        <Box
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
                bgcolor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
            }}
        >
            <Alert
                severity="error"
                variant="filled"
                action={
                    <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={handleClose}
                    >
                        <CloseIcon fontSize="inherit" />
                    </IconButton>
                }
                sx={{ backgroundColor: 'rgba(255, 0, 0, 0.1)', border: '1px solid red' }}
            >
                <AlertTitle>Something went wrong :(</AlertTitle>
                {errorMessage}
                Close this box to reload the page.
            </Alert>
        </Box>
    );
};

export default Error;