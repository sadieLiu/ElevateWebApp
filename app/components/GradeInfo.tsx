/* This component is for the second section on home page that displays grade levels and subjects offered */
'use client';
import { Box, Typography, Link } from '@mui/material';


const GradeInfo = () => {
  return (
    <Box sx={{ py: 6, px: 2 }}>
      <Typography variant="h4" textAlign="center" gutterBottom sx={{ fontWeight: 'bold', mb: 4, color: 'black' }}>
        Grade Levels & Subjects Offered
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, justifyContent: 'center' }}>

        {/* card for elementary students */}
        <Box sx={{ flex: 1, borderRadius: 1, boxShadow: 2, p: 3, backgroundColor: 'background.paper' }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ color: 'secondary.main' }}>
            Elementary
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            We offer personalized tutoring in foundational subjects such as:
          </Typography>
          <Typography variant="body2" color="text.secondary">
            - Reading<br/>
            - Writing<br/>
            - Basic Mathematics
          </Typography>
        </Box>

        {/* card for middle school students */}
        <Box sx={{ flex: 1, borderRadius: 1, boxShadow: 2, p: 3, backgroundColor: 'background.paper' }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ color: 'secondary.main' }}>
            Middle School
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Our middle school tutoring covers core subjects including:
          </Typography>
          <Typography variant="body2" color="text.secondary">
            - English<br/>
            - Mathematics (Pre-Algebra, Algebra)<br/>
            - Science
          </Typography>
        </Box>

        {/* card for hs students */}
        <Box sx={{ flex: 1, borderRadius: 1, boxShadow: 2, p: 3, backgroundColor: 'background.paper' }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ color: 'secondary.main' }}>
            High School
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            We provide tutoring for high school students in a wide range of subjects such as:
          </Typography>
          <Typography variant="body2" color="text.secondary">
            - English Literature<br/>
            - Mathematics (Algebra, Geometry, Calculus)<br/>
            - Science (Biology, Chemistry, Physics)<br/>
            - History
          </Typography>
        </Box>

      </Box>
    </Box>
  );
};

export default GradeInfo;