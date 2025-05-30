import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  getOrders,
  getOrderById,
  createOrder,
  cancelOrder,
} from '../features/orders/orderSlice';

const useOrders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orders, currentOrder, isLoading, error } = useSelector(
    (state) => state.orders
  );

  const handleGetOrders = () => {
    return dispatch(getOrders());
  };

  const handleGetOrderById = (id) => {
    return dispatch(getOrderById(id));
  };

  const handleCreateOrder = async (orderData) => {
    try {
      const result = await dispatch(createOrder(orderData));
      if (result.meta.requestStatus === 'fulfilled') {
        navigate(`/orders/${result.payload._id}`);
      }
      return result;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  };

  const handleCancelOrder = (orderId) => {
    return dispatch(cancelOrder(orderId));
  };

  const getOrderStatus = (order) => {
    if (order.status === 'cancelled') return 'Cancelled';
    if (order.status === 'delivered') return 'Delivered';
    if (order.status === 'preparing') return 'Preparing';
    if (order.status === 'on_the_way') return 'On the way';
    return 'Pending';
  };

  const getOrderStatusColor = (order) => {
    switch (order.status) {
      case 'cancelled':
        return 'error';
      case 'delivered':
        return 'success';
      case 'preparing':
        return 'warning';
      case 'on_the_way':
        return 'info';
      default:
        return 'default';
    }
  };

  const getOrderTotal = (order) => {
    return order.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const getOrderItems = (order) => {
    return order.items.map((item) => ({
      ...item,
      total: item.price * item.quantity,
    }));
  };

  return {
    orders,
    currentOrder,
    isLoading,
    error,
    getOrders: handleGetOrders,
    getOrderById: handleGetOrderById,
    createOrder: handleCreateOrder,
    cancelOrder: handleCancelOrder,
    getOrderStatus,
    getOrderStatusColor,
    getOrderTotal,
    getOrderItems,
  };
};

export default useOrders; 