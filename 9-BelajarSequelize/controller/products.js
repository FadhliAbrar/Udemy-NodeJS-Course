const Product = require('../models/product');
const Order = require('../models/order');

exports.getIndex = (req, res, next) => {
    Product.findAll()
    .then((rows, fieldData)=>{
      res.render('shop/index.ejs', {
        prods: rows,
        pageTitle: 'Shop',
        path: '/'
      });
    })
    .catch(err=>{
      console.log(err);
    });
  };

exports.getProducts = (req, res, next) => {
    Product.findAll().then((rows, fieldData) =>{
      console.log(rows);
        res.render('shop/product-list.ejs', {
          prods: rows,
          pageTitle: 'All Products',
          path: '/products',
          hasProducts: rows.length > 0,
          activeShop: true,
          productCSS: true
        });
      })
       .catch();
  };

exports.getDetail = (req, res, next)=>{
  const prodId = req.params.productId;
  Product.findAll({
    where: {
      id: prodId
    }
  })
  .then(([rows, fieldData])=>{
      res.render('shop/product-detail', {
      pageTitle : "Product Details",
      product: rows,
      path : '/products'
    })
  })
  .catch();
};



exports.getCart = (req,res,next)=>{
  req.user.getCart()
          .then(cart => cart
                        .getProducts()
                        .then(products => 
                          res.render('shop/cart', {
                            path: '/cart',
                            pageTitle: 'Your Cart',
                            products: products,
                        })
                        ).catch(err=> console.log(err))
                ).catch(err=> console.log(err))
};

exports.postCart = (req, res, next)=>{
  const prodID = req.body.productId;
  let fetchedCart;
  let newQuantity = 1;
  req.user
    .getCart()
    .then(cart =>{
      fetchedCart = cart;
      return cart.getProducts({where:{id: prodID}});
    })
    .then(products =>{
      let product;
      if(products.length > 0){
        product = products[0];
      }
      if(product){
        const oldQuantity = product.CartItem.quantity;
        newQuantity = oldQuantity + 1;
        return product;
      }
      return Product.findByPk(prodID)
    })
    .then(product=> {
      return fetchedCart.addProduct(product, {
        through: {quantity: newQuantity}
      });
    })
    .then(()=> res.redirect('/cart'))
    .catch(err=> console.log(err))
};

exports.postCartDelete = (req, res, next)=>{
  const prodId = req.body.productID;
  req.user.getCart()
  .then(cart=>{
    return cart.getProducts({
      where: {id: prodId}
    });
  })
  .then(products =>{
    return products[0].CartItem.destroy();
  })
  .then(()=> res.redirect('/cart'))
  .catch(err=> console.log(err));
};

exports.getOrders = (req, res, next)=>{
  res.render('shop/orders',{
    path: '/orders',
    pageTitle: 'Your Cart',
    namaProduk: req.body.title
});
};

exports.postOrder = (req, res, next)=>{
  req.user
    .getCart()
    .then(cart=>{
      return cart.getProducts();
    })
    .then(result => console.log(result))
    .catch(err=> console.log(err))
};

exports.getCheckout = (req,res,next)=>{
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout',
  });
};
