// components/Navbar.js

import { Button, AppBar, Toolbar, Typography } from '@mui/material';
import Link from 'next/link';

const Navbar = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    My App
                </Typography>
                <Button color="inherit" component={Link} href="/">
                    Welcome
                </Button>
                <Button color="inherit" component={Link} href="/my-collection">
                    My Collection
                </Button>
                <Button color="inherit" component={Link} href="/search">
                    Search
                </Button>
                <Button color="inherit" component={Link} href="/signup">
                    Sign Up/Log In
                </Button>
            </Toolbar>
        </AppBar>
    );
};
export default Navbar;