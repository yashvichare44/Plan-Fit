import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  TextField, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Grid, 
  Card, 
  CardContent, 
  IconButton,
  Paper,
  Avatar,
  Chip,
  ThemeProvider,
  createTheme,
  alpha
} from '@mui/material';
import { 
  Close, 
  Restaurant, 
  LocalDining,
  BreakfastDining,
  LunchDining,
  DinnerDining,
  Fastfood,
  FlashOn,
  CalendarMonth,
  Notes,
  LocalGroceryStore
} from '@mui/icons-material';

// Theme configuration (same as before)
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: 'rgb(24, 239, 199)',
      light: 'rgb(93, 243, 217)',
      dark: 'rgb(18, 179, 149)',
      contrastText: 'rgb(32, 33, 39)',
    },
    secondary: {
      main: '#d6ff80',
      light: '#e0ff99',
      dark: '#b2d966',
    },
    background: {
      default: 'rgb(32, 33, 39)',
      paper: 'rgb(38, 40, 48)',
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255, 255, 255, 0.7)',
    },
    divider: 'rgba(255, 255, 255, 0.12)',
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Arial", sans-serif',
    h2: {
      fontWeight: 700,
      fontSize: '2.5rem',
      letterSpacing: '-0.5px',
      marginBottom: '2rem',
      background: 'linear-gradient(90deg, rgb(24, 239, 199) 0%, rgb(93, 243, 217) 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.2rem',
      marginBottom: '0.5rem',
      letterSpacing: '-0.3px',
    },
    body1: {
      fontSize: '0.95rem',
      lineHeight: 1.6,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
      letterSpacing: '0.5px',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
          backdropFilter: 'blur(10px)',
          background: 'linear-gradient(145deg, rgba(38, 40, 48, 0.9) 0%, rgba(32, 33, 39, 0.95) 100%)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 15px 35px rgba(0, 0, 0, 0.2)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          padding: '10px 24px',
          borderRadius: 12,
          transition: 'all 0.3s ease',
        },
        contained: {
          boxShadow: '0 6px 12px rgba(24, 239, 199, 0.2)',
          '&:hover': {
            boxShadow: '0 8px 16px rgba(24, 239, 199, 0.3)',
            transform: 'translateY(-2px)',
          },
        },
        outlined: {
          borderWidth: '2px',
          '&:hover': {
            borderWidth: '2px',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          marginBottom: 16,
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.12)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(24, 239, 199, 0.5)',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'rgb(24, 239, 199)',
            },
          },
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          marginBottom: 16,
        },
      },
    },
  },
});

