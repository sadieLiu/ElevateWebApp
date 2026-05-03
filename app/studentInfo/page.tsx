/* This page shows information for all students in the database */
'use client';
import React, { useEffect, useState } from "react";
import { Container, Box, Grid, Typography, Paper } from "@mui/material";
import StudentInfoCard from "../components/StudentInfoCard";
import StudentDropdown from "../components/StudentPicker";
import { useAuth } from "../context/AuthContext";

type Student = {
  studentId: number;
  name: string;
  birthday: string;
  school: string;
  grade: string;
  location: string;
  parentName: string;
  parentEmail: string;
};

const StudentInfoPage: React.FC = () => {
    const [students, setStudents] = useState<Student[]>([]);
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
    const { user, isLoading: isAuthLoading } = useAuth();
    const [dataLoading, setDataLoading] = useState(true);

    useEffect(() => {
        const fetchStudents = async () => {
            const response = await fetch("http://127.0.0.1:5000/api/students");
            const data: Student[] = await response.json();
            setStudents(data);
            if (data.length > 0) setSelectedStudent(data[0]);
            setDataLoading(false);
        }
        fetchStudents();

    }, []);


    if (isAuthLoading || dataLoading) { // this makes sure that the dropdown and info table render at the same time
        return <Typography variant="h5" align="center" sx={{ mt: 4 }}>Loading Page...</Typography>;
    }

    return (
        <Container maxWidth="xl" sx={{ mt: 10, mb: 8 }}>
            <Typography variant="h3" sx={{ fontWeight: 800, mb: 1 }}>
                Student Directory
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 5, fontSize: '1.3rem', fontWeight: 500 }}>
               View student profiles.
            </Typography>

            <Grid container spacing={4}>

                <Grid size={{ xs: 12, md: 4 }}>
                    <Paper elevation={0} sx={{ p: 3, borderRadius: 4, border: '1px solid #e0e0e0', borderColor: 'divider', bgcolor: 'background.paper', position: 'sticky' }}>
                        <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 700, color: 'text.secondary', textTransform: 'uppercase' }}>
                            Select Student from Dropdown
                        </Typography>

                        <StudentDropdown
                            students={students}
                            selected={selectedStudent}
                            onSelect={setSelectedStudent} />
                    </Paper>
                </Grid>


                <Grid size={{ xs: 12, md: 8 }}>
                    <Box key={selectedStudent?.studentId} sx={{
                        animation: 'fadeIn 0.4s ease-out', '@keyframes fadeIn': {
                            from: { opacity: 0, transform: 'translateY(10px)' }, to:
                                { opacity: 1, transform: 'translateY(0)' }
                        }}}>


                        {selectedStudent && (
                            <StudentInfoCard
                                name={selectedStudent.name}
                                birthday={selectedStudent.birthday}
                                school={selectedStudent.school}
                                grade={selectedStudent.grade}
                                location={selectedStudent.location}
                                parentName={selectedStudent.parentName}
                                parentEmail={selectedStudent.parentEmail} />
                        )}
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default StudentInfoPage;





