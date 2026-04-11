/* Component to be used for admin dashboard */
import { Typography, Grid, Card, Stack, CardContent, Box } from "@mui/material"
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import BackpackIcon from '@mui/icons-material/Backpack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Link from "next/link";

const adminStats = [
    {
        label: "Total Students",
        value: 100
    },
    {
        label: "Total Tutors",
        value: 25
    },
    {
        label: "Total Sessions",
        value: 50
    }
];

const quickActions = [
    {
        label: "Schedule",
        icon: CalendarMonthIcon,
        info: "Manage tutoring Sessions",
        path: "/admin/schedule"
    },
    {
        label: "Tutors",
        icon: PeopleAltIcon,
        info: "View and manage tutor profiles",
        path: "/tutorInfo"
    },
    {
        label: "Students",
        icon: BackpackIcon,
        info: "View and manage student profiles",
        path: "/studentInfo"
    }
];

export default function AdminView() {
    return (
        <>
            {/* Admin stats section */}
            <Box sx={{ py: 3, px: 2 }}>
                <Typography variant="h5" textAlign="left" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
                    Quick Stats
                </Typography>

                <Grid container spacing={3}>
                    {adminStats.map((stat) => (
                        <Grid size={{ xs: 1, md: 4 }} key={stat.label}>
                            <Card sx={{ height: '100%', borderRadius: 2, boxShadow: 4, transition: '0.3s', '&:hover': { boxShadow: 12 } }}>
                                <CardContent sx={{ pt: 3 }}>
                                    <Typography variant="h4" sx={{ mb: 0.4, fontWeight: 600, color: 'text.primary' }}>
                                        {stat.value}
                                    </Typography>

                                    <Stack direction="row" spacing={2} alignItems="center">

                                        <Box>
                                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                                {stat.label}
                                            </Typography>
                                        </Box>
                                    </Stack>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}

                </Grid>
            </Box>

            {/* Admin quick action section */}
            <Box sx={{ py: 3, px: 2 }}>
                <Typography variant="h5" textAlign="left" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
                    Quick Actions
                </Typography>
                <Grid container spacing={3}>
                    {quickActions.map((action) => (
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