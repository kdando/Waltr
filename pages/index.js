'use client';

import HeroSection from '@/components/HeroSection';
import { Typography, Box } from '@mui/material';
import Grid from '@mui/material/Grid2'; // Grid v2
import { useSession } from 'next-auth/react';

export default function Home() {
  const { data: session } = useSession();

  return (
    <>
      <HeroSection />
      <Grid
        container
        component="main"
        sx={{
          minHeight: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          padding: { xs: 2, md: 4 },
        }}
      >
        <Grid xs={12} sm={8} md={6}>
          <Box>
            <Typography
              variant="h1"
              component="h1"
              gutterBottom
              sx={{ fontSize: { xs: '2.5rem', md: '4rem' } }}
              aria-label="Welcome message"
            >
              {session ? `Welcome back to Waltr, ${session.user.name}!` : 'Welcome to Waltr!'}
            </Typography>
            <Typography
              variant="body1"
              component="p"
              sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }}
              aria-label="Introduction to the app"
            >
              Start exploring and curating your own collection of artefacts from the world's museums.
            </Typography>
            <Typography
              variant="h6"
              sx={{ mt: 2 }}
              aria-label="Quote by Walter Benjamin"
            >
              "Every passion borders on the chaotic, but the collector's passion borders on the chaos of memories."
            </Typography>
            <Typography
              variant="body1"
              sx={{ mt: 1 }}
              aria-label="Author of the quote"
            >
              - Walter Benjamin
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
