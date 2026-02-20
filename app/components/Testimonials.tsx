/*This is the testimonial component to be used on the home page*/

import { Grid, Card, CardContent, Typography, Avatar, Stack, Box } from '@mui/material';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';

const testimonials = [
    { 
      id: 1, 
      name: "Maria G.", 
      role: "Parent", 
      text: "The tutors here at ElevateEdu helped my daughter achieve her first A!",
      avatar: "/images/parent1.jpg" 
    },
    { 
      id: 2, 
      name: "Laila K.", 
      role: "Student", 
      text: "The tutors here actually make learning fun. I finally understand Calculus!",
      avatar: "/images/student1.jpg" 
    },
    { 
        id: 3, 
        name: "Ryan S.", 
        role: "Student", 
        text: "I cannot recommend ElevateEdu enough. They have helped me succeed in all subjects.",
        avatar: "/images/student2.jpg" 
      }
  ];
  

export default function TestimonialSection() {
  return (
    
    <Box sx={{ py: 8, px: 2}}>
      <Typography variant="h4" textAlign="center" gutterBottom sx={{ fontWeight: 'bold', mb: 6 }}>
        Client Testimonials
      </Typography>
    
      <Grid container spacing={4}>
        {testimonials.map((item) => (
          <Grid size={{ xs: 12, md: 4 }} key={item.id}>
            <Card sx={{ height: '100%', borderRadius: 6, boxShadow: 4, transition: '0.3s', '&:hover': { boxShadow: 12 } }}>
              <CardContent sx={{ pt: 4 }}>
                {/* The Quote Icon */}
                <FormatQuoteIcon sx={{ fontSize: 40, color: '#276CF5', mb: 1 }} />
                
                <Typography variant="body1" sx={{ fontStyle: 'italic', mb: 3, minHeight: '80px' }}>
                  "{item.text}"
                </Typography>

                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar src={item.avatar} sx={{ width: 56, height: 56 }} />
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                      {item.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {item.role}
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}