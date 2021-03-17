const express = require("express");

const adminControllers = require("../controller/admin");
const { route } = require("./shop");

const router = express.Router();

// // /admin/add-product => GET
router.get("/add-product", adminControllers.getAddProducts);
// // /admin/add-product => POST
router.post("/add-product/", adminControllers.postAddProducts);
// // /admin/product => GET
router.get("/products", adminControllers.getProducts);
// // admin/delete-product
router.post("/delete-product", adminControllers.postDeleteProduct);
// // admin/edit-product/${productid}
router.get("/edit-product/:productId", adminControllers.getEditProducts);
// // post admin/edit-product
router.post("/edit-product", adminControllers.postEditProduct);

exports.routes = router;
