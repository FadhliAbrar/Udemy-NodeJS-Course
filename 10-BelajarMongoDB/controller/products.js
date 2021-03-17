const Product = require("../models/product");
const Order = require("../models/order");
const User = require("../models/user");

exports.getIndex = (req, res, next) => {
  Product.fetchAll((product) => {
    res.render("shop/index.ejs", {
      prods: product,
      pageTitle: "Shop",
      path: "/",
    });
  });
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll((product) => {
    res.render("shop/product-list.ejs", {
      prods: product,
      pageTitle: "All Products",
      path: "/products",
      hasProducts: product.length > 0,
      activeShop: true,
      productCSS: true,
    });
  });
};

exports.getDetail = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then((product) => {
      res.render("shop/product-detail", {
        pageTitle: "Product Details",
        product: product,
        path: "/products",
      });
    })
    .catch();
};

exports.getCart = (req, res, next) => {
  req.user.getCartProduct().then((product) => {
    res.render("shop/cart", {
      path: "/cart",
      pageTitle: "Your Cart",
      products: product,
    });
  });
};

exports.postCart = (req, res, next) => {
  const prodID = req.body.productId;
  Product.findById(prodID)
    .then((product) => {
      return req.user.addToCart(product);
    })
    .then(() => {
      res.redirect("/cart");
    });
};

exports.postCartDelete = (req, res, next) => {
  const prodId = req.body.productId;
  console.log(prodId);
  req.user.deleteCart(prodId).then(() => res.redirect("/cart"));
};

exports.getOrders = (req, res, next) => {
  req.user
    .getOrder()
    .then((result) => {
      res.render("shop/orders", {
        path: "/orders",
        pageTitle: "Your Cart",
        orders: result,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postOrder = (req, res, next) => {
  req.user
    .addOrder()
    .then(() => res.redirect("/orders"))
    .catch((err) => {
      console.log(err);
    });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};
