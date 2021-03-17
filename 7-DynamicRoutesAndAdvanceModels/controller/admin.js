const Product = require('../models/product');
//////////////ADD PRODUCT/////////////////////////////
exports.postAddProducts = (req, res, next) => {
    const title = req.body.title;
    const image = req.body.image;
    const price = req.body.price;
    const description = req.body.description;
    const products = new Product(null, title, image, price, description);
    products.save();
    res.redirect('/');
};

exports.getAddProducts = (req, res, next) => {
    res.render('admin/edit-product.ejs', {
      pageTitle: 'Add Product',
      path: '/admin/add-product',
      editing: false,
      formsCSS: true,
      productCSS: true,
      activeAddProduct: true
  });
}
////////////////////////////////////////////////////////
///////////////////EDIT PRODUCT/////////////////////////
exports.getEditProducts = (req, res, next) => {
  const editMode = req.query.edit;
  if(!editMode){
    return res.redirect('/');
  }
  const productID = req.params.productId;
  Product.findById(productID, product=>{
    res.render('admin/edit-product',{
      pageTitle: "Edit Product",
      path: '/admin/edit-product',
      editing: editMode,
      product: product,
    })
  })
}

exports.postEditProduct = (req, res, next)=>{
  const prodID = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedImage = req.body.image;
  const updatedPrice = req.body.price;
  const updatedDescription = req.body.description;
  const updatedProduct = new Product(prodID, updatedTitle, updatedImage, updatedPrice, updatedDescription);
  updatedProduct.save();
  res.redirect('/admin/products');
}
//////////////////////////////////////////////////////
exports.getProducts = (req,res,next)=>{
    Product.fetchAll(products =>{
        res.render('admin/products', {
            prods: products,
            pageTitle: 'Admin Products',
            path: '/admin/products'
          });
    });
}

exports.postDeleteProduct = (req, res, next)=>{
  const prodID = req.body.productID;
  Product.deleteByID(prodID);
  res.redirect('/admin/products');
}