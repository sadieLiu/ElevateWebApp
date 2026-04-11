/* This page shows information for all tutors in the database */
'use client';
import React, { useEffect, useState } from "react";
import { Container, Box, Grid, Typography, Paper } from "@mui/material";
import TutorInfoCard from "../components/TutorInfoCard"; 
import TutorDropdown from "../components/tutorPicker";
import { useAuth } from "../context/AuthContext";

type Tutor = {
    tutorId: number;
    name: string;
    birthday: string;
    subjects: string;
    availability: string;
    isAdmin: boolean;
};

const TutorInfoPage: React.FC = () => {
    const [tutors, setTutors] = useState<Tutor[]>([]);
    const [selectedTutor, setSelectedTutor] = useState<Tutor | null>(null);
    const { user, isLoading: isAuthLoading } = useAuth();
    const [dataLoading, setDataLoading] = useState(true);

    useEffect(() => {
        const fetchTutors = async () => {
            const response = await fetch("http://127.0.0.1:5000/api/tutors");
            const data: Tutor[] = await response.json();
            setTutors(data);
            if (data.length > 0) setSelectedTutor(data[0]);
            setDataLoading(false);
        }
        fetchTutors();

    }, []);


    if (isAuthLoading || dataLoading) { // this makes sure that the dropdown and info table render at the same time
        return <Typography variant="h5" align="center" sx={{ mt: 4 }}>Loading Page...</Typography>;
    }

    return (
        <Container maxWidth="lg" sx={{ mt: 8, mb: 4 }}>
            <Typography variant="h3" sx={{ fontWeight: 800, mb: 1 }}>
                Tutor Directory
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 5, fontSize: '1.3rem', fontWeight: 500 }}>
                Manage and view your tutor's profiles.
            </Typography>

            <Grid container spacing={4}>

                <Grid size={{ xs: 12, md: 4 }}>
                    <Paper elevation={0} sx={{ p: 3, borderRadius: 4, border: '1px solid #e0e0e0', bgcolor: '#f8f9fa' }}>
                        <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 700, color: 'text.secondary', textTransform: 'uppercase' }}>
                            Select Tutor from Dropdown
                        </Typography>

                        <TutorDropdown
                            tutors={tutors}
                            selected={selectedTutor}
                            onSelect={setSelectedTutor}/>
                    </Paper>
                </Grid>


                <Grid size={{ xs: 12, md: 8 }}>
                    {selectedTutor && (
                        <TutorInfoCard
                            name={selectedTutor.name}
                            birthday={selectedTutor.birthday}
                            subjects={selectedTutor.subjects}
                            availability={selectedTutor.availability}
                            isAdmin={selectedTutor.isAdmin}/>
                    )}

                </Grid>
            </Grid>
        </Container>
    ); 
};

export default TutorInfoPage;