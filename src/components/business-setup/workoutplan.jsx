import React, { useState } from 'react';
import axios from 'axios';
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
  Divider,
  Link,
  ThemeProvider,
  createTheme,
  alpha
} from '@mui/material';
import { 
  Close, 
  FitnessCenter, 
  DirectionsRun, 
  Restaurant, 
  KeyboardArrowRight, 
  YouTube, 
  Launch,
  FlashOn,
  CalendarMonth,
  Notes
} from '@mui/icons-material';

// Modern dark theme configuration with accent color
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
      main: 'rgb(252, 128, 255)',
      light: 'rgb(253, 166, 255)',
      dark: 'rgb(204, 71, 207)',
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
    fontFamily: '"Inter", "Roboto", "Arial", sans-serif',
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
    MuiSelect: {
      styleOverrides: {
        icon: {
          color: 'rgb(24, 239, 199)',
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          padding: '24px',
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          padding: '0 24px 16px',
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          padding: '16px 24px 24px',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  },
});

const WorkoutPlanGenerator = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [workoutPlan, setWorkoutPlan] = useState(null);
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
      const response = await axios.post('http://127.0.0.1:8002/generate_workout_plan', formData);
      setWorkoutPlan(response.data.workout_plan);
      setIsModalOpen(false);
    } catch (err) {
      setError('Failed to generate workout plan. Please try again.');
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
            FitGen AI
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
            Generate a personalized workout plan tailored to your fitness goals, preferences, and physical attributes using our advanced AI technology.
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
              Create Your Workout Plan
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
                  <FitnessCenter sx={{ fontSize: 30 }} />
                </Box>
                <Typography variant="h3" component="h2" sx={{ m: 0, fontWeight: 700, color: 'primary.main' }}>
                  Your Fitness Profile
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
                      </Select>
                    </FormControl>
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth required>
                      <InputLabel id="activity-level-label" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>Activity Level</InputLabel>
                      <Select
                        labelId="activity-level-label"
                        name="activity_level"
                        value={formData.activity_level}
                        onChange={handleInputChange}
                        label="Activity Level"
                      >
                        <MenuItem value="">Select</MenuItem>
                        <MenuItem value="Sedentary">Sedentary</MenuItem>
                        <MenuItem value="Lightly active">Lightly active</MenuItem>
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
                      placeholder="E.g., Include core and mobility training, avoid exercises that stress the knees"
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
                startIcon={isLoading ? null : <DirectionsRun />}
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

          {/* Error Message */}
          {error && (
            <Box 
              sx={{ 
                mt: 4, 
                p: 3, 
                bgcolor: alpha('#FF5252', 0.1), 
                border: '1px solid', 
                borderColor: '#FF5252', 
                borderRadius: 2, 
                color: '#FF5252',
                maxWidth: 800,
                mx: 'auto'
              }}
            >
              <Typography variant="body1">{error}</Typography>
            </Box>
          )}

          {/* Results Section */}
          {workoutPlan && (
            <Box sx={{ mt: 8, maxWidth: 1200, mx: 'auto' }}>
              <Typography variant="h2" align="center" sx={{ mb: 5 }}>
                Your Elite Training Program
              </Typography>
              
              <Grid container spacing={4}>
                {Object.entries(workoutPlan).map(([day, details]) => (
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
                        
                        <Box sx={{ px: 3, mb: 3 }}>
                          <Box 
                            sx={{ 
                              display: 'flex',
                              flexDirection: 'column',
                              gap: 1,
                              p: 2,
                              borderRadius: 2,
                              background: alpha(theme.palette.background.default, 0.4),
                              backdropFilter: 'blur(8px)',
                            }}
                          >
                            <Typography 
                              variant="body1" 
                              sx={{ 
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1
                              }}
                            >
                              <Box 
                                component="span" 
                                sx={{ 
                                  color: 'primary.main',
                                  fontWeight: 600,
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: 0.5
                                }}
                              >
                                <FlashOn sx={{ fontSize: 18 }} /> Goal:
                              </Box> 
                              {details.goal}
                            </Typography>
                            <Typography 
                              variant="body1" 
                              sx={{ 
                                display: 'flex',
                                alignItems: 'center', 
                                gap: 1
                              }}
                            >
                              <Box 
                                component="span" 
                                sx={{ 
                                  color: 'primary.main',
                                  fontWeight: 600,
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: 0.5
                                }}
                              >
                                <Notes sx={{ fontSize: 18 }} /> Focus:
                              </Box> 
                              {details.focus}
                            </Typography>
                          </Box>
                        </Box>
                        
                        <Typography 
                          variant="h3" 
                          sx={{ 
                            color: 'primary.main', 
                            px: 3, 
                            mb: 2, 
                            fontSize: '1.1rem',
                            fontWeight: 700,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1
                          }}
                        >
                          <FitnessCenter sx={{ fontSize: 20 }} /> 
                          Exercises
                        </Typography>
                        
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, px: 3, pb: 3, flex: 1 }}>
                          {details.exercises.map((exercise, index) => (
                            <Paper 
                              key={index} 
                              elevation={0} 
                              sx={{ 
                                p: 2.5, 
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
                              <Typography 
                                variant="h3" 
                                component="h4" 
                                sx={{ 
                                  fontSize: '1.05rem', 
                                  fontWeight: 700, 
                                  color: 'white', 
                                  mb: 1,
                                  pl: 0.5
                                }}
                              >
                                {exercise.name}
                              </Typography>
                              <Box
                                sx={{
                                  display: 'inline-block',
                                  px: 1.5,
                                  py: 0.5,
                                  borderRadius: 6,
                                  backgroundColor: alpha(theme.palette.primary.main, 0.1),
                                  color: theme.palette.primary.main,
                                  fontWeight: 600,
                                  fontSize: '0.85rem',
                                  mb: 1.5,
                                  border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                                }}
                              >
                                {exercise.sets} • {exercise.reps}
                              </Box>
                              <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary', pl: 0.5 }}>
                                {exercise.notes}
                              </Typography>
                              <Button
                                variant="outlined"
                                color="primary"
                                size="small"
                                startIcon={<YouTube />}
                                component={Link}
                                href={exercise.video}
                                target="_blank"
                                rel="noopener noreferrer"
                                sx={{ 
                                  borderRadius: '50px',
                                  borderColor: alpha(theme.palette.primary.main, 0.5),
                                  '&:hover': {
                                    borderColor: 'primary.main',
                                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                                  }
                                }}
                              >
                                Watch Demo
                              </Button>
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
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default WorkoutPlanGenerator;