// components/Notification.js

import React from 'react';
import { Snackbar, Alert } from '@mui/material';

const Notification = ({ open, onClose, message, severity = "info" }) => {
    return (
        <Snackbar
            open={open}
            autoHideDuration={3000}  // Disappears after 3 seconds (duration is given in ms)
            onClose={onClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            aria-live="assertive"
        >
            <Alert onClose={onClose}
                severity={severity}
                sx={{ width: '100%' }}
                role="alert">
                {message}
            </Alert>
        </Snackbar>
    );
};

export default Notification;