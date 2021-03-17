const express = require('express');

const adminControllers = require('../controller/admin');

const router = express.Router();



// /admin/add-product => GET
router.get('/add-product', adminControllers.getAddProducts);
// /admin/product => GET
router.get('/products', adminControllers.getProducts);
// /admin/add-product => POST
router.post('/add-product', adminControllers.postAddProducts);

exports.routes = router;
