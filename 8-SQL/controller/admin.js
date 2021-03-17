const Product = require('../models/product');
//////////////ADD PRODUCT/////////////////////////////
exports.postAddProducts = (req, res, next) => {
    const title = req.body.title;
    const image = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const products = new Product(null, title, image, price, description);
    products.save()
    .then(()=> res.redirect('/'))
    .catch(err=> console.log(err));
    
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
  Product.findById(productID)
  .then(([rows, fieldData])=>{
    res.render('admin/edit-product',{
      pageTitle: "Edit Product",
      path: '/admin/edit-product',
      editing: editMode,
      product: rows,
    })
  })
  .catch(err => {
    console.log(err);
  });
  
}


exports.postEditProduct = (req, res, next)=>{
  const prodID = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedImage = req.body.imageUrl;
  const updatedPrice = req.body.price;
  const updatedDescription = req.body.description;
  const updatedProduct = new Product(prodID, updatedTitle, updatedImage, updatedPrice, updatedDescription);
  updatedProduct.updateData();
}
//////////////////////////////////////////////////////
exports.getProducts = (req,res,next)=>{
    Product.fetchAll()
    .then(([rows, dataField])=>{
      res.render('admin/products', {
        prods: rows,
        pageTitle: 'Admin Products',
        path: '/admin/products'
      });
    })
    .catch();
}

exports.postDeleteProduct = (req, res, next)=>{
  const prodID = req.body.productID;
  Product.deleteByID(prodID);
  res.redirect('/admin/products');
}