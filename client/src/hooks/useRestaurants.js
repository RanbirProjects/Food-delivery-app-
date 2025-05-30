import { useSelector, useDispatch } from 'react-redux';
import {
  getRestaurants,
  getRestaurantById,
  addFavorite,
  removeFavorite,
  getFavorites,
} from '../features/restaurants/restaurantSlice';

const useRestaurants = () => {
  const dispatch = useDispatch();
  const {
    restaurants,
    currentRestaurant,
    favorites,
    isLoading,
    error,
  } = useSelector((state) => state.restaurants);

  const handleGetRestaurants = (filters = {}) => {
    return dispatch(getRestaurants(filters));
  };

  const handleGetRestaurantById = (id) => {
    return dispatch(getRestaurantById(id));
  };

  const handleAddFavorite = (restaurantId) => {
    return dispatch(addFavorite(restaurantId));
  };

  const handleRemoveFavorite = (restaurantId) => {
    return dispatch(removeFavorite(restaurantId));
  };

  const handleGetFavorites = () => {
    return dispatch(getFavorites());
  };

  const isFavorite = (restaurantId) => {
    return favorites.some((fav) => fav._id === restaurantId);
  };

  const getFilteredRestaurants = (filters = {}) => {
    let filtered = [...restaurants];

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        (restaurant) =>
          restaurant.name.toLowerCase().includes(searchLower) ||
          restaurant.cuisine.toLowerCase().includes(searchLower)
      );
    }

    if (filters.cuisine) {
      filtered = filtered.filter(
        (restaurant) => restaurant.cuisine === filters.cuisine
      );
    }

    if (filters.sort) {
      switch (filters.sort) {
        case 'rating':
          filtered.sort((a, b) => b.rating - a.rating);
          break;
        case 'name':
          filtered.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'price':
          filtered.sort((a, b) => a.minOrder - b.minOrder);
          break;
        default:
          break;
      }
    }

    return filtered;
  };

  return {
    restaurants,
    currentRestaurant,
    favorites,
    isLoading,
    error,
    getRestaurants: handleGetRestaurants,
    getRestaurantById: handleGetRestaurantById,
    addFavorite: handleAddFavorite,
    removeFavorite: handleRemoveFavorite,
    getFavorites: handleGetFavorites,
    isFavorite,
    getFilteredRestaurants,
  };
};

export default useRestaurants; 