const express = require('express');
const { getproducts, getSingleProduct } = require('../controllers/productController');
const router = express.Router();

router.route('/products').get(getproducts);
router.route('/product/:id').get(getSingleProduct);

module.exports=router;