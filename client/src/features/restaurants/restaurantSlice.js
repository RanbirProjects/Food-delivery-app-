import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Get all restaurants
export const getRestaurants = createAsyncThunk(
  'restaurants/getAll',
  async (filters, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams();
      if (filters?.cuisine) params.append('cuisine', filters.cuisine);
      if (filters?.rating) params.append('rating', filters.rating);
      if (filters?.search) params.append('search', filters.search);
      if (filters?.sort) params.append('sort', filters.sort);

      const response = await axios.get(`${API_URL}/restaurants?${params}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Get restaurant by ID
export const getRestaurantById = createAsyncThunk(
  'restaurants/getById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/restaurants/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Add review
export const addReview = createAsyncThunk(
  'restaurants/addReview',
  async ({ restaurantId, review }, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const config = {
        headers: {
          Authorization: `Bearer ${auth.user.token}`,
        },
      };
      const response = await axios.post(
        `${API_URL}/restaurants/${restaurantId}/reviews`,
        review,
        config
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Get favorites
export const getFavorites = createAsyncThunk(
  'restaurants/getFavorites',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const config = {
        headers: {
          Authorization: `Bearer ${auth.user.token}`,
        },
      };
      const response = await axios.get(`${API_URL}/users/favorites`, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Add to favorites
export const addFavorite = createAsyncThunk(
  'restaurants/addFavorite',
  async (restaurantId, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const config = {
        headers: {
          Authorization: `Bearer ${auth.user.token}`,
        },
      };
      const response = await axios.post(
        `${API_URL}/users/favorites/${restaurantId}`,
        {},
        config
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Remove from favorites
export const removeFavorite = createAsyncThunk(
  'restaurants/removeFavorite',
  async (restaurantId, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const config = {
        headers: {
          Authorization: `Bearer ${auth.user.token}`,
        },
      };
      const response = await axios.delete(
        `${API_URL}/users/favorites/${restaurantId}`,
        config
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  restaurants: [],
  currentRestaurant: null,
  favorites: [],
  isLoading: false,
  error: null,
};

const restaurantSlice = createSlice({
  name: 'restaurants',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentRestaurant: (state) => {
      state.currentRestaurant = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get all restaurants
      .addCase(getRestaurants.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getRestaurants.fulfilled, (state, action) => {
        state.isLoading = false;
        state.restaurants = action.payload;
      })
      .addCase(getRestaurants.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || 'Failed to fetch restaurants';
      })
      // Get restaurant by ID
      .addCase(getRestaurantById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getRestaurantById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentRestaurant = action.payload;
      })
      .addCase(getRestaurantById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || 'Failed to fetch restaurant';
      })
      // Add review
      .addCase(addReview.fulfilled, (state, action) => {
        if (state.currentRestaurant) {
          state.currentRestaurant.reviews.push(action.payload);
          // Update average rating
          const totalRating = state.currentRestaurant.reviews.reduce(
            (sum, review) => sum + review.rating,
            0
          );
          state.currentRestaurant.rating = totalRating / state.currentRestaurant.reviews.length;
        }
      })
      // Get favorites
      .addCase(getFavorites.fulfilled, (state, action) => {
        state.favorites = action.payload;
      })
      // Add favorite
      .addCase(addFavorite.fulfilled, (state, action) => {
        state.favorites = action.payload;
      })
      // Remove favorite
      .addCase(removeFavorite.fulfilled, (state, action) => {
        state.favorites = action.payload;
      });
  },
});

export const { clearError, clearCurrentRestaurant } = restaurantSlice.actions;
export default restaurantSlice.reducer; 