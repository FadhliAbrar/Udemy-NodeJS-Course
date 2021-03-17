const { throws } = require('assert');
const { json } = require('body-parser');
const fs = require('fs');
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
    constructor(title,image,price,description){
        this.title = title;
        this.image = image;
        this.price = price;
        this.description = description;
    }
    save(){
        readFileSystem(product =>{
            console.log(product);
            product.push(this);
            fs.writeFile(p, JSON.stringify(product), (err)=>{
                console.log(err);
            })
        });
    }
    static fetchAll(cb){
        readFileSystem(cb);
    }
}