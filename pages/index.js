import { Typography, Box } from '@mui/material';
import Grid from '@mui/material/Grid2'; // Grid v2

export default function Home() {
  return (
    <>
      <Grid
        container
        component="main"
        sx={{
          minHeight: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          padding: { xs: 2, md: 4 }
        }}
      >
        <Grid xs={12} sm={8} md={6}>
          <Box>
            <Typography
              variant="h1"
              component="h1"
              gutterBottom
              sx={{ fontSize: { xs: '2.5rem', md: '4rem' } }}
            >
              Welcome to Waltr!
            </Typography>
            <Typography
              variant="body1"
              component="p"
              sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }}
            >
              Start exploring and curating your own collection of artefacts from the world's museums.
            </Typography>
            <Typography variant="h6" sx={{ mt: 2 }}>
              "Every passion borders on the chaotic, but the collector's passion borders on the chaos of memories."
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              - Walter Benjamin
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
