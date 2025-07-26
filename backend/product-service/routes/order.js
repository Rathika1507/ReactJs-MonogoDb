const express = require('express');
const {  createOrder,  getOrders,  getAllOrders,  updateOrderStatus} = require('../controllers/orderController');

const router = express.Router();

// Create order
router.route('/order').post(createOrder);

// Get orders by email (user)
router.route('/orders').get(getOrders);

// Get all orders (admin)
router.route('/getAllOrders').get(getAllOrders);

// Update status of an order by ID
router.route('/order/:id/status').put(updateOrderStatus);

module.exports = router;
