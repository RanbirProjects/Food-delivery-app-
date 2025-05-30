import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  restaurant: null,
  total: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { item, restaurant } = action.payload;

      // If cart is empty or same restaurant, add item
      if (!state.restaurant || state.restaurant._id === restaurant._id) {
        const existingItem = state.items.find(
          (i) => i.menuItem === item.menuItem
        );

        if (existingItem) {
          existingItem.quantity += item.quantity;
        } else {
          state.items.push(item);
        }

        state.restaurant = restaurant;
        state.total = state.items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
      } else {
        // If different restaurant, clear cart and add new item
        state.items = [item];
        state.restaurant = restaurant;
        state.total = item.price * item.quantity;
      }
    },
    removeFromCart: (state, action) => {
      const itemId = action.payload;
      state.items = state.items.filter((item) => item.menuItem !== itemId);
      state.total = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      if (state.items.length === 0) {
        state.restaurant = null;
      }
    },
    updateQuantity: (state, action) => {
      const { itemId, quantity } = action.payload;
      const item = state.items.find((i) => i.menuItem === itemId);

      if (item) {
        item.quantity = quantity;
        state.total = state.items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.restaurant = null;
      state.total = 0;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer; 