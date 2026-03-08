/* This is the dashboard page for admins, students and tutors */

'use client';
import { Container, Typography, Box, Grid, Paper, Avatar } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import AdminView from '../components/AdminView';
import StudentView from '../components/StudentView';
import TutorView from '../components/TutorView';

export default function Dashboard() {
    const { user } = useAuth();

    return (
        <>
            <Container maxWidth="lg" disableGutters>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 6, mt: 4 }}>

                    <Typography variant='h4' sx={{ fontWeight: 'bold', color: 'black', mb: 1 }}>
                        Welcome Back, {user?.name}.
                    </Typography>
                </Box>

                {user?.role === 'admin' && <AdminView/>}
                {user?.role === 'tutor' && <TutorView/>}
                {user?.role === 'student' && <StudentView/>}

            </Container>

        </>
    );
}