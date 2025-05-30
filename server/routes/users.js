const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth');

// Get user profile
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .select('-password')
      .populate('favorites', 'name cuisine rating');

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile', error: error.message });
  }
});

// Update user profile
router.put('/profile', auth, async (req, res) => {
  try {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'phone', 'address'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
      return res.status(400).json({ message: 'Invalid updates' });
    }

    updates.forEach(update => req.user[update] = req.body[update]);
    await req.user.save();

    res.json(req.user);
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile', error: error.message });
  }
});

// Add restaurant to favorites
router.post('/favorites/:restaurantId', auth, async (req, res) => {
  try {
    const restaurantId = req.params.restaurantId;
    
    if (req.user.favorites.includes(restaurantId)) {
      return res.status(400).json({ message: 'Restaurant already in favorites' });
    }

    req.user.favorites.push(restaurantId);
    await req.user.save();

    res.json(req.user.favorites);
  } catch (error) {
    res.status(500).json({ message: 'Error adding to favorites', error: error.message });
  }
});

// Remove restaurant from favorites
router.delete('/favorites/:restaurantId', auth, async (req, res) => {
  try {
    const restaurantId = req.params.restaurantId;
    
    req.user.favorites = req.user.favorites.filter(
      id => id.toString() !== restaurantId
    );
    
    await req.user.save();
    res.json(req.user.favorites);
  } catch (error) {
    res.status(500).json({ message: 'Error removing from favorites', error: error.message });
  }
});

// Get user's favorite restaurants
router.get('/favorites', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('favorites', 'name cuisine rating images');

    res.json(user.favorites);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching favorites', error: error.message });
  }
});

// Get user's order history
router.get('/orders', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate({
        path: 'orders',
        populate: {
          path: 'restaurant',
          select: 'name cuisine rating'
        }
      });

    res.json(user.orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching order history', error: error.message });
  }
});

module.exports = router; 