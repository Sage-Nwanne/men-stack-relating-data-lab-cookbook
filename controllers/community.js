const express = require('express');
const router = express.Router();
const User = require('../models/user.js');




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

//viewing users pantry
router.get('/community/pantry/:userId', async (req, res) => {
    try {
      const user = await User.findById(req.params.userId).select('username pantry').lean();
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.render('pantry', { user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  });
  
//viewing specific food item
router.get('/users/:userId/foods/:foodId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).lean();

        if (!user) {
            return res.status(404).send("User not found");
        }

        // Find the specific food item inside the user's pantry
        const pantryItem = user.pantry.id(req.params.foodId);

        if (!pantryItem) {
            return res.status(404).send("Food item not found");
        }

        res.render('pantry', { user, pantry: pantryItem });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
