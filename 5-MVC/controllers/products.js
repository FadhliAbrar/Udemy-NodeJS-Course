const Product = require('../models/product');

exports.getAddProduct = (req,res,next)=>{
    res.render('admin', {title : "Admin"});
};

exports.postAddProduct = (req,res,next)=>{
    const product = new Product(req.body.judul);
    product.save();
    res.redirect('/');
};

exports.getProducts = (req,res,next)=>{
    Product.fetchAll((product)=>{
        res.render('main-page',{prods: product, docTittle: 'Halaman Utama'});
    });
};

