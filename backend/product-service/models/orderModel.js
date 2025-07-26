const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  cartItems: Array,
  amount: String,
  status: {
    type: String,
    enum: ['pending', 'dispatched', 'delivered'],
    default: 'pending'
  },
  email: String
}, {
  timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);
