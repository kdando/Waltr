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
        },
        h2: {
            fontFamily: '"Playfair Display", serif',
        },
        h3: {
            fontFamily: '"Playfair Display", serif',
        },
        h4: {
            fontFamily: '"Playfair Display", serif',
        },
        h5: {
            fontFamily: '"Playfair Display", serif',
        },
        h6: {
            fontFamily: '"Playfair Display", serif',
        },
        button: {
            textTransform: 'none'
        }
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
    },
});

export default theme;
