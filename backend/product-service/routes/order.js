const express = require('express');
const { createOrder, getOrders } = require('../controllers/orderController');
const router = express.Router();

router.route('/order').post(createOrder)
router.route('/orders').get(getOrders)

module.exports = router;