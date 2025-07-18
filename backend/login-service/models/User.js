const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  phone: Number,
  password: String,
});

module.exports = mongoose.model('User', UserSchema);
