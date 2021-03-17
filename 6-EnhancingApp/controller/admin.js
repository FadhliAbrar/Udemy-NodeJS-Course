const Product = require('../models/product');

exports.postAddProducts = (req, res, next) => {
    const title = req.body.title;
    const image = req.body.image;
    const price = req.body.price;
    const description = req.body.description;
    const products = new Product(title, image, price, description);
    products.save();
    res.redirect('/');
};

exports.getAddProducts = (req, res, next) => {
    res.render('admin/add-product.ejs', {
      pageTitle: 'Add Product',
      path: '/admin/add-product',
      formsCSS: true,
      productCSS: true,
      activeAddProduct: true
  });
}

exports.getProducts = (req,res,next)=>{
    Product.fetchAll(products =>{
        res.render('admin/products', {
            prods: products,
            pageTitle: 'Admin Products',
            path: '/admin/products'
          });
    });
}