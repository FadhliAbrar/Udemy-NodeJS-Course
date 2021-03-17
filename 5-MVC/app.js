// express
const express = require('express');
const app = express();
// router
const adminRouter = require('./router/admin');
const mainPage =require('./router/shop');
const errorController = require('./controllers/error');
//body parser
const bodyParser = require('body-parser');
//Templating engines => menginjeksi data dan menghasilkan file html untuk dibaca browser
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({extended: true}));

app.use('/admin',adminRouter.routes);
app.use(mainPage);
app.use(errorController.pageError);

app.listen(3000);