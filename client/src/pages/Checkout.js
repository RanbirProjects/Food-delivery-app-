import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Divider,
  Alert,
  CircularProgress,
} from '@mui/material';
import { createOrder } from '../features/orders/orderSlice';
import { clearCart } from '../features/cart/cartSlice';

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items, restaurant, total } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const { isLoading, error } = useSelector((state) => state.orders);

  const [formData, setFormData] = useState({
    deliveryAddress: user?.address || '',
    phone: user?.phone || '',
    paymentMethod: 'cash',
    specialInstructions: '',
    saveAddress: false,
  });

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'saveAddress' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const orderData = {
      restaurant: restaurant._id,
      items: items.map((item) => ({
        menuItem: item._id,
        quantity: item.quantity,
        price: item.price,
      })),
      deliveryAddress: formData.deliveryAddress,
      phone: formData.phone,
      paymentMethod: formData.paymentMethod,
      specialInstructions: formData.specialInstructions,
      total: total + 5, // Including delivery fee
    };

    const result = await dispatch(createOrder(orderData));
    if (result.meta.requestStatus === 'fulfilled') {
      dispatch(clearCart());
      navigate('/orders');
    }
  };

  if (items.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            Your cart is empty
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate('/restaurants')}
            sx={{ mt: 2 }}
          >
            Browse Restaurants
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Checkout
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* Order Details */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Order Details
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                {restaurant.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {restaurant.address}
              </Typography>
              <Divider sx={{ my: 2 }} />

              {items.map((item) => (
                <Box key={item._id} sx={{ mb: 2 }}>
                  <Grid container justifyContent="space-between">
                    <Grid item>
                      <Typography>
                        {item.name} x {item.quantity}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography>
                        ${(item.price * item.quantity).toFixed(2)}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              ))}

              <Divider sx={{ my: 2 }} />
              <Grid container justifyContent="space-between">
                <Grid item>
                  <Typography>Subtotal</Typography>
                </Grid>
                <Grid item>
                  <Typography>${total.toFixed(2)}</Typography>
                </Grid>
              </Grid>
              <Grid container justifyContent="space-between" sx={{ mt: 1 }}>
                <Grid item>
                  <Typography>Delivery Fee</Typography>
                </Grid>
                <Grid item>
                  <Typography>$5.00</Typography>
                </Grid>
              </Grid>
              <Divider sx={{ my: 2 }} />
              <Grid container justifyContent="space-between">
                <Grid item>
                  <Typography variant="h6">Total</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h6">
                    ${(total + 5).toFixed(2)}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Delivery & Payment Form */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Delivery & Payment
              </Typography>
              <Box component="form" onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="Delivery Address"
                  name="deliveryAddress"
                  value={formData.deliveryAddress}
                  onChange={handleChange}
                  required
                  multiline
                  rows={3}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Special Instructions"
                  name="specialInstructions"
                  value={formData.specialInstructions}
                  onChange={handleChange}
                  multiline
                  rows={2}
                  sx={{ mb: 2 }}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="saveAddress"
                      checked={formData.saveAddress}
                      onChange={handleChange}
                    />
                  }
                  label="Save delivery address for future orders"
                  sx={{ mb: 2 }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  size="large"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    'Place Order'
                  )}
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Checkout; 