import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Grid,
  Typography,
  Box,
  Rating,
  Card,
  CardContent,
  CardMedia,
  Button,
  TextField,
  IconButton,
  Divider,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Paper,
  Chip,
} from '@mui/material';
import {
  LocationOn,
  AccessTime,
  AttachMoney,
  Add as AddIcon,
  Remove as RemoveIcon,
  ShoppingCart as ShoppingCartIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
} from '@mui/icons-material';
import { getRestaurantById, addReview } from '../features/restaurants/restaurantSlice';
import { addToCart, removeFromCart, updateQuantity, clearCart } from '../features/cart/cartSlice';
import { useCart } from '../hooks/useCart';
import { useRestaurants } from '../hooks/useRestaurants';
import { useAuth } from '../hooks/useAuth';

const RestaurantDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentRestaurant, isLoading, error } = useSelector((state) => state.restaurants);
  const { items, restaurant: cartRestaurant } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [quantityDialog, setQuantityDialog] = useState({
    open: false,
    item: null,
  });

  useEffect(() => {
    dispatch(getRestaurantById(id));
  }, [dispatch, id]);

  const handleAddToCart = (item) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (cartRestaurant && cartRestaurant._id !== currentRestaurant._id) {
      setQuantityDialog({ open: true, item });
      return;
    }

    dispatch(addToCart({ item, restaurant: currentRestaurant }));
  };

  const handleQuantityConfirm = () => {
    dispatch(clearCart());
    dispatch(addToCart({ item: quantityDialog.item, restaurant: currentRestaurant }));
    setQuantityDialog({ open: false, item: null });
  };

  const handleQuantityCancel = () => {
    setQuantityDialog({ open: false, item: null });
  };

  const handleUpdateQuantity = (itemId, change) => {
    const currentItem = items.find((item) => item._id === itemId);
    if (currentItem) {
      const newQuantity = currentItem.quantity + change;
      if (newQuantity > 0) {
        dispatch(updateQuantity({ itemId, quantity: newQuantity }));
      } else {
        dispatch(removeFromCart(itemId));
      }
    }
  };

  const getItemQuantity = (itemId) => {
    const item = items.find((item) => item._id === itemId);
    return item ? item.quantity : 0;
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

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (!currentRestaurant) {
    return null;
  }

  const categories = ['All', ...new Set(currentRestaurant.menu.map((item) => item.category))];

  const filteredMenu = selectedCategory === 'All'
    ? currentRestaurant.menu
    : currentRestaurant.menu.filter((item) => item.category === selectedCategory);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Restaurant Header */}
      <Card sx={{ mb: 4 }}>
        <CardMedia
          component="img"
          height="300"
          image={currentRestaurant.image || 'https://via.placeholder.com/1200x300'}
          alt={currentRestaurant.name}
        />
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {currentRestaurant.name}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Rating value={currentRestaurant.rating} precision={0.5} readOnly />
            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
              ({currentRestaurant.rating})
            </Typography>
          </Box>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            {currentRestaurant.cuisine}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {currentRestaurant.address}
          </Typography>
          <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Delivery Time: {currentRestaurant.deliveryTime} mins
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Min. Order: ${currentRestaurant.minOrder}
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* Menu Categories */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'contained' : 'outlined'}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </Box>
      </Box>

      {/* Menu Items */}
      <Grid container spacing={3}>
        {filteredMenu.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item._id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="200"
                image={item.image || 'https://via.placeholder.com/300x200'}
                alt={item.name}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="div">
                  {item.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {item.description}
                </Typography>
                <Typography variant="h6" color="primary" sx={{ mb: 2 }}>
                  ${item.price}
                </Typography>
                {getItemQuantity(item._id) > 0 ? (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <IconButton
                      size="small"
                      onClick={() => handleUpdateQuantity(item._id, -1)}
                    >
                      <RemoveIcon />
                    </IconButton>
                    <Typography>{getItemQuantity(item._id)}</Typography>
                    <IconButton
                      size="small"
                      onClick={() => handleUpdateQuantity(item._id, 1)}
                    >
                      <AddIcon />
                    </IconButton>
                  </Box>
                ) : (
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => handleAddToCart(item)}
                  >
                    Add to Cart
                  </Button>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Quantity Dialog */}
      <Dialog open={quantityDialog.open} onClose={handleQuantityCancel}>
        <DialogTitle>Clear Cart?</DialogTitle>
        <DialogContent>
          <Typography>
            Your cart contains items from another restaurant. Would you like to clear your cart and add items from this restaurant?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleQuantityCancel}>Cancel</Button>
          <Button onClick={handleQuantityConfirm} variant="contained">
            Clear Cart & Add Item
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default RestaurantDetail; 