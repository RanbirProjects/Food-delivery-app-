import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Box,
  Rating,
  Button,
  TextField,
  InputAdornment,
  Chip,
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  useTheme,
  useMediaQuery,
  CircularProgress,
  Fade,
  Grow,
} from '@mui/material';
import {
  Search as SearchIcon,
  LocationOn as LocationIcon,
  AccessTime as TimeIcon,
  AttachMoney,
  FilterList as FilterListIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
} from '@mui/icons-material';
import { getRestaurants } from '../features/restaurants/restaurantSlice';
import { useAuth } from '../hooks/useAuth';
import { useRestaurants } from '../hooks/useRestaurants';
import { addFavorite, removeFavorite } from '../features/restaurants/restaurantSlice';

// Sample Bangalore restaurants data
const sampleRestaurants = [
  {
    _id: '1',
    name: 'MTR - Mavalli Tiffin Room',
    cuisine: 'South Indian',
    rating: 4.5,
    deliveryTime: '30-40',
    minOrder: 200,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    address: 'Lalbagh Road, Bangalore',
    isVeg: true,
    isPopular: true,
  },
  {
    _id: '2',
    name: 'Vidyarthi Bhavan',
    cuisine: 'South Indian',
    rating: 4.7,
    deliveryTime: '25-35',
    minOrder: 150,
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    address: 'Gandhi Bazaar, Bangalore',
    isVeg: true,
    isPopular: true,
  },
  {
    _id: '3',
    name: 'Koshy\'s',
    cuisine: 'Continental',
    rating: 4.3,
    deliveryTime: '35-45',
    minOrder: 300,
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    address: 'St. Mark\'s Road, Bangalore',
    isVeg: false,
    isPopular: true,
  },
  {
    _id: '4',
    name: 'Karavalli',
    cuisine: 'Coastal',
    rating: 4.8,
    deliveryTime: '40-50',
    minOrder: 500,
    image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    address: 'Residency Road, Bangalore',
    isVeg: false,
    isPopular: true,
  },
  {
    _id: '5',
    name: 'Brahmins\' Coffee Bar',
    cuisine: 'South Indian',
    rating: 4.6,
    deliveryTime: '20-30',
    minOrder: 100,
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    address: 'Shankarapuram, Bangalore',
    isVeg: true,
    isPopular: true,
  },
  {
    _id: '6',
    name: 'Truffles',
    cuisine: 'American',
    rating: 4.4,
    deliveryTime: '30-40',
    minOrder: 250,
    image: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    address: 'Indiranagar, Bangalore',
    isVeg: false,
    isPopular: true,
  },
];

const RestaurantList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { restaurants, isLoading, error } = useSelector((state) => state.restaurants);
  const [searchTerm, setSearchTerm] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [sortBy, setSortBy] = useState('rating');

  const cuisines = [
    'All',
    'Pizza',
    'Burger',
    'Sushi',
    'Indian',
    'Chinese',
    'Mexican',
    'Italian',
    'Thai',
  ];

  useEffect(() => {
    dispatch(getRestaurants({ search: searchTerm, cuisine, sort: sortBy }));
  }, [dispatch, searchTerm, cuisine, sortBy]);

  const handleRestaurantClick = (id) => {
    navigate(`/restaurant/${id}`);
  };

  const handleCuisineClick = (cuisine) => {
    setCuisine(cuisine === 'All' ? '' : cuisine);
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '60vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  const filteredRestaurants = [...sampleRestaurants, ...restaurants].filter((restaurant) =>
    restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    restaurant.cuisine.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Fade in timeout={1000}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            Discover Bangalore's Best Restaurants
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Explore the city's diverse culinary scene
          </Typography>
        </Box>
      </Fade>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Fade in timeout={1000} style={{ transitionDelay: '200ms' }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search restaurants or cuisines..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Fade>
        </Grid>
        <Grid item xs={12} md={3}>
          <Fade in timeout={1000} style={{ transitionDelay: '400ms' }}>
            <FormControl fullWidth>
              <InputLabel>Cuisine</InputLabel>
              <Select
                value={cuisine}
                label="Cuisine"
                onChange={(e) => setCuisine(e.target.value)}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="South Indian">South Indian</MenuItem>
                <MenuItem value="North Indian">North Indian</MenuItem>
                <MenuItem value="Chinese">Chinese</MenuItem>
                <MenuItem value="Continental">Continental</MenuItem>
                <MenuItem value="Coastal">Coastal</MenuItem>
                <MenuItem value="American">American</MenuItem>
              </Select>
            </FormControl>
          </Fade>
        </Grid>
        <Grid item xs={12} md={3}>
          <Fade in timeout={1000} style={{ transitionDelay: '600ms' }}>
            <FormControl fullWidth>
              <InputLabel>Sort By</InputLabel>
              <Select
                value={sortBy}
                label="Sort By"
                onChange={(e) => setSortBy(e.target.value)}
              >
                <MenuItem value="rating">Rating</MenuItem>
                <MenuItem value="deliveryTime">Delivery Time</MenuItem>
                <MenuItem value="minOrder">Minimum Order</MenuItem>
              </Select>
            </FormControl>
          </Fade>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {filteredRestaurants.map((restaurant, index) => (
          <Grid item xs={12} sm={6} md={4} key={restaurant._id}>
            <Grow in timeout={1000} style={{ transitionDelay: `${index * 100}ms` }}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4,
                    transition: 'all 0.3s ease-in-out',
                  },
                }}
                onClick={() => handleRestaurantClick(restaurant._id)}
              >
                <Box sx={{ position: 'relative' }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={restaurant.image}
                    alt={restaurant.name}
                  />
                  {restaurant.isPopular && (
                    <Chip
                      label="Popular"
                      color="primary"
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: 10,
                        right: 10,
                        backgroundColor: 'rgba(25, 118, 210, 0.9)',
                      }}
                    />
                  )}
                  {restaurant.isVeg && (
                    <Chip
                      label="Pure Veg"
                      color="success"
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: 10,
                        left: 10,
                        backgroundColor: 'rgba(46, 125, 50, 0.9)',
                      }}
                    />
                  )}
                </Box>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h6" component="div">
                    {restaurant.name}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Rating value={restaurant.rating} precision={0.5} readOnly size="small" />
                    <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                      ({restaurant.rating})
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {restaurant.cuisine}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <LocationIcon fontSize="small" color="action" sx={{ mr: 0.5 }} />
                    <Typography variant="body2" color="text.secondary">
                      {restaurant.address}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <TimeIcon fontSize="small" color="action" sx={{ mr: 0.5 }} />
                      <Typography variant="body2" color="text.secondary">
                        {restaurant.deliveryTime} mins
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      Min. ₹{restaurant.minOrder}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grow>
          </Grid>
        ))}
      </Grid>

      {/* No Results Message */}
      {filteredRestaurants.length === 0 && (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="h6" color="text.secondary">
            No restaurants found matching your criteria
          </Typography>
          <Button
            variant="outlined"
            sx={{ mt: 2 }}
            onClick={() => {
              setSearchTerm('');
              setCuisine('');
              setSortBy('rating');
            }}
          >
            Clear Filters
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default RestaurantList; 