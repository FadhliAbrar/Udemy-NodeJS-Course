const path = require('path');

const express = require('express');

const shopControllers = require('../controller/products');

const router = express.Router();
//getIndex
router.get('/', shopControllers.getIndex);
//getProduct
router.get('/products', shopControllers.getProducts);
//getCart
router.get('/cart', shopControllers.getCart);
//getCheckout
router.get('/checkout', shopControllers.getCheckout);
//orders
router.get('/orders',shopControllers.getOrders);

module.exports = router;
