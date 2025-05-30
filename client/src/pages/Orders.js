import React, { useEffect } from 'react';
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
  Chip,
  Divider,
  CircularProgress,
  Alert,
} from '@mui/material';
import { getOrders } from '../features/orders/orderSlice';

const OrderStatus = ({ status }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'warning';
      case 'preparing':
        return 'info';
      case 'out_for_delivery':
        return 'primary';
      case 'delivered':
        return 'success';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'preparing':
        return 'Preparing';
      case 'out_for_delivery':
        return 'Out for Delivery';
      case 'delivered':
        return 'Delivered';
      case 'cancelled':
        return 'Cancelled';
      default:
        return status;
    }
  };

  return (
    <Chip
      label={getStatusLabel(status)}
      color={getStatusColor(status)}
      size="small"
    />
  );
};

const Orders = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { orders, isLoading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

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

  if (orders.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            No orders found
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
        Your Orders
      </Typography>

      <Grid container spacing={3}>
        {orders.map((order) => (
          <Grid item xs={12} key={order._id}>
            <Card>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom>
                      {order.restaurant.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Order ID: {order._id}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Placed on: {new Date(order.createdAt).toLocaleString()}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <OrderStatus status={order.status} />
                    </Box>
                  </Grid>
                </Grid>

                <Divider sx={{ my: 2 }} />

                <Grid container spacing={2}>
                  <Grid item xs={12} md={8}>
                    {order.items.map((item) => (
                      <Box key={item._id} sx={{ mb: 1 }}>
                        <Grid container justifyContent="space-between">
                          <Grid item>
                            <Typography>
                              {item.menuItem.name} x {item.quantity}
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
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Box sx={{ textAlign: 'right' }}>
                      <Typography variant="body2" gutterBottom>
                        Delivery Address:
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        {order.deliveryAddress}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        Phone: {order.phone}
                      </Typography>
                      {order.specialInstructions && (
                        <>
                          <Typography variant="body2" gutterBottom>
                            Special Instructions:
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {order.specialInstructions}
                          </Typography>
                        </>
                      )}
                    </Box>
                  </Grid>
                </Grid>

                <Divider sx={{ my: 2 }} />

                <Grid container justifyContent="space-between">
                  <Grid item>
                    <Typography variant="subtitle1">Total Amount</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1">
                      ${order.total.toFixed(2)}
                    </Typography>
                  </Grid>
                </Grid>

                {order.status === 'delivered' && (
                  <Box sx={{ mt: 2, textAlign: 'right' }}>
                    <Button
                      variant="outlined"
                      onClick={() => navigate(`/restaurant/${order.restaurant._id}`)}
                    >
                      Order Again
                    </Button>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Orders; 