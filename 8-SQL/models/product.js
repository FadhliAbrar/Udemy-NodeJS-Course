const Cart = require('./cart')

const db = require('../util/database');

module.exports = class Product{
    constructor(id, title,image,price,description){
        this.id = id;
        this.title = title;
        this.image = image;
        this.price = price;
        this.description = description;
    }
    save(){
        return db.execute(
        'INSERT INTO products (title, price, description, imageUrl) VALUES (? ,? ,? ,?)',
        [this.title, this.price, this.description, this.image]
        );
    }

    updateData(){
        return db.execute(
        `UPDATE products
        SET title = ${this.title},
            price = ${this.price},
            description = ${this.description},
            imageUrl = ${this.image},
        WHERE id = ${this.id}`);
    }

    delete(){
        
    }

    static deleteByID(id){
        return db.execute(`DELETE FROM products WHERE id = ${id}`);
    }

    static fetchAll(){
       return db.execute('SELECT * FROM products');
    }
    
    static findById(id){
        return db.execute('SELECT * FROM products WHERE products.id = ?', [id]);
    }
    
    
}