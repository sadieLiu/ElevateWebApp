/* This is the contact page */

'use client';
import { Container, Typography, Box, Grid } from '@mui/material';
import ContactSection from "../components/ContactCard";
import { useAuth } from '../context/AuthContext';

export default function Contact() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <Typography variant="h5" align="center" sx={{ mt: 4 }}>Loading Page...</Typography>;
  }

  return (
    <>
      <Container maxWidth="lg" disableGutters>
        <Container maxWidth="lg">
          
          <Box
            sx={{
              mt: 10,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center'
            }}
          >
           
            <Typography variant="h2" component="h1" fontWeight='bold' gutterBottom>
              Contact Us
            </Typography>

            <Typography variant="body1" sx={{ maxWidth: '600px', color: 'text.secondary' }}>
              Have a question about our tutoring services? We're here to help.
              Please reach out to us by email, phone or stop by our offices for more information.
            </Typography>
          </Box>
        </Container>
      </Container>
      <ContactSection />
    </>
  );
}