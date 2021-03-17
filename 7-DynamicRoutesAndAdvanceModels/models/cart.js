const fs = require('fs');
const path = require('path');
const rootDir = require('../util/path');

const p = path.join(rootDir, 'data', 'cart.json');

module.exports = class Cart{
    static addProduct(id, productPrice){
        // fetch the previous product
        fs.readFile(p, (err, fileContent)=>{
            let cart = {product: [], totalPrice : 0};
            if(!err){
                cart = JSON.parse(fileContent);
            }
            //analyze the cart => find existing product
            const existingProductIndex = cart.product.findIndex(product => product.id === id);
            const existingProduct = cart.product[existingProductIndex];
            let updatedProduct;
            //add new product => increase quantity of product
            if(existingProduct){
                updatedProduct = {...existingProduct};
                updatedProduct.qty += 1;
                cart.product = [...cart.product];
                cart.product[existingProductIndex] = updatedProduct;
            }else{
                updatedProduct = {id: id, qty: 1};
                cart.product = [...cart.product, updatedProduct]; // menambahkan product yang ada dengan yang baru
            }
            cart.totalPrice += +productPrice;
            fs.writeFile(p, JSON.stringify(cart), err =>{
                console.log(err);
            })
        })
    }

    static deleteProduct(id, productPrice){
        fs.readFile(p, (err, fileContent)=>{
            if(err){
                return;
            }
            const updatedCart = {...JSON.parse(fileContent)};
            const product = updatedCart.product.find(prod => prod.id === id);
            if(!product){
                return;
            }
            const productQty = product.qty;
            updatedCart.product = updatedCart.product.filter(prod => prod.id !== id);
            updatedCart.totalPrice = updatedCart.totalPrice - productPrice * productQty;
            fs.writeFile(p, JSON.stringify(updatedCart), err=>{
                console.log(err);
            })
        })
    }

    static deleteCart(id, productPrice){
        fs.readFile(p, (err, fileContent)=>{
            const updatedCart = {...JSON.parse(fileContent)};
            const product =  updatedCart.product.find(p=> p.id === id);
            updatedCart.product = updatedCart.product.filter(prod => prod.id !== id);
            updatedCart.totalPrice = updatedCart.totalPrice - (productPrice * product.qty);
            fs.writeFile(p, JSON.stringify(updatedCart), err=>{
                console.log(err);
            });
        });
    }

    static getCart(cb){
        fs.readFile(p, (err, fileContent)=>{
            const cart = JSON.parse(fileContent);
            if (err) {
                cb(null);   
            }else{
                cb(cart);
            }

        })
    }
}