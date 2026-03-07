/* This is the dashboard page for admins, students and tutors */

'use client';
import { Container, Typography, Box, Grid, Paper, Avatar } from '@mui/material';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
    const { user } = useAuth();

    return (
        <>
            <Container maxWidth="lg" disableGutters>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 6, mt: 4 }}>

                        <Typography variant='h4' sx={{ fontWeight: 'bold', color: 'black', mb: '1' }}>
                            Welcome Back, {user?.name}.

                            {user?.role == 'admin' && <Typography> Admin based content </Typography>}
                            {user?.role == 'tutor' && <Typography> Tutor based content </Typography>}
                            {user?.role == 'student' && <Typography> Student based content </Typography>}
                        </Typography>
                    </Box>

                </Container>

    

        </>
    );
}