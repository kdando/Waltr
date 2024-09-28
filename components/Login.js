'use client';

import React from 'react';
import { signIn } from 'next-auth/react';
import { Button, Typography, Box } from '@mui/material';

export default function Login() {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 3,
                textAlign: 'center',
                borderRadius: 1,
                boxShadow: 1,
                bgcolor: 'background.paper',
                maxWidth: 400,
                margin: 'auto'
            }}
        >
            <Typography variant="h5" gutterBottom>
                Sign In to save your collection.
            </Typography>
            <Typography variant="body1" gutterBottom>
                Your data is securely managed by Google and will not be used by this app for any purpose other than saving your collection.
            </Typography>
            <Button
                variant="contained"
                onClick={() => signIn('google')}
                sx={{ marginTop: 2 }}
            >
                Sign in with Google
            </Button>
        </Box>
    );
}
