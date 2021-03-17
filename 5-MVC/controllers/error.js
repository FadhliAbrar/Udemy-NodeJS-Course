//path
const path = require('path');

exports.pageError = (req, res, next)=>{
    res.status(404).render(path.join(__dirname, '../views', '404'));
};