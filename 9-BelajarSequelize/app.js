const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
//Databases config
const sequelize = require('./util/database');
const Product =  require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');

app.set('view engine', 'ejs');
app.set('views', 'views');
//Routes
const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorRoutes = require('./routes/error')

//Util
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
//IDK YET, But i think this is an user request
app.use((req, res, next)=>{
    User.findByPk(1)
    .then(user=>{
        req.user = user;
        next();
    })
    .catch(err=>{console.log(err)});
})
//Middleware Routes
app.use('/admin', adminData.routes);
app.use(shopRoutes);
app.use(errorRoutes);
// Table Relationship
Product.belongsTo(User,{onUpdate: 'CASCADE',onDelete: 'CASCADE'});
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsToMany(Product, {through: CartItem});
Product.belongsToMany(Cart, {through: CartItem});
User.hasMany(Order);
Order.belongsToMany(Product, {through: OrderItem});


//Mensinkronkan database
sequelize.sync()
.then(result => {
    User.findByPk(1);
})
.then(user=>{
    if(!user){
        return  User.create({name: 'Fadli', email:'stupidlearner0407@gmail.com'})
    }
    return user;
})
.then(user => user.createCart() )
.then(()=> app.listen(3000))
.catch(err=>{
    console.log(err);
});
