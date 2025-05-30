import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  TextField,
  InputAdornment,
  Fade,
  Grow,
  Zoom,
  Paper,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Search as SearchIcon,
  Star as StarIcon,
  AccessTime as AccessTimeIcon,
  LocationOn as LocationOnIcon,
  ArrowForward as ArrowForwardIcon,
} from '@mui/icons-material';
import { getRestaurants } from '../features/restaurants/restaurantSlice';
import MobileAppDownload from '../components/MobileAppDownload';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const { restaurants } = useSelector((state) => state.restaurants);

  useEffect(() => {
    dispatch(getRestaurants({ sort: 'rating' }));
  }, [dispatch]);

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      navigate(`/restaurants?search=${e.target.value}`);
    }
  };

  const handleRestaurantClick = (id) => {
    navigate(`/restaurants/${id}`);
  };

  // Featured categories with icons and colors
  const categories = [
    { name: 'Pizza', icon: '🍕', color: '#FF6B6B' },
    { name: 'Burgers', icon: '🍔', color: '#4ECDC4' },
    { name: 'Sushi', icon: '🍱', color: '#45B7D1' },
    { name: 'Desserts', icon: '🍰', color: '#96CEB4' },
    { name: 'Indian', icon: '🍛', color: '#FFD93D' },
    { name: 'Italian', icon: '🍝', color: '#FF8B94' },
  ];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Hero Section */}
      <Fade in timeout={1000}>
        <Box
          sx={{
            background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
            color: 'white',
            py: { xs: 8, md: 12 },
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
              opacity: 0.1,
            },
          }}
        >
          <Container maxWidth="lg">
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={6}>
                <Grow in timeout={1000} style={{ transitionDelay: '200ms' }}>
                  <Box>
                    <Typography
                      variant="h2"
                      component="h1"
                      gutterBottom
                      sx={{
                        fontWeight: 'bold',
                        textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                      }}
                    >
                      Delicious Food
                      <br />
                      Delivered To Your Door
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{ mb: 4, textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}
                    >
                      Discover the best food & drinks in your area
                    </Typography>
                    <TextField
                      fullWidth
                      placeholder="Search for restaurants or cuisines..."
                      variant="outlined"
                      onKeyPress={handleSearch}
                      sx={{
                        bgcolor: 'rgba(255,255,255,0.9)',
                        borderRadius: 2,
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': { border: 'none' },
                        },
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon color="action" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Box>
                </Grow>
              </Grid>
              <Grid item xs={12} md={6}>
                <Zoom in timeout={1000} style={{ transitionDelay: '400ms' }}>
                  <Box
                    component="img"
                    src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                    alt="Food delivery"
                    sx={{
                      width: '100%',
                      height: 'auto',
                      borderRadius: 4,
                      boxShadow: 8,
                    }}
                  />
                </Zoom>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Fade>

      {/* Categories Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Fade in timeout={1000}>
          <Box sx={{ mb: 6, textAlign: 'center' }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
              Popular Categories
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Explore our wide range of cuisines
            </Typography>
          </Box>
        </Fade>

        <Grid container spacing={3}>
          {categories.map((category, index) => (
            <Grid item xs={6} sm={4} md={2} key={category.name}>
              <Grow in timeout={1000} style={{ transitionDelay: `${index * 100}ms` }}>
                <Paper
                  elevation={3}
                  sx={{
                    p: 2,
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: 6,
                    },
                    bgcolor: category.color,
                    color: 'white',
                  }}
                  onClick={() => navigate(`/restaurants?cuisine=${category.name}`)}
                >
                  <Typography variant="h2" sx={{ mb: 1 }}>
                    {category.icon}
                  </Typography>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    {category.name}
                  </Typography>
                </Paper>
              </Grow>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Featured Restaurants Section */}
      <Box sx={{ bgcolor: 'grey.50', py: 8 }}>
        <Container maxWidth="lg">
          <Fade in timeout={1000}>
            <Box sx={{ mb: 6, textAlign: 'center' }}>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
                Featured Restaurants
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Discover the most popular restaurants in your area
              </Typography>
            </Box>
          </Fade>

          <Grid container spacing={4}>
            {restaurants.slice(0, 6).map((restaurant, index) => (
              <Grid item xs={12} sm={6} md={4} key={restaurant._id}>
                <Grow in timeout={1000} style={{ transitionDelay: `${index * 100}ms` }}>
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: 6,
                      },
                    }}
                    onClick={() => handleRestaurantClick(restaurant._id)}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image={restaurant.image}
                      alt={restaurant.name}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold' }}>
                          {restaurant.name}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <StarIcon sx={{ color: 'warning.main', mr: 0.5 }} />
                          <Typography variant="body2">{restaurant.rating}</Typography>
                        </Box>
                      </Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {restaurant.cuisine}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <LocationOnIcon sx={{ color: 'text.secondary', mr: 1, fontSize: 20 }} />
                        <Typography variant="body2" color="text.secondary">
                          {restaurant.location}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <AccessTimeIcon sx={{ color: 'text.secondary', mr: 1, fontSize: 20 }} />
                        <Typography variant="body2" color="text.secondary">
                          {restaurant.deliveryTime} min
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grow>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ textAlign: 'center', mt: 6 }}>
            <Button
              variant="contained"
              size="large"
              endIcon={<ArrowForwardIcon />}
              onClick={() => navigate('/restaurants')}
              sx={{
                px: 4,
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
              View All Restaurants
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Fade in timeout={1000}>
          <Box sx={{ mb: 6, textAlign: 'center' }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
              Why Choose Us
            </Typography>
            <Typography variant="body1" color="text.secondary">
              We provide the best food delivery experience
            </Typography>
          </Box>
        </Fade>

        <Grid container spacing={4}>
          {[
            {
              title: 'Fast Delivery',
              description: 'Get your food delivered within 30 minutes',
              icon: '🚚',
            },
            {
              title: 'Fresh Food',
              description: 'All our food is prepared fresh daily',
              icon: '🍽️',
            },
            {
              title: 'Best Quality',
              description: 'We maintain the highest quality standards',
              icon: '⭐',
            },
            {
              title: '24/7 Support',
              description: 'Our customer support is always available',
              icon: '💬',
            },
          ].map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={feature.title}>
              <Grow in timeout={1000} style={{ transitionDelay: `${index * 100}ms` }}>
                <Paper
                  elevation={3}
                  sx={{
                    p: 3,
                    textAlign: 'center',
                    height: '100%',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: 6,
                    },
                  }}
                >
                  <Typography variant="h2" sx={{ mb: 2 }}>
                    {feature.icon}
                  </Typography>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </Paper>
              </Grow>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Add Mobile App Download Section */}
      <MobileAppDownload />
    </Box>
  );
};

export default Home; 