const { throws } = require('assert');
const { json } = require('body-parser');
const fs = require('fs');
const Cart = require('./cart')
const path = require('path');
const rootDir = require('../util/path');
const p = path.join(rootDir, 'data', 'product.json')

const readFileSystem = callback =>{
    fs.readFile(p, (err, fileContent)=>{
        if(err){
            callback([]);
        }
        else{
            callback(JSON.parse(fileContent));
        }
    })
}

module.exports = class Product{
    constructor(id, title,image,price,description){
        this.id = id;
        this.title = title;
        this.image = image;
        this.price = price;
        this.description = description;
    }
    save(){
        readFileSystem(product =>{
            if(this.id){
                const existingProductIndex = product.findIndex(prod => prod.id === this.id);
                const updatedProduct = [...product];
                updatedProduct[existingProductIndex] = this;
                fs.writeFile(p, JSON.stringify(updatedProduct), (err)=>{
                    console.log(err);
                })
            }else{
                this.id = Math.random().toString();
                product.push(this);
                fs.writeFile(p, JSON.stringify(product), (err)=>{
                    console.log(err);
                })
            }
        });
    }

    delete(){
        readFileSystem(product => {
            if (this.id) {
                const jumlahDelete = 1;
                const existingProductIndex =  product.findIndex(prod => prod.id === this.id);
                const allProductFetch = [...product];
                allProductFetch.splice(existingProductIndex, jumlahDelete);// splice(indexProductYangMauDiDelet, jumlah)
                fs.writeFile(p, JSON.stringify(allProductFetch), err=>{
                    console.log(err);
                })
            }
        })
    }

    //Udemy Code
    static deleteByID(id){
        readFileSystem(product =>{
            const products = product.find(prod => prod.id === id);
            const existingProduct = product.filter(prod => prod.id !== id); // menulis ulang yang bukan id yang dihapus. yang dihapus tidak ditulis ulang
            fs.writeFile(p, JSON.stringify(existingProduct),err=>{
                if(!err){
                    Cart.deleteProduct(id, products.price);
                }
            })

        })
    }

    static fetchAll(cb){
        readFileSystem(cb);
    }
    
    static findById(id, cb){
        readFileSystem(products => {
            const productID = products.find(perArray => perArray.id === id);
            cb(productID);
        })
    }
    
    
}