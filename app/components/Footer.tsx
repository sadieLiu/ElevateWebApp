/* This component represents the footer that is used across the site */
'use client';
import React from 'react';
import { Box, Container, Typography, Grid, Link, Divider } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';

interface FooterProps {}
const Footer = () => {
  const { user, logout } = useAuth();
  const router = useRouter();

  return (
    <Box component="footer" sx={{bgcolor: 'secondary.main', color: 'white', pt: 6, pb: 3, mt: 'auto'}}>
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, sm: 6, md: 6 }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Elevate Tutoring
            </Typography>
            <Typography variant="body1" sx={{ maxWidth: 400 }}>
              Premium, personalized tutoring for K-12 students across all subjects. 
              Unlocking each student's full potential.
            </Typography>
          </Grid>
         
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              { user ? (
                <>
                <Link href="/dashboard" color="inherit" underline="hover">Dashboard</Link>
                <Link href={user.role == 'admin' ? "/schedule" : "/calendar"} color = "inherit" underline = "hover" > {user.role == 'admin' ? "Schedule" : "Calendar"}</Link>
                <Link href="#" color="inherit" underline="hover" onClick={(e) => {e.preventDefault(); logout(); router.push('/');}}>Logout</Link>
                </>
              ) : (
                <>
                <Link href="/" color="inherit" underline="hover">Home</Link>
                <Link href="/contact" color="inherit" underline="hover">Contact Us</Link>
                <Link href="/login" color="inherit" underline="hover">Login</Link>
                </>
              )}
              
            </Box>
          </Grid>
          
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Contact Info
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Email: info@elevate-edu.com
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Phone: (111) 222-3344
            </Typography>
            <Typography variant="body2">
              Hours: Mon-Fri, 8AM-6PM
            </Typography>
          </Grid>
        </Grid>

      </Container>
    </Box>
  );
};

export default Footer;