/* Component to be used for tutor dashboard */
import { Typography, Grid, Card, Stack, CardContent, Box } from "@mui/material"
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import BackpackIcon from '@mui/icons-material/Backpack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonIcon from '@mui/icons-material/Person';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import WatchLaterIcon from '@mui/icons-material/WatchLater';



export default function TutorView() {
    const { user } = useAuth();
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getTutorStats = async () => {
            if (!user) return;
            try {
                const response = await fetch(`http://127.0.0.1:5000/api/dashboard-stats/${user?.userId}/${user?.role}`);
                const data = await response.json();
                setStats(data);
            } catch (error) {
                console.error("Error fetching tutor stats:", error);
            } finally {
                setLoading(false);
            }
        };
        getTutorStats();
    }, [user]);

    // all of the tutor stats to be displayed
    const tutorStats = [
        {
            label: "Total Sessions to Date",
            value: stats?.totalSessions || 0,
            icon: MenuBookIcon
        },
        {
            label: "Number of Students Tutored",
            value: stats?.totalStudents || 0,
            icon: PersonIcon
        },
        {
            label: "Total Hours Tutored",
            value: (stats?.totalSessions * 2) || 0, // assume each session is 2 hrs
            icon: WatchLaterIcon
        }
    ];

    const tutorActions = [
        {
            label: "Schedule",
            icon: CalendarMonthIcon,
            info: "View your tutoring schedule",
            path: "/calendar"
        },
        {
            label: "Students",
            icon: BackpackIcon,
            info: "View student profiles",
            path: "/studentInfo"
        },
        {
            label: "Tutors",
            icon: PersonIcon,
            info: "View tutor profiles",
            path: "/tutorInfo"
        }
    ];

    return (
        <>
            {/* Tutor stats section */}
            <Box sx={{ py: 3, px: 2 }}>
                <Typography variant="h5" textAlign="left" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
                    Quick Stats
                </Typography>

                <Grid container spacing={3}>
                    {tutorStats.map((stat) => (
                        <Grid size={{ xs: 12, md: 4 }} key={stat.label}>
                            <Card sx={{ height: '100%', borderRadius: 2, boxShadow: 4, transition: '0.3s', '&:hover': { boxShadow: 12 } }}>
                                <CardContent sx={{ pt: 3 }}>
                                    <Box sx={{ p: 1.75, borderRadius: 3, backgroundColor: 'secondary.dark', display: 'inline-flex', mb: 2 }}>
                                        <stat.icon fontSize="medium" sx={{ color: 'white' }} />
                                    </Box>
                                    <Typography variant="h6" sx={{ mb: 0.4, fontWeight: 600, color: 'text.primary' }}>
                                        {loading ? "Loading..." : stat.value}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 'bold', textTransform: 'uppercase' }}>
                                        {stat.label}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
            
            {/* Upcoming session */}
            <Box sx={{ py: 3, px: 2 }}>
                <Typography variant="h5" textAlign="left" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
                    Upcoming Sessions
                </Typography>
                <Grid container spacing={3}>
                    <Grid size={{ xs: 12, md: 12 }}>
                        <Card sx={{ height: '100%', borderRadius: 2, boxShadow: 4 }}>
                            <CardContent sx={{ pt: 3 }}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                    {loading ? (
                                        <Typography variant="body2">Loading sessions...</Typography>
                                    ) : stats?.upcomingSessions?.length > 0 ? (
                                        stats.upcomingSessions.map((session: any) => (
                                            <Box
                                                key={session.sessionId}
                                                sx={{
                                                    pb: 2,
                                                    borderBottom: '1px solid',
                                                    borderColor: 'divider',
                                                    '&:last-child': { borderBottom: 'none', pb: 0 }
                                                }}
                                            >
                                               
                                                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'text.primary' }}>
                                                    {session.subjects} session
                                                </Typography>

                                                
                                                <Typography variant="body2" sx={{ color: 'text.secondary', my: 0.5 }}>
                                                    Student: <strong>{session.studentName || 'Unassigned'}</strong> |  Location: <strong>{session.location || 'TBD'}</strong>
                                                </Typography>

                                               
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                                                    <WatchLaterIcon fontSize="small" sx={{ color: 'gray', fontSize: 16 }} />
                                                    <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.secondary' }}>
                                                        {new Date(session.startDateTime).toLocaleString("en-US", {
                                                            weekday: 'long',
                                                            month: 'short',
                                                            day: 'numeric',
                                                            hour: 'numeric',
                                                            minute: 'numeric'
                                                        })}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        ))
                                    ) : (
                                        <Typography variant="body2" color="text.secondary">
                                            No upcoming sessions scheduled.
                                        </Typography>
                                    )}
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>


            {/* Quick action for tutor section */}
            <Box sx={{ py: 3, px: 2, pb: 10 }}>
                <Typography variant="h5" textAlign="left" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
                    Quick Actions
                </Typography>
                <Grid container spacing={3}>
                    {tutorActions.map((action) => (
                        <Grid size={{ xs: 12, md: 4 }} key={action.label}>
                            <Link href={action.path} style={{ textDecoration: 'none' }}>
                                <Card sx={{
                                    height: '100%', borderRadius: 3, boxShadow: 4, transition: '0.3s', cursor: 'pointer',
                                    '&:hover': { boxShadow: 12, transform: 'translateY(-4px)' }
                                }}>

                                    <CardContent sx={{ pt: 3, color: 'text.primary', display: 'flex', flexDirection: 'column' }}>
                                        <Stack direction="row" spacing={2} alignItems="center" sx={{ flexGrow: 1 }}>
                                            <action.icon fontSize="large" sx={{ color: 'secondary.dark' }} />
                                            <Typography variant="h6" sx={{ mt: 2, fontWeight: 600, color: 'text.primary' }}>
                                                {action.label}
                                            </Typography>
                                        </Stack>
                                        <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: 2, flexGrow: 1 }}>
                                            <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
                                                {action.info}
                                            </Typography>

                                            <Box sx={{ mt: 'auto', display: 'flex', justifyContent: 'flex-end' }}>
                                                <ArrowForwardIcon sx={{ color: 'secondary.dark' }} />
                                            </Box>
                                        </Stack>
                                    </CardContent>
                                </Card>
                            </Link>
                        </Grid>

                    ))}
                </Grid>
            </Box>

        </>

    );

}