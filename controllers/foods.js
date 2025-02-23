const express = require('express');
const router = express.Router();

const User = require('../models/user.js');




router.get('/', (req, res) => {
    res.render('foods/index.ejs');
  });
  
router.get('/users/:userId/foods/new', async (req,res) => {
    res.render('/foods/new.ejs')
})

router.post('/users/:userId/foods/new', async (req,res) => {
    try {
        const currentUser = await User.findById(req.session.user._id); //finding the user
        const food = currentUser.foods.id(req.params.foodId) //finding the specific food item

        food.set(req.body) //setting the food document to the current req.body
        await currentUser.save() //saving the changes made to the user
        res.redirect(`/users/${currentUser._id}/foods/${req.params.foodId}`) //redirecting to the page that displays item
    
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
})




module.exports = router;