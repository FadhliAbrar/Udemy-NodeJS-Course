const Product = require("../models/product");
const mongodb = require("mongodb");
const ObjectId = mongodb.ObjectId;
//////////////ADD PRODUCT/////////////////////////////
exports.getAddProducts = (req, res, next) => {
  res.render("admin/edit-product.ejs", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
  });
};
exports.postAddProducts = (req, res, next) => {
  const title = req.body.title;
  const image = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const addProduct = new Product({
    title: title,
    imageUrl: image,
    price: price,
    description: description,
    userId: req.user,
  });
  addProduct.save();
  res.redirect("/admin/products");
};

//////////////////////Get Product////////////////////////////////
exports.getProducts = (req, res, next) => {
  Product.find({})
    .then((products) => {
      res.render("admin/products", {
        prods: products,
        pageTitle: "Admin Products",
        path: "/admin/products",
      });
    })
    .catch((err) => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
  const prodID = req.body.productID;
  Product.findByIdAndDelete(prodID)
    .then(() => {
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};

////////////////////////////////////////////////////////
///////////////////EDIT PRODUCT/////////////////////////
exports.getEditProducts = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const productID = req.params.productId;
  Product.findById(productID)
    .then((product) => {
      if (!product) {
        return res.redirect("add-product");
      }
      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        product: product,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postEditProduct = (req, res, next) => {
  const prodID = req.body.productId;
  const title = req.body.title;
  const image = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  Product.findById(prodID)
    .then((product) => {
      product.title = title;
      product.imageUrl = image;
      product.price = price;
      product.description = description;
      product.save();
    })
    .then(() => {
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};
