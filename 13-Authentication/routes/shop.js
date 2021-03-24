const path = require("path");

const express = require("express");

const shopController = require("../controllers/shop");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.get("/", shopController.getIndex);

router.get("/products", shopController.getProducts);

router.get("/products/:productId", shopController.getProduct);

router.get("/cart", isAuth.isNotLoggedIn, shopController.getCart);

router.post("/cart", isAuth.isNotLoggedIn, shopController.postCart);

router.post(
  "/cart-delete-item",
  isAuth.isNotLoggedIn,
  shopController.postCartDeleteProduct
);

router.post("/create-order", isAuth.isNotLoggedIn, shopController.postOrder);

router.get("/orders", isAuth.isNotLoggedIn, shopController.getOrders);

module.exports = router;
