const path = require('path');

const express = require('express');

const shopControllers = require('../controller/products');

const router = express.Router();
//getIndex
router.get('/', shopControllers.getIndex);
//getProducts
router.get('/products', shopControllers.getProducts);
//getProduct (dynamic params)
router.get('/products/:productId', shopControllers.getDetail);
//getCart
router.get('/cart', shopControllers.getCart);
//postCart
router.post('/cart', shopControllers.postCart);
//postCart-Delete
router.post('/cart-delete', shopControllers.postCartDelete);
//CreateOrderPost
router.post('/create-order', shopControllers.postOrder);
//getCheckout
router.get('/checkout', shopControllers.getCheckout);
//orders
router.get('/orders',shopControllers.getOrders);

module.exports = router;
