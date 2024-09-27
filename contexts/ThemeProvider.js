// contexts/ThemeProvider.js

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        background: {
            default: '#ffffff',
            paper: '#f5f5f5'
        },
        primary: {
            main: '#a57c48'
        },
        grey: {
            500: '#bdbdbd'
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontFamily: '"Playfair Display", serif',
            fontSize: '2.5rem',
            '@media (min-width:600px)': {
                fontSize: '3rem',
            },
        },
        h2: {
            fontFamily: '"Playfair Display", serif',
            fontSize: '2rem',
            '@media (min-width:600px)': {
                fontSize: '2.5rem',
            },
        },
        h3: {
            fontFamily: '"Playfair Display", serif',
            fontSize: '1.75rem',
            '@media (min-width:600px)': {
                fontSize: '2rem',
            },
        },
        h4: {
            fontFamily: '"Playfair Display", serif',
            fontSize: '1.5rem',
            '@media (min-width:600px)': {
                fontSize: '1.75rem',
            },
        },
        h5: {
            fontFamily: '"Playfair Display", serif',
            fontSize: '1.25rem',
            '@media (min-width:600px)': {
                fontSize: '1.5rem',
            },
        },
        h6: {
            fontFamily: '"Playfair Display", serif',
            fontSize: '1rem',
            '@media (min-width:600px)': {
                fontSize: '1.25rem',
            },
        },
        button: {
            textTransform: 'none',
            fontSize: '1rem', // Ensure buttons are easily readable
        },
    },
    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                    '&:hover': {
                        transform: 'translateY(-10px)',
                        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                    },
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    '&:focus': {
                        outline: '2px solid #a57c48', // Visible focus state
                    },
                },
            },
        },
    },
});

export default theme;
