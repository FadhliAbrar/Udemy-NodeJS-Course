const Product = require("../models/product");
const { populate } = require("../models/user");
const User = require("../models/user");
const Order = require("../models/order");

exports.getIndex = (req, res, next) => {
  Product.find({}).then((product) => {
    res.render("shop/index.ejs", {
      prods: product,
      pageTitle: "Shop",
      path: "/",
    });
  });
};

exports.getProducts = (req, res, next) => {
  Product.find({}).then((product) => {
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
  req.user
    .populate("cart.items.productId")
    .execPopulate()
    .then((user) => {
      const product = user.cart.items;
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
  req.user.deleteCart(prodId);
};

exports.getOrders = (req, res, next) => {
  Order.find({ "user.userId": req.user._id }).then((result) => {
    res.render("shop/orders", {
      path: "/orders",
      pageTitle: "Your Orders",
      orders: result,
    });
  });
};

exports.postOrder = (req, res, next) => {
  req.user
    .populate("cart.items.productId")
    .execPopulate()
    .then((user) => {
      const products = user.cart.items.map((i) => {
        return { product: { ...i.productId._doc }, quantity: i.quantity };
      });
      console.log(products);
      const order = new Order({
        user: {
          username: req.user.username,
          userId: req.user._id,
        },
        products: products,
      });
      return order.save();
    })
    .then(() => {
      req.user.clearCart();
    })
    .then(() => {
      res.redirect("/orders");
    });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};
