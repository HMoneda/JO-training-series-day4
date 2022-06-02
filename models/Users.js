const mongoose = require('mongoose');

// Define User Schema
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 8,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

// Export Model
const User = mongoose.model('User', UserSchema);
module.exports = User;
