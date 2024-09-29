import React from 'react';
import { useSession, signOut } from 'next-auth/react';
import Login from '../components/Login';
import { Box, Typography, Button } from '@mui/material';

export default function SignIn() {
    const { data: session } = useSession();

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 3,
                textAlign: 'center',
                maxWidth: 600,
                margin: 'auto',
            }}
        >
            {!session ? (
                <Login />
            ) : (
                <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h5" gutterBottom>
                        You are logged in as {session.user.name}
                    </Typography>
                    <Button
                        variant="contained"
                        onClick={() => signOut()}
                        sx={{ marginTop: 2 }}
                    >
                        Click here to log out.
                    </Button>
                </Box>
            )}
        </Box>
    );
}
