import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Container, Typography, Box, Grid, Card, CardContent, CardMedia, Button, Chip, Avatar } from "@mui/material";

// Create a custom theme matching the dark/teal color scheme
const theme = createTheme({
  palette: {
    primary: {
      main: 'rgb(24,239,199)', // Bright teal for buttons
      light: 'rgb(77,247,216)',
      dark: 'rgb(9,191,157)',
    },
    secondary: {
      main: 'rgb(32,33,39)', // Dark background
      light: 'rgb(52,53,59)',
      dark: 'rgb(22,23,29)',
    },
    background: {
      default: 'rgb(32,33,39)', // Dark background
      paper: 'rgb(42,43,49)', // Slightly lighter for cards
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgb(180,180,190)',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Arial", sans-serif',
    h2: {
      fontWeight: 700,
      fontSize: '2.5rem',
      color: '#ffffff',
      marginBottom: '2rem',
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.2rem',
      marginBottom: '0.5rem',
      color: '#ffffff',
    },
    body1: {
      fontSize: '0.95rem',
      color: 'rgb(180,180,190)',
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
      borderRadius: 8,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 6px 20px rgba(0, 0, 0, 0.2)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          background: 'rgb(42,43,49)',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: '0 12px 30px rgba(0, 0, 0, 0.3)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          padding: '10px 24px',
          borderRadius: 8,
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 6px 12px rgba(24, 239, 199, 0.3)',
          },
        },
      },
    },
  },
});

