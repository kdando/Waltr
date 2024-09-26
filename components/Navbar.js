// components/Navbar.js

import Link from 'next/link';
import { Button, AppBar, Toolbar, Typography } from '@mui/material';

const Navbar = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Waltr
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