// components/Notification.js

import React from 'react';
import { Snackbar, Alert } from '@mui/material';

const Notification = ({ open, onClose, message, severity = "info" }) => {
    return (
        <Snackbar
            open={open}
            autoHideDuration={2000}  // Disappears after 2 second (duration is given in ms)
            onClose={onClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
            <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    );
};

export default Notification;