const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
    Product.fetchAll(products =>{
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

exports.getProduct = (req, res, next)=>{
  const prodId = req.params.productId;
  Product.findById(prodId, product=>{
    res.render('shop/product-detail', {
      pageTitle : "Product Details",
      product: product,
      path : '/products'
    })
  })
}

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
  Cart.getCart(cart=>{
    Product.fetchAll(products => {
      const cartProduct = [];
      for(product of products){
        const findCartProduct = cart.product.find(prod => prod.id === product.id);
        if(findCartProduct){
          cartProduct.push({productData: product, qty: findCartProduct.qty});
        }
      }
      res.render('shop/cart', {
          path: '/cart',
          pageTitle: 'Your Cart',
          products: cartProduct,
      });
    })
  })
};

exports.postCart = (req, res, next)=>{
  const prodID = req.body.productID;
  Product.findById(prodID, product=>{
    Cart.addProduct(prodID, product.price);
  });
  res.redirect('/cart');
}

exports.postCartDelete = (req, res, next)=>{
  const prodId = req.body.productID;
  const prodPrice = req.body.productPrice;
  Cart.deleteCart(prodId, prodPrice);
  res.redirect('/cart');
}

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
