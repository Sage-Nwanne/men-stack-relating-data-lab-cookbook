const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET all users' pantries 
router.get('/community', async (req, res) => {
  try {
    const users = await User.find().select('username pantry').lean();
    res.render('community', { users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// GET specific user's pantry by username
router.get('/community/pantry/:username', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username })
      .select('username pantry')
      .lean();

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.render('pantry', { user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
