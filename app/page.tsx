/* This is the home page of the app */

'use client'; 
import React from 'react';
import { Container, Typography, Box, Grid, Button} from '@mui/material';
import Image from 'next/image';
import TestimonialSection from './components/Testimonials';
import { useAuth } from './context/AuthContext';
import GradeInfo from './components/GradeInfo';

const carouselImages = [
  { src: "/images/tutoring1.png", alt: "Image 1: A student receiving tutoring" },
  { src: "/images/tutoring2.jpg", alt: "Image 2: A student receiving tutoring" },
  { src: "/images/tutoring3.jpg", alt: "Image 3: A student receiving tutoring" }
];

export default function Home() {
  const { user, isLoading } = useAuth();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  }

  if (isLoading) {
    return <Typography variant="h5" align="center" sx={{ mt: 4 }}>Loading Page...</Typography>;
  }

  return (
    <>
      <Box sx={{ bgcolor: 'primary.main', py: { xs: 5, lg: 2 } }}>
      <Container maxWidth="xl" disableGutters>
        <Box sx={{ my: 4, textAlign: 'center' }}>
          <Grid container spacing={4}   alignItems="center" justifyContent="center">

            {/* TEXT/HERO SECTION */}
            <Grid size={{ xs: 12, md: 6 }}>

              <Typography variant="h4" component="h1" fontWeight={'bold'} gutterBottom color='black' align='center'>
                Premium Tutoring for All Students
              </Typography>

              <Typography variant="body1" sx={{maxWidth: '600px', mx: 'auto', lineHeight: 1.8, fontWeight: 400, textAlign: 'center', color: 'black'}}>
                  Elevate offers premium, personalized tutoring for K-12 students across all subjects.
                  Our experienced educators are dedicated to unlocking each student's full potential through
                  tailored learning strategies and one-on-one attention.
                </Typography>

              </Grid>

              {/* IMAGE SECTION */}
              <Grid size={{ xs: 12, md: 6 }}>
                <Box
                  sx={{
                    position: 'relative',
                    width: '80%',
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
                    src={carouselImages[activeStep].src}
                    alt={carouselImages[activeStep].alt}
                    fill
                    style={{
                      objectFit: 'cover',
                      objectPosition: 'center 20%',
                      transition: 'opacity 0.5s ease-in-out',
                      transform: 'scale(1)',
                     
                    }}
                    priority
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      width: '100%',
                      height: '25%', 
                      background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)',
                      display: 'flex',
                      alignItems: 'flex-end',
                      justifyContent: 'center',
                      pb: 2,
                    }}
                  >
                    <Box sx={{ display: 'flex', gap: 1.5 }}>
                      {carouselImages.map((_, step) => (
                        <Box
                          key={step}
                          onClick={() => handleStepChange(step)}
                          sx={{
                            width: activeStep === step ? 14 : 10, 
                            height: activeStep === step ? 14 : 10,
                            borderRadius: '50%',
                            bgcolor: activeStep === step ? 'white' : 'rgba(255, 255, 255, 0.5)',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              bgcolor: 'white',
                              transform: 'scale(1.2)',
                            },
                          }}
                        />
                      ))}
                    </Box>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>

      {/* INFO ON GRADING */}
      <Box sx={{ bgcolor: 'primary.dark', py: { xs: 5, lg: 5 } }}>
        <Container maxWidth='xl'>
          <GradeInfo />
        </Container>
      </Box>


      {/* TESTIMONIAL SECTION */}

      <Box sx={{ bgcolor: 'primary.main', py: { xs: 5, lg: 5 } }}>
        <Container maxWidth='xl'>
          <TestimonialSection />
        </Container>
      </Box>

      {/* CONTACT US SECTION */}
      <Grid size={{ xs: 12, md: 8}}> 
      <Box sx={{ bgcolor: 'primary.dark', py: 12, textAlign: 'center', maxWidth: '700px', mx: 'auto' }}>
        <Container maxWidth="md">
          <Typography variant="h4" fontWeight="bold" gutterBottom color="secondary.main">
            Ready to Join ElevateEdu?
          </Typography>

          <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary', fontSize: '1.1rem' }}>
            Whether you want to want to sign your child up for our program or become apart of our team as a tutor,
            we’d love to hear from you!
          </Typography>

          <Button
            variant="contained"
            color="secondary"
            size="large"
            href="/contact"
            sx={{
              px: 6,
              py: 1.5,
              borderRadius: '50px',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              textTransform: 'none',
              boxShadow: '0px 4px 20px rgba(0,0,0,0.1)',
              '&:hover': {
                transform: 'scale(1.05)',
                transition: 'transform 0.2s ease-in-out',
              }
            }}
          >
            Contact Us Today
          </Button>
        </Container>
      </Box>
      </Grid>


    </>
  );
}