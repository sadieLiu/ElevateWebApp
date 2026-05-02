/* This component works with the tutor picker component on the student info page */
import React from "react";
import { Card, CardContent, Typography, Grid, Box, Divider } from "@mui/material";

type StudentProps = {
    name: string;
    birthday: string;
    school: string;
    grade: string;
    location: string;
    parentName: string;
    parentEmail: string;
};


const StudentInfoCard: React.FC<StudentProps> = ({
    name,
    birthday,
    school,
    grade,
    location,
    parentName,
    parentEmail
}) => {
    return (
        <Card sx={{ borderRadius: 3, boxShadow: 5, overflow: 'hidden' }}>

            <Box sx={{ bgcolor: 'secondary.main', color: 'white', p: 3 }}>
                <Typography variant="h4" fontWeight="bold">
                    {name}
                </Typography>
                <Typography variant="subtitle1">
                    Student Profile
                </Typography>
            </Box>

            <CardContent sx={{ p: 4 }}>
                <Grid container spacing={3}>

                    <Grid size={{ xs: 6 }}>
                        <Typography variant="caption" color="text.secondary" sx={{ fontSize: '1rem', fontWeight: 500 }}>
                            School
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '1.1rem', fontWeight: 500, mt: 0.5 }}>
                            {school}
                        </Typography>
                    </Grid>

                    <Grid size={{ xs: 6 }}>
                        <Typography variant="caption" color="text.secondary" sx={{ fontSize: '1rem', fontWeight: 500 }}>
                            Grade Level
                        </Typography>
                        <Typography variant="body1" sx={{ mt: 0.5 }}>
                            {grade}
                        </Typography>
                    </Grid>

                    <Grid size={{ xs: 12 }}>
                        <Divider />
                    </Grid>


                    <Grid size={{ xs: 6 }}>
                        <Typography variant="caption" color="text.secondary" sx={{ fontSize: '1rem', fontWeight: 500 }}>
                            Birthday
                        </Typography>
                        <Typography variant="body1" sx={{ mt: 0.5 }}>
                            {new Date(birthday).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                timeZone: 'UTC'
                            })}
                        </Typography>
                    </Grid>

                    <Grid size={{ xs: 6 }}>
                        <Typography variant="caption" color="text.secondary" sx={{ fontSize: '1rem', fontWeight: 500 }}>
                            Location
                        </Typography>
                        <Typography variant="body1" sx={{ mt: 0.5 }}>
                            {location}
                        </Typography>
                    </Grid>

                    <Grid size={{ xs: 12 }}>
                        <Divider />
                    </Grid>

                    <Grid size={{ xs: 6 }}>
                        <Typography variant="caption" color="text.secondary" sx={{ fontSize: '1rem', fontWeight: 500 }}>
                            Parent
                        </Typography>
                        <Typography variant="body1" sx={{ mt: 0.5 }}>
                            {parentName}
                        </Typography>
                    </Grid>

                    <Grid size={{ xs: 6 }}>
                        <Typography variant="caption" color="text.secondary" sx={{ fontSize: '1rem', fontWeight: 500 }}>
                            Parent Email
                        </Typography>
                        <Typography variant="body1" sx={{ mt: 0.5 }}>
                            {parentEmail}
                        </Typography>
                    </Grid>

                    <Grid size={{ xs: 12 }}>
                        <Divider />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default StudentInfoCard;