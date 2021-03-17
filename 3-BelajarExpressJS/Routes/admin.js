const express = require('express');
const router = express.Router();
const path =  require('path');

// admin/add-product => GET
router.get('/add-product',(req,res,next)=>{
    res.sendFile(path.join(__dirname, '../','views','add-product.html'));
});
// admin/add-product => POST
router.post('/add-product', (req,res,next)=>{
    const parseBody = req.body;
    console.log(parseBody);
    res.redirect('/');
});

module.exports = router;