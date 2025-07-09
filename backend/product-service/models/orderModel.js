const mongoose = require('mongoose');

 const orderSchema = new mongoose.Schema({
    cartItems: Array,
    amount: String,
    status: String,
    createdAt: Date,
    email: String
})


module.exports = mongoose.model('Order', orderSchema);

