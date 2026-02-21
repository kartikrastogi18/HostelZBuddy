import React from 'react';
import { 
  Typography, Button, Container, Box, Grid, 
  Card, CardMedia, CardContent, Stack, Divider 
} from '@mui/material';
import { Hotel, School, Groups, LocalDrink } from '@mui/icons-material';
import { motion } from 'framer-motion';

// Fixed Image Array
const HOSTEL_DATA = [
  { title: "Koyna Hostel", url: "https://www.jnu.ac.in/sites/default/files/iha/koyna2.JPG", desc: "A symbol of JNU's inclusive residential culture." },
  { title: "Campus Entrance", url: "https://thumbs.dreamstime.com/b/jawaharlal-nehru-university-jnu-new-delhi-jawaharlal-nehru-jnu-university-public-central-university-located-new-delhi-india-253340399.jpg", desc: "The gateway to India's premier research institution." },
  { title: "Academic Freedom", url: "https://images.hindustantimes.com/rf/image_size_630x354/HT/p2/2019/11/16/Pictures/_41c2b1a6-085f-11ea-9cc4-4efb092b4b2b.jpg", desc: "Vibrant discussions at the famous Ganga Dhaba." },
  { title: "Lush Green Campus", url: "https://pbs.twimg.com/media/FqcynqhXgAMJNAb?format=jpg&name=large", desc: "1000 acres of ridge forest area." }
];

const JNUHome = () => {
  return (
    <Box sx={{ flexGrow: 1, bgcolor: '#ffffff' }}>
      
      {/* 1. FULL SCREEN HOSTEL HERO */}
      <Box 
        sx={{ 
          height: '100vh', 
          width: '100%',
          position: 'relative',
          background: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.7)), url("${HOSTEL_DATA[0].url}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          textAlign: 'center'
        }}
      >
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.8 }}
        >
          <Typography variant="overline" sx={{ fontSize: '1.2rem', letterSpacing: 4, mb: 2, display: 'block' }}>
            Life at the Ridge
          </Typography>
          <Typography variant="h1" sx={{ fontWeight: 900, fontSize: { xs: '3rem', md: '5rem' }, mb: 2 }}>
            JNU HOSTELS
          </Typography>
          <Typography variant="h5" sx={{ maxWidth: '800px', mx: 'auto', px: 2, fontWeight: 300, mb: 4 }}>
            More than just buildings, JNU hostels are the heart of a democratic, 
            intellectual, and vibrant student community.
          </Typography>
          <Button 
            variant="contained" 
            size="large" 
            sx={{ bgcolor: '#d32f2f', p: '12px 35px', borderRadius: '50px', fontWeight: 'bold' }}
          >
            Explore Residence Life
          </Button>
        </motion.div>
        
        <Box sx={{ position: 'absolute', bottom: 30, animate: 'bounce' }}>
            <Typography variant="caption" sx={{ opacity: 0.8 }}>Scroll to discover JNU</Typography>
        </Box>
      </Box>

      {/* 2. THE HOSTEL STORY SECTION */}
      <Container sx={{ py: 12 }}>
        <Grid container spacing={8} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h3" fontWeight="900" sx={{ mb: 3, color: '#1e293b' }}>
              A Home Away From Home
            </Typography>
            <Typography variant="body1" sx={{ color: '#475569', fontSize: '1.1rem', lineHeight: 1.9, mb: 4 }}>
              Jawaharlal Nehru University is essentially a residential university. The hostel life at JNU is legendary, named after major Indian rivers like <strong>Ganga, Yamuna, Jhelum, and Brahmaputra</strong>. 
              <br /><br />
              It is here that the famous JNU "Post-Dinner Public Meetings" take place, where students engage in healthy debates over tea at 2 AM. The hostels foster an environment of equality, where students from all walks of life live and learn together.
            </Typography>
            <Stack direction="row" spacing={4}>
              <Box>
                <Typography variant="h4" fontWeight="800" color="error">18</Typography>
                <Typography variant="caption" fontWeight="bold">Hostels</Typography>
              </Box>
              <Divider orientation="vertical" flexItem />
              <Box>
                <Typography variant="h4" fontWeight="800" color="error">24/7</Typography>
                <Typography variant="caption" fontWeight="bold">Library Access</Typography>
              </Box>
              <Divider orientation="vertical" flexItem />
              <Box>
                <Typography variant="h4" fontWeight="800" color="error">Low</Typography>
                <Typography variant="caption" fontWeight="bold">Fee Structure</Typography>
              </Box>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box 
              component="img" 
              src={HOSTEL_DATA[3].url} 
              sx={{ width: '100%', borderRadius: '30px', boxShadow: '20px 20px 60px #bebebe, -20px -20px 60px #ffffff' }}
            />
          </Grid>
        </Grid>
      </Container>

      {/* 3. CAMPUS SNAPSHOTS (Gallery) */}
      <Box sx={{ bgcolor: '#f8fafc', py: 10 }}>
        <Container>
          <Box sx={{ mb: 6, textAlign: 'center' }}>
             <Typography variant="h4" fontWeight="900" gutterBottom>The Campus Spirit</Typography>
             <Typography variant="body1" color="textSecondary">Capturing the essence of India's most iconic university.</Typography>
          </Box>
          
          <Grid container spacing={4}>
            {HOSTEL_DATA.slice(1).map((img, index) => (
              <Grid item xs={12} sm={4} key={index}>
                <Card sx={{ borderRadius: '20px', transition: '0.3s', '&:hover': { transform: 'translateY(-10px)' } }}>
                  <CardMedia component="img" height="280" image={img.url} alt={img.title} />
                  <CardContent>
                    <Typography variant="h6" fontWeight="800" gutterBottom>{img.title}</Typography>
                    <Typography variant="body2" color="textSecondary">{img.desc}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* 4. ABOUT JNU PHILOSOPHY */}
      <Container sx={{ py: 12 }}>
        <Box sx={{ textAlign: 'center', maxWidth: '900px', mx: 'auto' }}>
            <School sx={{ fontSize: 60, color: '#d32f2f', mb: 2 }} />
            <Typography variant="h3" fontWeight="900" sx={{ mb: 4 }}>Why JNU Matters?</Typography>
            <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#334155', lineHeight: 2 }}>
                Founded in 1969, JNU is not just an institution; it is a movement. 
                It stands for academic excellence coupled with social sensitivity. 
                With a teacher-student ratio that is one of the best in the world, 
                it encourages a questioning spirit and a commitment to society.
            </Typography>
        </Box>
      </Container>

      {/* FOOTER */}
      <Box sx={{ bgcolor: '#0f172a', color: 'white', py: 8 }}>
        <Container>
          <Grid container spacing={4} justifyContent="space-between">
            <Grid item xs={12} md={4}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>Jawaharlal Nehru University</Typography>
              <Typography variant="body2" sx={{ opacity: 0.7 }}>New Mehrauli Road, New Delhi 110067</Typography>
            </Grid>
            <Grid item xs={12} md={4} sx={{ textAlign: { md: 'right' } }}>
              <Typography variant="body2" sx={{ opacity: 0.6 }}>© 2026 JNU Admission Portal. All rights reserved.</Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default JNUHome;