const FitnessCommunityHub = () => {
  const communityFeatures = [
    { img: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=100&h=100&fit=crop&auto=format", title: "Live Workouts", desc: "Join interactive sessions with fitness experts" },
    { img: "https://images.unsplash.com/photo-1577221084712-45b0445d2b00?w=100&h=100&fit=crop&auto=format", title: "Fitness Forums", desc: "Share routines and get advice" },
    { img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop&auto=format", title: "Local Meetups", desc: "Connect with fitness enthusiasts nearby" },
    { img: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=100&h=100&fit=crop&auto=format", title: "Fitness Camps", desc: "Intensive transformation programs" },
  ];

  const upcomingEvents = [
    { 
      img: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=400&h=250&fit=crop&auto=format", 
      title: "HIIT Masterclass", 
      desc: "Learn advanced high-intensity interval training techniques from certified trainers to maximize your calorie burn and muscle conditioning.", 
      category: "Cardio", 
      deadline: "April 15, 2025" 
    },
    { 
      img: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=250&fit=crop&auto=format", 
      title: "Nutrition Workshop", 
      desc: "Discover how to fuel your workouts and recovery with optimal nutrition. Learn meal prepping, macros calculation, and supplement guidance.", 
      category: "Wellness", 
      deadline: "April 20, 2025" 
    },
    { 
      img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=250&fit=crop&auto=format", 
      title: "Strength Training Summit", 
      desc: "Connect with powerlifting experts and strength coaches to improve your form, prevent injuries, and break through plateaus in your strength journey.", 
      category: "Strength", 
      deadline: "April 25, 2025" 
    }
  ];

  const fitnessExperts = [
    { 
      img: "https://images.unsplash.com/photo-1594381898411-846e7d193883?w=200&h=200&fit=crop&auto=format", 
      name: "Alex Turner", 
      desc: "CrossFit champion specializing in functional fitness and high-intensity training methodologies." 
    },
    { 
      img: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=200&h=200&fit=crop&auto=format", 
      name: "Sarah Chen", 
      desc: "Certified nutritionist focusing on performance diets for athletes and fitness enthusiasts." 
    },
    { 
      img: "https://images.unsplash.com/photo-1597223557154-721c1cecc4b0?w=200&h=200&fit=crop&auto=format", 
      name: "Marcus Johnson", 
      desc: "Bodybuilding coach with expertise in muscle hypertrophy and competition preparation." 
    }
  ];

  const transformationStories = [
    {
      title: "From Couch to Marathon",
      img: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=400&h=250&fit=crop&auto=format",
      journey: "Weight Loss & Endurance",
      achievement: "Lost 30kg and completed first marathon",
      story: "Transformed from sedentary lifestyle to competitive runner in 12 months."
    },
    {
      title: "Strength Comeback Story",
      img: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&h=250&fit=crop&auto=format",
      journey: "Injury Recovery",
      achievement: "Recovered from spinal injury to powerlifting",
      story: "Rehabilitated through targeted strength training and proper form techniques."
    },
    {
      title: "Plant-Powered Athlete",
      img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=250&fit=crop&auto=format",
      journey: "Vegan Muscle Building",
      achievement: "Gained 15kg of lean muscle on plant-based diet",
      story: "Proved that exceptional muscle growth is possible with plant-based nutrition."
    }
  ];

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4 }}>
        <Container maxWidth="lg">
          {/* Hero Section */}
          <Box component="section" sx={{ mb: 8, textAlign: 'center', mt: 4 }}>
            <Typography variant="h2" sx={{ 
              fontSize: '3.2rem', 
              fontWeight: 800, 
              background: 'linear-gradient(90deg, #ffffff, rgb(24,239,199))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2
            }}>
              PLANFIT COMMUNITY
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '1.2rem', mb: 4, maxWidth: '800px', mx: 'auto' }}>
              Connect with fitness enthusiasts, share your transformation journey, and take your fitness goals to the next level
            </Typography>
            <Button 
              variant="contained" 
              color="primary"
              size="large"
              sx={{ 
                py: 1.5, 
                px: 4, 
                fontSize: '1.1rem', 
                fontWeight: 600,
                background: 'linear-gradient(45deg, rgb(9,191,157), rgb(24,239,199))',
                '&:hover': {
                  background: 'linear-gradient(45deg, rgb(9,191,157), rgb(77,247,216))',
                }
              }}
            >
              Join The Community
            </Button>
          </Box>

          {/* Community Features Section */}
          <Box component="section" sx={{ mb: 8 }}>
            <Typography variant="h2" align="center" sx={{ mb: 4 }}>Community Features</Typography>
            <Grid container spacing={4} justifyContent="center">
              {communityFeatures.map((item, index) => (
                <Grid item key={index} xs={12} sm={6} md={3}>
                  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3}}>
                    <Box 
                      sx={{ 
                        bgcolor: 'primary.main', 
                        width: 80, 
                        height: 80, 
                        borderRadius: '50%', 
                        display: 'flex', 
                        justifyContent: 'center', 
                        alignItems: 'center',
                        mb: 2,
                        boxShadow: '0 4px 12px rgba(24, 239, 199, 0.5)',
                      }}
                    >
                      <CardMedia
                        component="img"
                        image={item.img}
                        alt={item.title}
                        sx={{ width: 40, height: 40, filter: 'brightness(0) invert(1)' }}
                      />
                    </Box>
                    <CardContent sx={{ textAlign: 'center', p: 0, flexGrow: 1 }}>
                      <Typography variant="h3" component="h3" sx={{ color: 'primary.main', mb: 1 }}>
                        {item.title}
                      </Typography>
                      <Typography variant="body1">{item.desc}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Upcoming Events Section */}
          <Box component="section" sx={{ mb: 8, bgcolor: 'secondary.light', py: 6, px: 3, borderRadius: 4 }}>
            <Typography variant="h2" align="center" sx={{ mb: 4 }}>Upcoming Fitness Events</Typography>
            <Grid container spacing={4} justifyContent="center">
              {upcomingEvents.map((event, index) => (
                <Grid item key={index} xs={12} sm={6} md={4}>
                  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <CardMedia
                      component="img"
                      image={event.img}
                      alt={event.title}
                      sx={{ height: 180, objectFit: 'cover' }}
                    />
                    <CardContent sx={{ p: 3, flexGrow: 1 }}>
                      <Typography variant="h3" component="h3" sx={{ color: 'primary.main', textAlign: 'center', marginBottom: 2 }}>
                        {event.title}
                      </Typography>
                      <Typography variant="body1" sx={{ mb: 2 }}>{event.desc}</Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                        <Chip 
                          label={event.category} 
                          size="small" 
                          sx={{ 
                            bgcolor: 'primary.main', 
                            color: 'secondary.dark',
                            fontWeight: 'bold'
                          }} 
                        />
                        <Chip 
                          label={`Deadline: ${event.deadline}`} 
                          size="small" 
                          sx={{ 
                            bgcolor: 'secondary.light', 
                            color: 'primary.light',
                            border: '1px solid',
                            borderColor: 'primary.light'
                          }} 
                        />
                      </Box>
                      <Button 
                        variant="contained" 
                        fullWidth 
                        color="primary"
                        sx={{ mt: 'auto' }}
                      >
                        Register Now
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Transformation Stories Section */}
          <Box component="section" sx={{ mb: 8 }}>
            <Typography variant="h2" align="center" sx={{ mb: 4 }}>Transformation Stories</Typography>
            <Grid container spacing={4} justifyContent="center">
              {transformationStories.map((story, index) => (
                <Grid item key={index} xs={12} md={4}>
                  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                    <CardMedia
                      component="img"
                      height="200"
                      image={story.img}
                      alt={story.title}
                      sx={{ objectFit: 'cover' }}
                    />
                    <Box 
                      sx={{ 
                        bgcolor: 'primary.main', 
                        p: 1.5,
                        textAlign: 'center'
                      }}
                    >
                      <Typography variant="h3" component="h3" sx={{ color: 'secondary.dark', m: 0, fontWeight: 700 }}>
                        {story.title}
                      </Typography>
                    </Box>
                    <CardContent sx={{ p: 3, flexGrow: 1 }}>
                      <Box sx={{ mb: 1 }}>
                        <Typography variant="body1" component="p" sx={{ fontWeight: 'bold', display: 'inline', color: 'primary.main' }}>
                          Journey:
                        </Typography>
                        <Typography variant="body1" component="p" sx={{ display: 'inline', ml: 1 }}>
                          {story.journey}
                        </Typography>
                      </Box>
                      <Box sx={{ mb: 1 }}>
                        <Typography variant="body1" component="p" sx={{ fontWeight: 'bold', display: 'inline', color: 'primary.main' }}>
                          Achievement:
                        </Typography>
                        <Typography variant="body1" component="p" sx={{ display: 'inline', ml: 1 }}>
                          {story.achievement}
                        </Typography>
                      </Box>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body1" component="p" sx={{ fontWeight: 'bold', display: 'inline', color: 'primary.main' }}>
                          Story:
                        </Typography>
                        <Typography variant="body1" component="p" sx={{ display: 'inline', ml: 1 }}>
                          {story.story}
                        </Typography>
                      </Box>
                      <Button 
                        variant="outlined" 
                        fullWidth
                        sx={{ 
                          mt: 2, 
                          borderColor: 'primary.main',
                          color: 'primary.main',
                          '&:hover': {
                            borderColor: 'primary.light',
                            backgroundColor: 'rgba(24, 239, 199, 0.1)'
                          }
                        }}
                      >
                        Read Full Story
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Fitness Experts Section */}
          <Box component="section" sx={{ mb: 8, bgcolor: 'secondary.light', py: 6, px: 3, borderRadius: 4 }}>
            <Typography variant="h2" align="center" sx={{ mb: 4 }}>Connect with Fitness Experts</Typography>
            <Grid container spacing={4} justifyContent="center">
              {fitnessExperts.map((expert, index) => (
                <Grid item key={index} xs={12} sm={6} md={4}>
                  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ p: 3, display: 'flex', justifyContent: 'center' }}>
                      <Avatar 
                        src={expert.img} 
                        alt={expert.name} 
                        sx={{ 
                          width: 120, 
                          height: 120, 
                          border: '4px solid', 
                          borderColor: 'primary.main',
                          boxShadow: '0 4px 15px rgba(24, 239, 199, 0.3)'
                        }} 
                      />
                    </Box>
                    <CardContent sx={{ textAlign: 'center', p: 3, flexGrow: 1 }}>
                      <Typography variant="h3" component="h3" sx={{ color: 'primary.main', mb: 1 }}>
                        {expert.name}
                      </Typography>
                      <Typography variant="body1" sx={{ mb: 3 }}>{expert.desc}</Typography>
                      <Button 
                        variant="contained" 
                        color="primary"
                        fullWidth
                      >
                        Book a Session
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Call to Action */}
          <Box component="section" sx={{ 
            textAlign: 'center', 
            py: 6, 
            px: 3, 
            borderRadius: 4,
            background: 'linear-gradient(135deg, rgba(24,239,199,0.2) 0%, rgba(32,33,39,0.95) 100%)',
            border: '1px solid',
            borderColor: 'primary.main',
            mb: 4
          }}>
            <Typography variant="h2" sx={{ mb: 2 }}>Ready to Transform Your Fitness Journey?</Typography>
            <Typography variant="body1" sx={{ mb: 4, fontSize: '1.1rem', maxWidth: '800px', mx: 'auto' }}>
              Join thousands of fitness enthusiasts who are crushing their goals, sharing their progress, and building a supportive community.
            </Typography>
            <Button 
              variant="contained" 
              color="primary"
              size="large"
              sx={{ 
                py: 1.5, 
                px: 5, 
                fontSize: '1.1rem', 
                fontWeight: 600,
                background: 'linear-gradient(45deg, rgb(9,191,157), rgb(24,239,199))',
                '&:hover': {
                  background: 'linear-gradient(45deg, rgb(9,191,157), rgb(77,247,216))',
                }
              }}
            >
              Join FitConnect Today
            </Button>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default FitnessCommunityHub;