const MealPlanGenerator = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mealPlan, setMealPlan] = useState(null);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    height_cm: '',
    weight_kg: '',
    goal: '',
    diet: '',
    activity_level: '',
    workout_preference: '',
    allergies: '',
    user_suggestion: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('http://127.0.0.1:8001/generate_meal_plan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setMealPlan(data);
      setIsModalOpen(false);
    } catch (err) {
      setError('Failed to generate meal plan. Please try again.');
      console.error('API Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const getMealIcon = (mealType) => {
    switch (mealType.toLowerCase()) {
      case 'breakfast':
        return <BreakfastDining />;
      case 'lunch':
        return <LunchDining />;
      case 'dinner':
        return <DinnerDining />;
      case 'snack':
        return <Fastfood />;
      default:
        return <LocalDining />;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ 
        flexGrow: 1, 
        padding: { xs: 2, sm: 4, md: 6 }, 
        backgroundColor: 'background.default', 
        minHeight: '40vh',
        backgroundImage: 'radial-gradient(circle at 10% 10%, rgba(24, 239, 199, 0.05) 0%, rgba(24, 239, 199, 0) 60%)',
      }}>
        <Box 
          sx={{ 
            maxWidth: 1400, 
            margin: '0 auto',
            mt: { xs: 2, md: 4 },
            mb: { xs: 4, md: 6 },
          }}
        >
          <Typography variant="h2" align="center" gutterBottom>
            NutriGen AI
          </Typography>
          <Typography 
            variant="body1" 
            align="center" 
            sx={{ 
              maxWidth: 700, 
              margin: '0 auto 3rem auto', 
              fontSize: '1.1rem',
              color: 'rgba(255, 255, 255, 0.7)',
              mb: 6,
            }}
          >
            Generate a personalized meal plan tailored to your dietary needs, fitness goals, and preferences using our advanced AI technology.
          </Typography>
          
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              mb: 8
            }}
          >
            <Button 
              variant="contained" 
              color="primary"
              size="large"
              startIcon={<FlashOn />}
              onClick={openModal}
              sx={{
                fontSize: '1.1rem',
                py: 1.8,
                px: 5,
                borderRadius: '50px',
                background: 'linear-gradient(90deg, rgb(24, 239, 199) 0%, rgb(93, 243, 217) 100%)',
                color: 'rgb(32, 33, 39)',
                fontWeight: 700,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-3px) scale(1.02)',
                  boxShadow: '0 12px 24px rgba(24, 239, 199, 0.3)',
                }
              }}
            >
              Create Your Meal Plan
            </Button>
          </Box>

          {/* Modal/Dialog Form */}
          <Dialog 
            open={isModalOpen} 
            onClose={closeModal}
            maxWidth="md"
            fullWidth
            PaperProps={{
              sx: {
                borderRadius: 3,
                padding: 0,
                backgroundColor: 'background.paper',
                backgroundImage: 'linear-gradient(145deg, rgba(41, 43, 52, 0.95) 0%, rgba(32, 33, 39, 0.98) 100%)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
              }
            }}
          >
            <DialogTitle 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                borderBottom: '1px solid',
                borderColor: 'divider',
                pb: 2
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box 
                  sx={{
                    color: 'rgb(32, 33, 39)',
                    backgroundColor: 'primary.main',
                    padding: 1,
                    borderRadius: '12px',
                    display: 'flex',
                    boxShadow: '0 4px 12px rgba(24, 239, 199, 0.2)',
                  }}
                >
                  <Restaurant sx={{ fontSize: 30 }} />
                </Box>
                <Typography variant="h3" component="h2" sx={{ m: 0, fontWeight: 700, color: 'primary.main' }}>
                  Your Nutrition Profile
                </Typography>
              </Box>
              <IconButton 
                onClick={closeModal} 
                aria-label="close"
                sx={{
                  color: 'text.secondary',
                  '&:hover': {
                    color: 'primary.main',
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                  }
                }}
              >
                <Close />
              </IconButton>
            </DialogTitle>
            
            <DialogContent sx={{ mt: 2 }}>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Age"
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleInputChange}
                      fullWidth
                      required
                      variant="outlined"
                      InputLabelProps={{
                        sx: { color: 'rgba(255, 255, 255, 0.7)' }
                      }}
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth required>
                      <InputLabel id="gender-label" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>Gender</InputLabel>
                      <Select
                        labelId="gender-label"
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        label="Gender"
                      >
                        <MenuItem value="">Select</MenuItem>
                        <MenuItem value="male">Male</MenuItem>
                        <MenuItem value="female">Female</MenuItem>
                        <MenuItem value="other">Other</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Height (cm)"
                      type="number"
                      name="height_cm"
                      value={formData.height_cm}
                      onChange={handleInputChange}
                      fullWidth
                      required
                      variant="outlined"
                      InputLabelProps={{
                        sx: { color: 'rgba(255, 255, 255, 0.7)' }
                      }}
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Weight (kg)"
                      type="number"
                      name="weight_kg"
                      value={formData.weight_kg}
                      onChange={handleInputChange}
                      fullWidth
                      required
                      variant="outlined"
                      InputLabelProps={{
                        sx: { color: 'rgba(255, 255, 255, 0.7)' }
                      }}
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth required>
                      <InputLabel id="goal-label" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>Goal</InputLabel>
                      <Select
                        labelId="goal-label"
                        name="goal"
                        value={formData.goal}
                        onChange={handleInputChange}
                        label="Goal"
                      >
                        <MenuItem value="">Select</MenuItem>
                        <MenuItem value="Muscle gain">Muscle Gain</MenuItem>
                        <MenuItem value="Weight loss">Weight Loss</MenuItem>
                        <MenuItem value="Maintenance">Maintenance</MenuItem>
                        <MenuItem value="Endurance">Endurance</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth required>
                      <InputLabel id="diet-label" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>Diet</InputLabel>
                      <Select
                        labelId="diet-label"
                        name="diet"
                        value={formData.diet}
                        onChange={handleInputChange}
                        label="Diet"
                      >
                        <MenuItem value="">Select</MenuItem>
                        <MenuItem value="Vegetarian">Vegetarian</MenuItem>
                        <MenuItem value="Vegan">Vegan</MenuItem>
                        <MenuItem value="Omnivore">Omnivore</MenuItem>
                        <MenuItem value="Keto">Keto</MenuItem>
                        <MenuItem value="Paleo">Paleo</MenuItem>
                        <MenuItem value="High protein">High protein</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth required>
                      <InputLabel id="activity-label" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>Activity Level</InputLabel>
                      <Select
                        labelId="activity-label"
                        name="activity_level"
                        value={formData.activity_level}
                        onChange={handleInputChange}
                        label="Activity Level"
                      >
                        <MenuItem value="">Select</MenuItem>
                        <MenuItem value="Sedentary">Sedentary</MenuItem>
                        <MenuItem value="Lightly active">Lightly active</MenuItem>
                        <MenuItem value="Moderate">Moderate</MenuItem>
                        <MenuItem value="Active">Active</MenuItem>
                        <MenuItem value="Very active">Very active</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth required>
                      <InputLabel id="workout-preference-label" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>Workout Preference</InputLabel>
                      <Select
                        labelId="workout-preference-label"
                        name="workout_preference"
                        value={formData.workout_preference}
                        onChange={handleInputChange}
                        label="Workout Preference"
                      >
                        <MenuItem value="">Select</MenuItem>
                        <MenuItem value="Gym">Gym</MenuItem>
                        <MenuItem value="Home">Home</MenuItem>
                        <MenuItem value="Outdoor">Outdoor</MenuItem>
                        <MenuItem value="Gym-based workouts with weights">Gym-based workouts with weights</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  
                  <Grid item xs={12}>
                    <TextField
                      label="Allergies"
                      name="allergies"
                      value={formData.allergies}
                      onChange={handleInputChange}
                      fullWidth
                      variant="outlined"
                      placeholder="None, dairy, nuts, etc."
                      InputLabelProps={{
                        sx: { color: 'rgba(255, 255, 255, 0.7)' }
                      }}
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <TextField
                      label="Special Notes/Suggestions"
                      name="user_suggestion"
                      value={formData.user_suggestion}
                      onChange={handleInputChange}
                      fullWidth
                      multiline
                      rows={3}
                      variant="outlined"
                      placeholder="E.g., focus more on upper body and include compound movements"
                      InputLabelProps={{
                        sx: { color: 'rgba(255, 255, 255, 0.7)' }
                      }}
                    />
                  </Grid>
                </Grid>
              </form>
            </DialogContent>
            
            <DialogActions sx={{ p: 3, pt: 1, justifyContent: 'flex-end', gap: 2 }}>
              <Button 
                variant="outlined" 
                color="primary" 
                onClick={closeModal}
                sx={{
                  borderColor: 'rgba(24, 239, 199, 0.5)',
                  '&:hover': {
                    borderColor: 'primary.main',
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                  }
                }}
              >
                Cancel
              </Button>
              <Button 
                variant="contained" 
                color="primary" 
                onClick={handleSubmit}
                disabled={isLoading}
                startIcon={isLoading ? null : <LocalDining />}
                sx={{
                  background: 'linear-gradient(90deg, rgb(24, 239, 199) 0%, rgb(93, 243, 217) 100%)',
                  color: 'rgb(32, 33, 39)',
                  fontWeight: 600,
                }}
              >
                {isLoading ? 'Generating...' : 'Generate Plan'}
              </Button>
            </DialogActions>
          </Dialog>

          {/* Results Section */}
          {mealPlan && (
            <Box sx={{ mt: 8, maxWidth: 1200, mx: 'auto' }}>
              <Typography variant="h2" align="center" sx={{ mb: 5 }}>
                Your Personalized Nutrition Plan
              </Typography>
              
              {/* Daily Meal Plans */}
              <Box sx={{ mb: 8 }}>
                <Typography variant="h3" sx={{ mb: 4, fontSize: '1.8rem', fontWeight: 700, color: 'primary.main' }}>
                  7-Day Meal Plan
                </Typography>
                <Grid container spacing={4}>
                  {Object.entries(mealPlan.meal_plan).map(([day, meals]) => (
                    <Grid item xs={12} md={6} key={day}>
                      <Card
                        sx={{
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          position: 'relative',
                          overflow: 'visible',
                          '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: -8,
                            left: 20,
                            right: 20,
                            height: 8,
                            background: 'linear-gradient(90deg, rgb(24, 239, 199) 0%, rgb(93, 243, 217) 100%)',
                            borderTopLeftRadius: 8,
                            borderTopRightRadius: 8,
                          }
                        }}
                      >
                        <CardContent sx={{ p: 0, height: '100%', display: 'flex', flexDirection: 'column' }}>
                          <Box 
                            sx={{ 
                              display: 'flex', 
                              alignItems: 'center', 
                              gap: 2, 
                              mb: 3,
                              p: 3,
                              borderBottom: '1px solid',
                              borderColor: alpha(theme.palette.primary.main, 0.2),
                              background: `linear-gradient(90deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, rgba(38, 40, 48, 0) 100%)`,
                            }}
                          >
                            <Box 
                              sx={{
                                color: 'rgb(32, 33, 39)',
                                background: 'linear-gradient(90deg, rgb(24, 239, 199) 0%, rgb(93, 243, 217) 100%)',
                                padding: 1.2,
                                borderRadius: 2,
                                display: 'flex',
                                boxShadow: '0 4px 10px rgba(24, 239, 199, 0.3)',
                              }}
                            >
                              <CalendarMonth sx={{ fontSize: 24 }} />
                            </Box>
                            <Typography 
                              variant="h3" 
                              component="h3" 
                              sx={{ 
                                color: 'white',
                                fontWeight: 700,
                                letterSpacing: '0px',
                                fontSize: '1.3rem',
                                m: 0
                              }}
                            >
                              {day}
                            </Typography>
                          </Box>
                          
                          <Box sx={{ px: 3, pb: 3, flex: 1 }}>
                            {Object.entries(meals).map(([mealType, details]) => (
                              <Paper 
                                key={mealType} 
                                elevation={0} 
                                sx={{ 
                                  p: 3, 
                                  mb: 3,
                                  borderRadius: 3,
                                  background: 'linear-gradient(145deg, rgba(46, 48, 58, 0.7) 0%, rgba(38, 40, 48, 0.7) 100%)',
                                  backdropFilter: 'blur(5px)',
                                  border: '1px solid rgba(255, 255, 255, 0.05)',
                                  position: 'relative',
                                  overflow: 'hidden',
                                  '&::before': {
                                    content: '""',
                                    position: 'absolute',
                                    left: 0,
                                    top: 0,
                                    bottom: 0,
                                    width: 4,
                                    background: 'linear-gradient(to bottom, rgb(24, 239, 199), rgb(93, 243, 217))',
                                  }
                                }}
                              >
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                                  <Avatar sx={{ 
                                    bgcolor: alpha(theme.palette.primary.main, 0.2),
                                    color: theme.palette.primary.main,
                                    width: 36, 
                                    height: 36 
                                  }}>
                                    {getMealIcon(mealType)}
                                  </Avatar>
                                  <Typography 
                                    variant="h3" 
                                    component="h4" 
                                    sx={{ 
                                      fontSize: '1.1rem', 
                                      fontWeight: 700, 
                                      color: 'white',
                                      textTransform: 'capitalize'
                                    }}
                                  >
                                    {mealType}
                                  </Typography>
                                </Box>
                                
                                <Typography variant="body1" sx={{ mb: 2, fontWeight: 500 }}>
                                  {details.main}
                                </Typography>
                                
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                                  <Chip 
                                    label={`${details.calories} calories`}
                                    size="small"
                                    sx={{
                                      bgcolor: alpha(theme.palette.primary.main, 0.1),
                                      color: theme.palette.primary.main,
                                      fontWeight: 600,
                                      border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                                    }}
                                  />
                                  {details.macros && (
                                    <Chip 
                                      label={details.macros}
                                      size="small"
                                      sx={{
                                        bgcolor: alpha(theme.palette.secondary.main, 0.1),
                                        color: theme.palette.secondary.main,
                                        fontWeight: 600,
                                        border: `1px solid ${alpha(theme.palette.secondary.main, 0.2)}`,
                                      }}
                                    />
                                  )}
                                </Box>
                                
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                  <Notes sx={{ fontSize: 18, color: alpha(theme.palette.primary.main, 0.7) }} />
                                  <Typography variant="body2" sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
                                    {details.prep_tip}
                                  </Typography>
                                </Box>
                              </Paper>
                            ))}
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>
              
              {/* Alternative Meals */}
              {mealPlan.alternate_meals && (
                <Box sx={{ mb: 8 }}>
                  <Typography variant="h3" sx={{ mb: 4, fontSize: '1.8rem', fontWeight: 700, color: 'primary.main' }}>
                    Alternative Meal Options
                  </Typography>
                  <Grid container spacing={4}>
                    {Object.entries(mealPlan.alternate_meals).map(([mealType, options]) => (
                      <Grid item xs={12} md={4} key={mealType}>
                        <Card sx={{ height: '100%' }}>
                          <CardContent sx={{ p: 0 }}>
                            <Box 
                              sx={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: 2, 
                                p: 3,
                                borderBottom: '1px solid',
                                borderColor: alpha(theme.palette.divider, 0.2),
                                background: `linear-gradient(90deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, rgba(38, 40, 48, 0) 100%)`,
                              }}
                            >
                              <Avatar sx={{ 
                                bgcolor: alpha(theme.palette.primary.main, 0.2),
                                color: theme.palette.primary.main,
                              }}>
                                {getMealIcon(mealType)}
                              </Avatar>
                              <Typography 
                                variant="h3" 
                                component="h3"
                                sx={{ 
                                  color: 'white',
                                  fontWeight: 700,
                                  textTransform: 'capitalize'
                                }}
                              >
                                {mealType} Options
                              </Typography>
                            </Box>
                            
                            <Box sx={{ p: 3 }}>
                              {options.map((meal, index) => (
                                <Paper 
                                  key={index} 
                                  elevation={0} 
                                  sx={{ 
                                    p: 2.5, 
                                    mb: index < options.length - 1 ? 3 : 0,
                                    borderRadius: 3,
                                    background: 'linear-gradient(145deg, rgba(46, 48, 58, 0.5) 0%, rgba(38, 40, 48, 0.5) 100%)',
                                    backdropFilter: 'blur(5px)',
                                    border: '1px solid rgba(255, 255, 255, 0.05)',
                                  }}
                                >
                                  <Typography variant="body1" sx={{ mb: 2, fontWeight: 500 }}>
                                    {meal.main}
                                  </Typography>
                                  
                                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                                    <Chip 
                                      label={`${meal.calories} calories`}
                                      size="small"
                                      sx={{
                                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                                        color: theme.palette.primary.main,
                                        fontWeight: 600,
                                        border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                                      }}
                                    />
                                  </Box>
                                  
                                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                    <Notes sx={{ fontSize: 18, color: alpha(theme.palette.primary.main, 0.7) }} />
                                    <Typography variant="body2" sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
                                      {meal.prep_tip}
                                    </Typography>
                                  </Box>
                                </Paper>
                              ))}
                            </Box>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              )}
              
              {/* Grocery List */}
              {mealPlan.grocery_list && (
                <Box sx={{ mb: 6 }}>
                  <Typography variant="h3" sx={{ mb: 4, fontSize: '1.8rem', fontWeight: 700, color: 'primary.main' }}>
                    Grocery List
                  </Typography>
                  <Card>
                    <CardContent sx={{ p: 0 }}>
                      <Box 
                        sx={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: 2, 
                          p: 3,
                          borderBottom: '1px solid',
                          borderColor: alpha(theme.palette.divider, 0.2),
                          background: `linear-gradient(90deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, rgba(38, 40, 48, 0) 100%)`,
                        }}
                      >
                        <Box 
                          sx={{
                            color: 'rgb(32, 33, 39)',
                            background: 'linear-gradient(90deg, rgb(24, 239, 199) 0%, rgb(93, 243, 217) 100%)',
                            padding: 1.2,
                            borderRadius: 2,
                            display: 'flex',
                            boxShadow: '0 4px 10px rgba(24, 239, 199, 0.3)',
                          }}
                        >
                          <LocalGroceryStore sx={{ fontSize: 24 }} />
                        </Box>
                        <Typography 
                          variant="h3" 
                          component="h3"
                          sx={{ 
                            color: 'white',
                            fontWeight: 700,
                            letterSpacing: '0px',
                            fontSize: '1.3rem',
                            m: 0
                          }}
                        >
                          Weekly Shopping List
                        </Typography>
                      </Box>
                      
                      <Box sx={{ p: 3 }}>
                        <Grid container spacing={3}>
                          {Object.entries(mealPlan.grocery_list).map(([category, items]) => (
                            <Grid item xs={12} sm={6} md={3} key={category}>
                              <Paper 
                                elevation={0} 
                                sx={{ 
                                  p: 3, 
                                  height: '100%',
                                  borderRadius: 3,
                                  background: 'linear-gradient(145deg, rgba(46, 48, 58, 0.5) 0%, rgba(38, 40, 48, 0.5) 100%)',
                                  backdropFilter: 'blur(5px)',
                                  border: '1px solid rgba(255, 255, 255, 0.05)',
                                }}
                              >
                                <Typography 
                                  variant="h3" 
                                  component="h4" 
                                  sx={{ 
                                    mb: 2, 
                                    color: theme.palette.primary.main,
                                    fontWeight: 700
                                  }}
                                >
                                  {category}
                                </Typography>
                                
                                <Box component="ul" sx={{ pl: 2, m: 0 }}>
                                  {items.map((item, index) => (
                                    <Typography 
                                      component="li" 
                                      variant="body2" 
                                      key={index}
                                      sx={{ 
                                        mb: 1,
                                        '&:last-child': { mb: 0 }
                                      }}
                                    >
                                      {item}
                                    </Typography>
                                  ))}
                                </Box>
                              </Paper>
                            </Grid>
                          ))}
                        </Grid>
                      </Box>
                    </CardContent>
                  </Card>
                </Box>
              )}
              
              {/* Export/Save Options */}
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 6 }}>
                <Button
                  variant="outlined"
                  color="primary"
                  sx={{
                    borderColor: 'rgba(24, 239, 199, 0.5)',
                    '&:hover': {
                      borderColor: 'primary.main',
                      backgroundColor: alpha(theme.palette.primary.main, 0.1),
                    }
                  }}
                >
                  Print Plan
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    background: 'linear-gradient(90deg, rgb(24, 239, 199) 0%, rgb(93, 243, 217) 100%)',
                    color: 'rgb(32, 33, 39)',
                    fontWeight: 600,
                  }}
                >
                  Save Plan
                </Button>
              </Box>
            </Box>
          )}
          
          {/* Error Display */}
          {error && (
            <Box sx={{ mt: 4, textAlign: 'center' }}>
              <Typography variant="body1" color="error">
                {error}
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default MealPlanGenerator;