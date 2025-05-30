import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Link,
  Paper,
  Grid,
  Fade,
  Grow,
  Alert,
  CircularProgress,
  Divider,
  IconButton,
  InputAdornment,
  Checkbox,
  FormControlLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Google as GoogleIcon,
  Facebook as FacebookIcon,
  Apple as AppleIcon,
} from '@mui/icons-material';
import { register } from '../features/auth/authSlice';

// Food quotes for the registration page
const foodQuotes = [
  {
    text: "The only thing I like better than talking about food is eating.",
    author: "John Walters"
  },
  {
    text: "Life is uncertain. Eat dessert first.",
    author: "Ernestine Ulmer"
  },
  {
    text: "Food is symbolic of love when words are inadequate.",
    author: "Alan D. Wolfelt"
  }
];

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return;
    }
    const result = await dispatch(register(formData));
    if (!result.error) {
      navigate('/');
    }
  };

  const handleSocialSignup = (provider) => {
    // Implement social signup logic here
    console.log(`Signing up with ${provider}`);
  };

  // Password requirements
  const passwordRequirements = [
    {
      text: 'At least 8 characters long',
      met: formData.password.length >= 8,
    },
    {
      text: 'Contains at least one uppercase letter',
      met: /[A-Z]/.test(formData.password),
    },
    {
      text: 'Contains at least one number',
      met: /[0-9]/.test(formData.password),
    },
    {
      text: 'Contains at least one special character',
      met: /[!@#$%^&*(),.?":{}|<>]/.test(formData.password),
    },
  ];

  // Get a random quote
  const randomQuote = foodQuotes[Math.floor(Math.random() * foodQuotes.length)];

  return (
    <Container maxWidth="lg">
      <Grid container spacing={4} sx={{ minHeight: '100vh', alignItems: 'center' }}>
        {/* Left side - Registration Form */}
        <Grid item xs={12} md={6}>
          <Fade in timeout={1000}>
            <Box sx={{ maxWidth: 500, mx: 'auto', p: 3 }}>
              <Grow in timeout={1000} style={{ transitionDelay: '200ms' }}>
                <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                  Join Our Food Community
                </Typography>
              </Grow>
              <Grow in timeout={1000} style={{ transitionDelay: '400ms' }}>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                  Create an account to start your culinary adventure
                </Typography>
              </Grow>

              {error && (
                <Fade in timeout={500}>
                  <Alert severity="error" sx={{ mb: 3 }}>
                    {error}
                  </Alert>
                </Fade>
              )}

              <Grow in timeout={1000} style={{ transitionDelay: '600ms' }}>
                <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
                  <form onSubmit={handleSubmit}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      sx={{ mb: 3 }}
                    />
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      sx={{ mb: 3 }}
                    />
                    <TextField
                      fullWidth
                      label="Password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={handleChange}
                      required
                      sx={{ mb: 2 }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowPassword(!showPassword)}
                              edge="end"
                            >
                              {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                    <TextField
                      fullWidth
                      label="Confirm Password"
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      sx={{ mb: 3 }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              edge="end"
                            >
                              {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />

                    {/* Password Requirements */}
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        Password Requirements:
                      </Typography>
                      <List dense>
                        {passwordRequirements.map((requirement, index) => (
                          <ListItem key={index} sx={{ py: 0 }}>
                            <ListItemIcon sx={{ minWidth: 36 }}>
                              {requirement.met ? (
                                <CheckCircleIcon color="success" fontSize="small" />
                              ) : (
                                <CancelIcon color="error" fontSize="small" />
                              )}
                            </ListItemIcon>
                            <ListItemText
                              primary={requirement.text}
                              sx={{
                                color: requirement.met ? 'success.main' : 'error.main',
                              }}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </Box>

                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={acceptTerms}
                          onChange={(e) => setAcceptTerms(e.target.checked)}
                          color="primary"
                        />
                      }
                      label={
                        <Typography variant="body2">
                          I agree to the{' '}
                          <Link component={RouterLink} to="/terms" sx={{ textDecoration: 'none' }}>
                            Terms of Service
                          </Link>{' '}
                          and{' '}
                          <Link component={RouterLink} to="/privacy" sx={{ textDecoration: 'none' }}>
                            Privacy Policy
                          </Link>
                        </Typography>
                      }
                      sx={{ mb: 3 }}
                    />

                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      size="large"
                      disabled={isLoading || !acceptTerms}
                      sx={{
                        py: 1.5,
                        borderRadius: 2,
                        textTransform: 'none',
                        fontSize: '1.1rem',
                        boxShadow: 2,
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: 4,
                          transition: 'all 0.3s ease-in-out',
                        },
                      }}
                    >
                      {isLoading ? <CircularProgress size={24} /> : 'Create Account'}
                    </Button>
                  </form>

                  <Divider sx={{ my: 3 }}>
                    <Typography variant="body2" color="text.secondary">
                      OR
                    </Typography>
                  </Divider>

                  <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 3 }}>
                    <IconButton
                      onClick={() => handleSocialSignup('google')}
                      sx={{
                        bgcolor: 'white',
                        boxShadow: 1,
                        '&:hover': { bgcolor: 'grey.100' },
                      }}
                    >
                      <GoogleIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleSocialSignup('facebook')}
                      sx={{
                        bgcolor: 'white',
                        boxShadow: 1,
                        '&:hover': { bgcolor: 'grey.100' },
                      }}
                    >
                      <FacebookIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleSocialSignup('apple')}
                      sx={{
                        bgcolor: 'white',
                        boxShadow: 1,
                        '&:hover': { bgcolor: 'grey.100' },
                      }}
                    >
                      <AppleIcon />
                    </IconButton>
                  </Box>

                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                      Already have an account?{' '}
                      <Link component={RouterLink} to="/login" sx={{ fontWeight: 'bold' }}>
                        Sign In
                      </Link>
                    </Typography>
                  </Box>
                </Paper>
              </Grow>
            </Box>
          </Fade>
        </Grid>

        {/* Right side - Quote and Image */}
        <Grid item xs={12} md={6}>
          <Fade in timeout={1000} style={{ transitionDelay: '800ms' }}>
            <Box
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                p: 4,
                background: 'linear-gradient(45deg, #FF8E53 30%, #FE6B8B 90%)',
                borderRadius: 4,
                color: 'white',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'url(https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  opacity: 0.2,
                },
              }}
            >
              <Grow in timeout={1000} style={{ transitionDelay: '1000ms' }}>
                <Box sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: 'bold',
                      mb: 4,
                      textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                    }}
                  >
                    "Good Food, Good Life"
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{
                      fontStyle: 'italic',
                      mb: 2,
                      textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                    }}
                  >
                    "{randomQuote.text}"
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 'bold',
                      textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                    }}
                  >
                    - {randomQuote.author}
                  </Typography>
                </Box>
              </Grow>
            </Box>
          </Fade>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Register; 