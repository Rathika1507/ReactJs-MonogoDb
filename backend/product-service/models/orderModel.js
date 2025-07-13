const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  cartItems: Array,
  amount: String,
  status: String,
  email: String
}, {
  timestamps: true  // Adds createdAt and updatedAt automatically
});

module.exports = mongoose.model('Order', orderSchema);

