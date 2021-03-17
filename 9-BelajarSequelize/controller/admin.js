const Product = require('../models/product');
//////////////ADD PRODUCT/////////////////////////////
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
exports.postAddProducts = (req, res, next) => {
    const title = req.body.title;
    const image = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    req.user.createProduct({
      title: title,
      imageUrl: image,
      price: price,
      description: description,
    })
    .then(result=> {
      res.redirect('/admin/products');
    })
      .catch();
    
};

////////////////////////////////////////////////////////
///////////////////EDIT PRODUCT/////////////////////////
exports.getEditProducts = (req, res, next) => {
  const editMode = req.query.edit;
  if(!editMode){
    return res.redirect('/');
  }
  const productID = req.params.productId;
  Product.findByPk(productID)
  .then(product=>{
    if(!product){
      return res.redirect('add-product');
    }
    res.render('admin/edit-product',{
      pageTitle: "Edit Product",
      path: '/admin/edit-product',
      editing: editMode,
      product: product,
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
  Product.update({
    title: updatedTitle,
    imageUrl: updatedImage,
    price: updatedPrice,
    description: updatedDescription
  }, {
    where: {
      id: prodID
    }
  })
  res.redirect('products');
}
//////////////////////////////////////////////////////
exports.getProducts = (req,res,next)=>{
    Product.findAll()
    .then((rows, fieldData)=>{
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
  Product.destroy({
    where: {
      id: prodID
    }
  }).then(()=>{res.redirect('/admin/products');} )
  
}