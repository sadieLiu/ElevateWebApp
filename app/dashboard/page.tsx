/* This is the dashboard page for admins, students and tutors */

'use client';
import { Container, Typography, Box, Grid } from '@mui/material';

export default function Dashboard() {
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
                            Welcome back!
                        </Typography>

                        <Typography variant="body1" sx={{ maxWidth: '600px', color: 'text.secondary' }}>
                           ``
                        </Typography>
                    </Box>
                </Container>
            </Container>

        </>
    );
        }