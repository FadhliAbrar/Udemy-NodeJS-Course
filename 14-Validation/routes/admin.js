const path = require("path");

const express = require("express");

const adminController = require("../controllers/admin");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

// /admin/add-product => GET
router.get("/add-product", isAuth.isNotLoggedIn, adminController.getAddProduct);

// /admin/products => GET
router.get("/products", isAuth.isNotLoggedIn, adminController.getProducts);

// /admin/add-product => POST
router.post(
  "/add-product",
  isAuth.isNotLoggedIn,
  adminController.postAddProduct
);

router.get(
  "/edit-product/:productId",
  isAuth.isNotLoggedIn,
  adminController.getEditProduct
);

router.post(
  "/edit-product",
  isAuth.isNotLoggedIn,
  adminController.postEditProduct
);

router.post(
  "/delete-product",
  isAuth.isNotLoggedIn,
  adminController.postDeleteProduct
);

module.exports = router;
