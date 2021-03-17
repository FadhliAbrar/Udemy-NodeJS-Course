const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'belajar-mysql',
    password: 'kraken1288'
})

module.exports = pool.promise();