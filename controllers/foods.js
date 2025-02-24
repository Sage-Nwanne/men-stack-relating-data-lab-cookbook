const express = require('express');
const router = express.Router();
const User = require('../models/user.js');



// INDEX: show all pantry items
router.get('/', async (req, res) => {
    res.render('foods/index.ejs' , {User, pantry: User.pantry});
  });


//NEW: show form to add item

router.get('/new', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId)
        res.render('foods/new', {userId: req.params.userId});

    } catch(error) {
        console.log(error)
        res.redirect('/')
    }
});

//CREATE: Adding new food item with post route

router.post('/', async (req,res) => {
    try {
        const currentUser = await User.findById(req.params.userId); //finding the user
        currentUser.pantry.push(req.body) //pushing req body into currentUser's pantry
        await currentUser.save() //saving the changes made to the user

        res.redirect(`/users/${currentUser._id}/foods`) //redirecting to the page that displays the foods *not show*
    
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
});

// DELETE: remove food item
router.delete('/:itemId', async (req,res) => {
    try {
        const currentUser = await User.findById(req.params.userId);
        currentUser.pantry.id(req.params.itemId).deleteOne();
        await currentUser.save();
        res.redirect(`/users/${user._id}/foods`);
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
});

// EDIT: show edit form page

router.get('/:itemId/edit', async (req,res) => {
    try {
        const currentUser = await User.findById(req.params.userId);
        const food = currentUser.pantry.id(req.params.userId);
        res.render('foods/edit', {userId: user._id, food})
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
    
})

//UPDATE: Modify Existing  Item
router.put('/:itemId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        const food = user.pantry.id(req.params.itemId);
        food.set(req.body);
        await user.save();
        res.redirect(`/users/${user._id}/foods`);
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

//SHOW: Display specific food item

router.get(':itemId', async (req,res) => {
    try {
        const currentUser = await User.findById(req.params.userId);
        const food = currentUser.pantry.id(req.params.itemId);

        res.render('foods/show', {userId: user._id, food})
    } catch (error) {
        console.log(error)
    }
})




router.get('/foods', async (req, res) => { // ✅ Refers to '/users/:userId/foods/'
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).send("User not found");
        }
        res.render('foods/index', { user, pantry: user.pantry });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});


// const food = currentUser.foods.id(req.params.foodId) //finding the specific food item

module.exports = router;