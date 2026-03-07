/* This is the dashboard page for admins, students and tutors */

'use client';
import { Container, Typography, Box, Grid, Paper, Avatar } from '@mui/material';

export default function Dashboard() {
    return (
        <>
            <Container maxWidth="lg" disableGutters>

                <Container maxWidth="lg">

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 6, mt: 4 }}>

                        <Typography variant='h4' sx={{ fontWeight: 'bold', color: 'black', mb: '1' }}>
                            Welcome Back!
                        </Typography>
                    </Box>

                </Container>

            </Container>

        </>
    );
}