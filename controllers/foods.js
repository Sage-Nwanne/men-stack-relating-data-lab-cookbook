const express = require('express');
const router = express.Router();
const User = require('../models/user.js');



// INDEX: show all pantry items
router.get('/', async (req, res) => {
    const user = await User.findById(req.session.user._id)
    res.render('foods/index.ejs' , {user:user , pantry:user.pantry});
  });


//NEW: show form to add item

router.get('/new', async (req, res) => {
    try {
        const user = await User.findById(req.session.user._id)
        res.render('foods/new', {userId: req.params.userId});

    } catch(error) {
        console.log(error)
        res.redirect('/')
    }
});

//CREATE: Adding new food item with post route

router.post('/', async (req,res) => {
    try {
        const currentUser = await User.findById(req.session.user._id); //finding the user
        currentUser.pantry.push(req.body) //pushing req body into currentUser's pantry
        await currentUser.save() //saving the changes made to the user

        res.redirect(`/users/${currentUser._id}/foods`) //redirecting to the page that displays the foods *not show*
    
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
});


//SHOW: Display specific food item ======== works ============

router.get('/:foodId', async (req,res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const food = currentUser.pantry.id(req.params.foodId);

        res.render('foods/show.ejs', {pantry: food })
    } catch (error) {
        console.log(error)
    }
})



// EDIT: show edit form page

router.get('/:foodId/edit', async (req,res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const food = currentUser.pantry.id(req.params.foodId);
        res.render('foods/edit.ejs', { user: currentUser , pantry: food })
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
    
})


//UPDATE: Modify Existing  Item
router.put('/:foodId', async (req, res) => {
    try {
        const user = await User.findById(req.session.user._id);
        const food = user.pantry.id(req.params.foodId);
        food.set(req.body);
        await user.save();

        res.redirect(`/users/${user._id}/foods/${req.params.foodId}`);
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});




// DELETE: remove food item
router.delete('/:foodId', async (req,res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
       
        currentUser.pantry.id(req.params.foodId).deleteOne();  //'cannot read properties of null (deleteOne)302,304
        await currentUser.save();


        res.redirect(`/users/${currentUser._id}/foods`);
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
});







// const food = currentUser.foods.id(req.params.foodId) //finding the specific food item

module.exports = router;