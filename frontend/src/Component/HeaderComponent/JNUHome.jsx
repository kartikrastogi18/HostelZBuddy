import React from 'react';
import {
  Typography, Button, Container, Box, Grid,
  Card, CardMedia, CardContent, Stack, Divider,
  useMediaQuery, useTheme,
} from '@mui/material';
import { Hotel, School, Groups, LocalDrink, KeyboardArrowDown } from '@mui/icons-material';
import { motion } from 'framer-motion';

const HOSTEL_DATA = [
  { title: "Koyna Hostel", url: "https://www.jnu.ac.in/sites/default/files/iha/koyna2.JPG", desc: "A symbol of JNU's inclusive residential culture." },
  { title: "Campus Entrance", url: "https://thumbs.dreamstime.com/b/jawaharlal-nehru-university-jnu-new-delhi-jawaharlal-nehru-jnu-university-public-central-university-located-new-delhi-india-253340399.jpg", desc: "The gateway to India's premier research institution." },
  { title: "Academic Freedom", url: "https://images.hindustantimes.com/rf/image_size_630x354/HT/p2/2019/11/16/Pictures/_41c2b1a6-085f-11ea-9cc4-4efb092b4b2b.jpg", desc: "Vibrant discussions at the famous Ganga Dhaba." },
  { title: "Lush Green Campus", url: "https://pbs.twimg.com/media/FqcynqhXgAMJNAb?format=jpg&name=large", desc: "1000 acres of ridge forest area." }
];

