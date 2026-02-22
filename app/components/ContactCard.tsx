/* This is the contact card component for the contact page */ 

'use client';
import { Grid, Card, CardContent, Typography, Box } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import LocationOnIcon from '@mui/icons-material/LocationOn'; 
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import {Link as MuiLink} from '@mui/material'; // try to make work?

const contactUs = [
    {
        id: 1,
        name: "Email Us",
        text: "info@elevate-edu.com",
        icon: EmailIcon,
        hasLink: true

    },
    {
        id: 2,
        name: "Call Us",
        text: "(111)-222-3344",
        icon: LocalPhoneIcon
    },
    {
        id: 3,
        name: "Visit Us",
        text: "123 East School Blvd",
        icon: LocationOnIcon
    },
    {
        id: 4,
        name: "Our Hours",
        text: "Mon-Fri 8am-6pm",
        icon: AccessTimeIcon
    }
];

export default function ContactSection() {
    return (
        <Box sx={{ py: 7, px: 2 }}>
            <Grid container spacing={4} justifyContent="center">
                {contactUs.map((item) => {
                    const Icon = item.icon; 
                    return (
                        <Grid size={{ xs: 12, sm: 6, md: 3 }} key={item.id}>
                            <Card sx={{
                                height: '100%', 
                                borderRadius: 6, 
                                boxShadow: 2, 
                                transition: '0.3s', 
                                textAlign: 'center',
                                '&:hover': { boxShadow: 12, transform: 'translateY(-5px)' } 
                            }}>
                                <CardContent sx={{ pt: 4 }}>
                                    <Icon sx={{ fontSize: 42, color: 'secondary.dark', mb: 1 }} />
                                    
                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                        {item.name}
                                    </Typography>
                                    
                                    <Typography variant="body1" sx={{ fontStyle: 'italic', color: 'text.secondary' }}>
                                    {item.text}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>
        </Box>
    );
}