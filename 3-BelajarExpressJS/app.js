const express = require('express');
// Body parser
const bodyParser = require('body-parser');
//path
const path = require('path');
//Router
const adminRoute = require('./Routes/admin');
const shopRoute = require('./Routes/shop');

const app = express();

// app.use() ==>> merupakan middleware yang disediakan expressJS.
// middleware merupakan fungsi yang memiliki akses pada request dan response

//next() => meneruskan ke middleware selanjutnya
// next() => ga bisa handle dua response. logikanya anda tidak bisa mengirim 2 response dalam satu page

app.use(bodyParser.urlencoded({extended: false}));
//parsing (form data)
//di akhir line terdapat next() sehingga ia meneruskan ke middleware lainnya

app.use('/admin' ,adminRoute);
app.use(shopRoute);

//page not found (error handling)
app.use((req, res, next)=>{
    res.status(404).sendFile(path.join(__dirname,'./views','404.html'));
})

app.listen(3000);