const JNUHome = () => {
  const theme = useTheme();
  const isMobile  = useMediaQuery(theme.breakpoints.down('sm'));   // < 600px
  const isTablet  = useMediaQuery(theme.breakpoints.down('md'));   // < 900px

  return (
    <Box sx={{ flexGrow: 1, bgcolor: '#ffffff', overflowX: 'hidden' }}>

      {/* ── 1. HERO ── */}
      <Box
        sx={{
          height: { xs: '100svh', sm: '100vh' },
          width: '100%',
          position: 'relative',
          background: `linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.72)), url("${HOSTEL_DATA[0].url}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          textAlign: 'center',
          px: { xs: 2, sm: 4 },
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          style={{ width: '100%', maxWidth: 860 }}
        >
          <Typography
            variant="overline"
            sx={{
              fontSize: { xs: '0.7rem', sm: '0.9rem', md: '1.2rem' },
              letterSpacing: { xs: 3, md: 4 },
              mb: { xs: 1, md: 2 },
              display: 'block',
              opacity: 0.85,
            }}
          >
            Life at the Ridge
          </Typography>

          <Typography
            variant="h1"
            sx={{
              fontWeight: 900,
              fontSize: { xs: '2.2rem', sm: '3.2rem', md: '4.5rem', lg: '5rem' },
              mb: { xs: 1.5, md: 2 },
              lineHeight: 1.1,
            }}
          >
            JNU HOSTELS
          </Typography>

          <Typography
            variant="h5"
            sx={{
              maxWidth: 780,
              mx: 'auto',
              px: { xs: 0, sm: 2 },
              fontWeight: 300,
              fontSize: { xs: '0.95rem', sm: '1.1rem', md: '1.25rem' },
              mb: { xs: 3, md: 4 },
              lineHeight: 1.6,
              opacity: 0.9,
            }}
          >
            More than just buildings, JNU hostels are the heart of a democratic,
            intellectual, and vibrant student community.
          </Typography>

          <Button
            variant="contained"
            size={isMobile ? 'medium' : 'large'}
            sx={{
              bgcolor: '#d32f2f',
              px: { xs: '20px', sm: '28px', md: '35px' },
              py: { xs: '10px', sm: '12px' },
              borderRadius: '50px',
              fontWeight: 'bold',
              fontSize: { xs: '0.85rem', sm: '0.95rem', md: '1rem' },
              '&:hover': { bgcolor: '#b71c1c', transform: 'translateY(-2px)' },
              transition: 'all 0.2s ease',
            }}
          >
            Explore Residence Life
          </Button>
        </motion.div>

        {/* Scroll indicator */}
        <Box
          sx={{
            position: 'absolute',
            bottom: { xs: 16, sm: 30 },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 0.5,
            opacity: 0.7,
          }}
        >
          <Typography variant="caption" sx={{ fontSize: { xs: '0.65rem', sm: '0.75rem' } }}>
            Scroll to discover JNU
          </Typography>
          <KeyboardArrowDown
            sx={{
              animation: 'bounce 1.6s infinite',
              '@keyframes bounce': {
                '0%,100%': { transform: 'translateY(0)' },
                '50%':     { transform: 'translateY(6px)' },
              },
            }}
          />
        </Box>
      </Box>

      {/* ── 2. HOME AWAY FROM HOME ── */}
      <Container sx={{ py: { xs: 7, sm: 9, md: 12 } }}>
        <Grid container spacing={{ xs: 4, md: 8 }} alignItems="center">

          {/* Text block */}
          <Grid item xs={12} md={6}>
            <Typography
              variant="h3"
              fontWeight="900"
              sx={{
                mb: 2,
                color: '#1e293b',
                fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.6rem' },
                lineHeight: 1.2,
              }}
            >
              A Home Away From Home
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: '#475569',
                fontSize: { xs: '0.95rem', sm: '1rem', md: '1.1rem' },
                lineHeight: 1.9,
                mb: { xs: 3, md: 4 },
              }}
            >
              Jawaharlal Nehru University is essentially a residential university. The hostel
              life at JNU is legendary, named after major Indian rivers like{' '}
              <strong>Ganga, Yamuna, Jhelum, and Brahmaputra</strong>.
              <br /><br />
              It is here that the famous JNU "Post-Dinner Public Meetings" take place, where
              students engage in healthy debates over tea at 2 AM. The hostels foster an
              environment of equality, where students from all walks of life live and learn
              together.
            </Typography>

            {/* Stats row */}
            <Stack
              direction="row"
              spacing={{ xs: 2, sm: 4 }}
              flexWrap="wrap"
              useFlexGap
            >
              {[
                { value: '18', label: 'Hostels' },
                { value: '24/7', label: 'Library Access' },
                { value: 'Low', label: 'Fee Structure' },
              ].map((stat, i) => (
                <React.Fragment key={stat.label}>
                  {i > 0 && (
                    <Divider
                      orientation="vertical"
                      flexItem
                      sx={{ display: { xs: 'none', sm: 'block' } }}
                    />
                  )}
                  <Box sx={{ minWidth: { xs: 60, sm: 'auto' } }}>
                    <Typography
                      variant="h4"
                      fontWeight="800"
                      color="error"
                      sx={{ fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2rem' } }}
                    >
                      {stat.value}
                    </Typography>
                    <Typography
                      variant="caption"
                      fontWeight="bold"
                      sx={{ fontSize: { xs: '0.65rem', sm: '0.75rem' } }}
                    >
                      {stat.label}
                    </Typography>
                  </Box>
                </React.Fragment>
              ))}
            </Stack>
          </Grid>

          {/* Image */}
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src={HOSTEL_DATA[3].url}
              alt="JNU Campus"
              sx={{
                width: '100%',
                borderRadius: { xs: '16px', sm: '24px', md: '30px' },
                boxShadow: {
                  xs: '0 8px 24px rgba(0,0,0,0.15)',
                  md: '20px 20px 60px #bebebe, -20px -20px 60px #ffffff',
                },
                display: 'block',
              }}
            />
          </Grid>
        </Grid>
      </Container>

      {/* ── 3. CAMPUS SNAPSHOTS GALLERY ── */}
      <Box sx={{ bgcolor: '#f8fafc', py: { xs: 7, sm: 9, md: 10 } }}>
        <Container>
          <Box sx={{ mb: { xs: 4, md: 6 }, textAlign: 'center' }}>
            <Typography
              variant="h4"
              fontWeight="900"
              gutterBottom
              sx={{ fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2.1rem' } }}
            >
              The Campus Spirit
            </Typography>
            <Typography
              variant="body1"
              color="textSecondary"
              sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}
            >
              Capturing the essence of India's most iconic university.
            </Typography>
          </Box>

          <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
            {HOSTEL_DATA.slice(1).map((img, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{
                    borderRadius: { xs: '12px', sm: '16px', md: '20px' },
                    transition: '0.3s',
                    height: '100%',
                    '&:hover': {
                      transform: { xs: 'none', sm: 'translateY(-8px)' },
                      boxShadow: '0 12px 32px rgba(0,0,0,0.12)',
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{ height: { xs: 200, sm: 240, md: 280 }, objectFit: 'cover' }}
                    image={img.url}
                    alt={img.title}
                  />
                  <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
                    <Typography
                      variant="h6"
                      fontWeight="800"
                      gutterBottom
                      sx={{ fontSize: { xs: '0.95rem', sm: '1rem', md: '1.1rem' } }}
                    >
                      {img.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{ fontSize: { xs: '0.78rem', sm: '0.875rem' } }}
                    >
                      {img.desc}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ── 4. WHY JNU MATTERS ── */}
      <Container sx={{ py: { xs: 7, sm: 9, md: 12 } }}>
        <Box sx={{ textAlign: 'center', maxWidth: 900, mx: 'auto', px: { xs: 1, sm: 2 } }}>
          <School
            sx={{
              fontSize: { xs: 44, sm: 52, md: 60 },
              color: '#d32f2f',
              mb: { xs: 1.5, md: 2 },
            }}
          />
          <Typography
            variant="h3"
            fontWeight="900"
            sx={{
              mb: { xs: 2.5, md: 4 },
              fontSize: { xs: '1.6rem', sm: '2rem', md: '2.6rem' },
            }}
          >
            Why JNU Matters?
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: '0.95rem', sm: '1.05rem', md: '1.2rem' },
              color: '#334155',
              lineHeight: { xs: 1.8, md: 2 },
            }}
          >
            Founded in 1969, JNU is not just an institution; it is a movement.
            It stands for academic excellence coupled with social sensitivity.
            With a teacher-student ratio that is one of the best in the world,
            it encourages a questioning spirit and a commitment to society.
          </Typography>
        </Box>
      </Container>

      {/* ── FOOTER ── */}
      <Box sx={{ bgcolor: '#0f172a', color: 'white', py: { xs: 5, sm: 6, md: 8 } }}>
        <Container>
          <Grid
            container
            spacing={{ xs: 3, md: 4 }}
            justifyContent="space-between"
            alignItems={{ xs: 'flex-start', md: 'center' }}
          >
            <Grid item xs={12} md={4}>
              <Typography
                variant="h6"
                fontWeight="bold"
                gutterBottom
                sx={{ fontSize: { xs: '0.95rem', sm: '1rem', md: '1.1rem' } }}
              >
                Jawaharlal Nehru University
              </Typography>
              <Typography
                variant="body2"
                sx={{ opacity: 0.7, fontSize: { xs: '0.78rem', sm: '0.875rem' } }}
              >
                New Mehrauli Road, New Delhi 110067
              </Typography>
            </Grid>

            <Grid
              item
              xs={12}
              md={4}
              sx={{ textAlign: { xs: 'left', md: 'right' } }}
            >
              <Typography
                variant="body2"
                sx={{
                  opacity: 0.6,
                  fontSize: { xs: '0.72rem', sm: '0.8rem' },
                }}
              >
                © 2026 JNU Admission Portal. All rights reserved.
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default JNUHome;