const mongoose = require('mongoose');

const Schema = mongoose.Schema; 
// info we are going to store about users in sign up
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 5
  },
}, {
  timestamps: true,
});

// allows us to search and save users
const User = mongoose.model('User', userSchema);

module.exports = User;