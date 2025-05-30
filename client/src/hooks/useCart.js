import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
} from '../features/cart/cartSlice';

const useCart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, restaurant, total } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleAddToCart = (item, restaurantData) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (restaurant && restaurant._id !== restaurantData._id) {
      return {
        shouldShowDialog: true,
        item,
        restaurant: restaurantData,
      };
    }

    dispatch(addToCart({ item, restaurant: restaurantData }));
    return { shouldShowDialog: false };
  };

  const handleRemoveFromCart = (itemId) => {
    dispatch(removeFromCart(itemId));
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

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    navigate('/checkout');
  };

  const getItemQuantity = (itemId) => {
    const item = items.find((item) => item._id === itemId);
    return item ? item.quantity : 0;
  };

  const getCartTotal = () => {
    return total + 5; // Including delivery fee
  };

  return {
    items,
    restaurant,
    total,
    addToCart: handleAddToCart,
    removeFromCart: handleRemoveFromCart,
    updateQuantity: handleUpdateQuantity,
    clearCart: handleClearCart,
    checkout: handleCheckout,
    getItemQuantity,
    getCartTotal,
  };
};

export default useCart; 