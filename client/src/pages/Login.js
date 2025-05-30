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
} from '@mui/material';
import {
  Search as SearchIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Google as GoogleIcon,
  Facebook as FacebookIcon,
  Apple as AppleIcon,
} from '@mui/icons-material';
import { login } from '../features/auth/authSlice';

// Food quotes for the login page
const foodQuotes = [
  {
    text: "Food brings people together on many different levels. It's nourishment of the soul and body; it's truly love.",
    author: "Giada De Laurentiis"
  },
  {
    text: "Cooking is all about people. Food is maybe the only universal thing.",
    author: "Guy Fieri"
  },
  {
    text: "The only time to eat diet food is while you're waiting for the steak to cook.",
    author: "Julia Child"
  }
];

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(login(formData));
    if (!result.error) {
      navigate('/');
    }
  };

  const handleSocialLogin = (provider) => {
    // Implement social login logic here
    console.log(`Logging in with ${provider}`);
  };

  // Get a random quote
  const randomQuote = foodQuotes[Math.floor(Math.random() * foodQuotes.length)];

  return (
    <Container maxWidth="lg">
      <Grid container spacing={4} sx={{ minHeight: '100vh', alignItems: 'center' }}>
        {/* Left side - Login Form */}
        <Grid item xs={12} md={6}>
          <Fade in timeout={1000}>
            <Box sx={{ maxWidth: 500, mx: 'auto', p: 3 }}>
              <Grow in timeout={1000} style={{ transitionDelay: '200ms' }}>
                <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                  Welcome Back!
                </Typography>
              </Grow>
              <Grow in timeout={1000} style={{ transitionDelay: '400ms' }}>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                  Sign in to continue your culinary journey
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
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            color="primary"
                          />
                        }
                        label="Remember me"
                      />
                      <Link
                        component={RouterLink}
                        to="/forgot-password"
                        sx={{ textDecoration: 'none', color: 'primary.main' }}
                      >
                        Forgot Password?
                      </Link>
                    </Box>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      size="large"
                      disabled={isLoading}
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
                      {isLoading ? <CircularProgress size={24} /> : 'Sign In'}
                    </Button>
                  </form>

                  <Divider sx={{ my: 3 }}>
                    <Typography variant="body2" color="text.secondary">
                      OR
                    </Typography>
                  </Divider>

                  <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 3 }}>
                    <IconButton
                      onClick={() => handleSocialLogin('google')}
                      sx={{
                        bgcolor: 'white',
                        boxShadow: 1,
                        '&:hover': { bgcolor: 'grey.100' },
                      }}
                    >
                      <GoogleIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleSocialLogin('facebook')}
                      sx={{
                        bgcolor: 'white',
                        boxShadow: 1,
                        '&:hover': { bgcolor: 'grey.100' },
                      }}
                    >
                      <FacebookIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleSocialLogin('apple')}
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
                      Don't have an account?{' '}
                      <Link component={RouterLink} to="/register" sx={{ fontWeight: 'bold' }}>
                        Sign Up
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
                background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
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
                  background: 'url(https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)',
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
                    "Food is Life"
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

export default Login; 