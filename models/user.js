const mongoose = require('mongoose');



const foodSchema = new mongoose.Schema({
  name :{type: String,  required: true,}, 

  type : { type: String, enum: ['fruit', 'vegetable', 'meat', 'carb', 'other'], required: true, },

  description: { type: String, maxlength: 150 }

})





const users = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  pantry:[foodSchema]
});


const User = mongoose.model('User', users);

module.exports = User;


// sign in sign up, nav bar, index,show,new,