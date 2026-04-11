/* This is the home page of the app */

'use client'; 
import { Container, Typography, Box, Grid } from '@mui/material';
import Image from 'next/image';
import TestimonialSection from './components/Testimonials';
import { useAuth } from './context/AuthContext';

export default function Home() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <Typography variant="h5" align="center" sx={{ mt: 4 }}>Loading Page...</Typography>;
  }

  return (
    <>

      <Container maxWidth="lg" disableGutters>
        <Box sx={{ my: 4, textAlign: 'center' }}>
          <Grid container spacing={4} alignItems="center">

            {/* TEXT SECTION */}
            <Grid size={{ xs: 12, md: 6 }}>

              <Typography variant="h4" component="h1" fontWeight={'bold'} gutterBottom>
                Premium tutoring for all
              </Typography>

              <Typography variant="body1" sx={{
                maxWidth: '600px', 
                mx: { xs: 'auto', md: 0 },
                lineHeight: 1.7, 
                textAlign: 'justify', color: 'text.secondary'
              }}>
                Elevate offers premium, personalized tutoring for K-12 students across all subjects.
                Our experienced educators are dedicated to unlocking each student's full potential through 
                tailored learning strategies and one-on-one attention.
              </Typography>

            </Grid>

            
            <Grid size={{ xs: 12, md: 6 }}>
              <Box
                sx={{
                  position: 'relative',
                  width: '90%',
                  maxWidth: '1000px',
                  height: '400px',
                  mx: 'auto',
                  mt: 4,
                  borderRadius: 8,
                  overflow: 'hidden',
                  boxShadow: '0px 10px 30px rgba(0,0,0,0.15)',
                  border: '1px solid rgba(0,0,0,0.05)'
                }}
              >
                <Image
                  src="/images/stockimage.jpg"
                  alt="A student receiving tutoring"
                  fill
                  style={{
                    objectFit: 'cover',
                    objectPosition: 'center 20%'
                  }}
                  priority
                />

                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    width: '100%',
                    height: '20%',
                    background: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent)'
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>


      {/* TESTIMONIAL SECTION */}

      <Box sx={{ bgcolor: 'secondary.main', py: { xs: 5, lg: 5 } }}>
        <Container maxWidth='lg'>
          <TestimonialSection />
        </Container>
      </Box>


    </>
  );
}