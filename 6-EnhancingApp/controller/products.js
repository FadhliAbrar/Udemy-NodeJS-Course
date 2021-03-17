const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
    Product.fetchAll(products =>{
      console.log(products);
        res.render('shop/product-list.ejs', {
            prods: products,
            pageTitle: 'All Products',
            path: '/products',
            hasProducts: products.length > 0,
            activeShop: true,
            productCSS: true
          });
    });
  };

exports.getIndex = (req, res, next) => {
    Product.fetchAll(products =>{
        res.render('shop/index.ejs', {
            prods: products,
            pageTitle: 'Shop',
            path: '/'
          });
    });
  };

exports.getCart = (req,res,next)=>{
    res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        namaProduk: req.body.title
    });
};

exports.getOrders = (req, res, next)=>{
  res.render('shop/orders',{
    path: '/orders',
    pageTitle: 'Your Cart',
    namaProduk: req.body.title
});
}

exports.getCheckout = (req,res,next)=>{
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout',
  })
}
