// components/Navbar.js

import React from 'react';
import Link from 'next/link';
import { Button, AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = () => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <AppBar position="static">
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Typography variant="h6" component="div" aria-label="Website Name">
                    Waltr
                </Typography>

                <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                    <IconButton
                        size="large"
                        aria-label="menu"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleOpenNavMenu}
                        color="inherit"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorElNav}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElNav)}
                        onClose={handleCloseNavMenu}
                    >
                        <MenuItem onClick={handleCloseNavMenu}>
                            <Link href="/" passHref>
                                <Button color="inherit" sx={{ width: '100%' }}>
                                    Welcome
                                </Button>
                            </Link>
                        </MenuItem>
                        <MenuItem onClick={handleCloseNavMenu}>
                            <Link href="/my-collection" passHref>
                                <Button color="inherit" sx={{ width: '100%' }}>
                                    My Collection
                                </Button>
                            </Link>
                        </MenuItem>
                        <MenuItem onClick={handleCloseNavMenu}>
                            <Link href="/search" passHref>
                                <Button color="inherit" sx={{ width: '100%' }}>
                                    Search
                                </Button>
                            </Link>
                        </MenuItem>
                        <MenuItem onClick={handleCloseNavMenu}>
                            <Link href="/sign-in" passHref>
                                <Button color="inherit" sx={{ width: '100%' }}>
                                    Sign In
                                </Button>
                            </Link>
                        </MenuItem>
                    </Menu>
                </Box>

                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end' }}>
                    <Button color="inherit" component={Link} href="/" aria-label="Navigate to Welcome page">
                        Welcome
                    </Button>
                    <Button color="inherit" component={Link} href="/my-collection" aria-label="Navigate to My Collection page">
                        My Collection
                    </Button>
                    <Button color="inherit" component={Link} href="/search" aria-label="Navigate to Search page">
                        Search
                    </Button>
                    <Button color="inherit" component={Link} href="/sign-in" aria-label="Navigate to Sign In page">
                        Sign In
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

//ALT BELOW

// export default Navbar;

// import React from 'react';
// import Link from 'next/link';
// import { Button, AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Box } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';

// const Navbar = () => {
//     const [anchorElNav, setAnchorElNav] = React.useState(null);

//     const handleOpenNavMenu = (event) => {
//         setAnchorElNav(event.currentTarget);
//     };

//     const handleCloseNavMenu = () => {
//         setAnchorElNav(null);
//     };

//     return (
//         <AppBar position="static">
//             <Toolbar sx={{ justifyContent: 'space-between' }}>
//                 <Typography variant="h6" component="div" aria-label="Website Name">
//                     Waltr
//                 </Typography>

//                 <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
//                     <IconButton
//                         size="large"
//                         aria-label="menu"
//                         aria-controls="menu-appbar"
//                         aria-haspopup="true"
//                         onClick={handleOpenNavMenu}
//                         color="inherit"
//                     >
//                         <MenuIcon />
//                     </IconButton>
//                     <Menu
//                         id="menu-appbar"
//                         anchorEl={anchorElNav}
//                         anchorOrigin={{
//                             vertical: 'bottom',
//                             horizontal: 'right',
//                         }}
//                         keepMounted
//                         transformOrigin={{
//                             vertical: 'top',
//                             horizontal: 'right',
//                         }}
//                         open={Boolean(anchorElNav)}
//                         onClose={handleCloseNavMenu}
//                     >
//                         {['/', '/my-collection', '/search', '/signup'].map((href, index) => {
//                             const labels = ['Welcome', 'My Collection', 'Search', 'Sign Up/Log In'];
//                             return (
//                                 <MenuItem key={index} onClick={handleCloseNavMenu}>
//                                     <Link href={href} passHref>
//                                         <Button color="inherit" sx={{ width: '100%' }}>
//                                             {labels[index]}
//                                         </Button>
//                                     </Link>
//                                 </MenuItem>
//                             );
//                         })}
//                     </Menu>
//                 </Box>

//                 <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end' }}>
//                     {['/', '/my-collection', '/search', '/signup'].map((href, index) => {
//                         const labels = ['Welcome', 'My Collection', 'Search', 'Sign Up/Log In'];
//                         return (
//                             <Button
//                                 key={index}
//                                 color="inherit"
//                                 component={Link}
//                                 href={href}
//                                 aria-label={`Navigate to ${labels[index]} page`}
//                             >
//                                 {labels[index]}
//                             </Button>
//                         );
//                     })}
//                 </Box>
//             </Toolbar>
//         </AppBar>
//     );
// };

export default Navbar;

