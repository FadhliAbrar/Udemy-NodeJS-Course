// Request
// const http = require('http');

// const server = http.createServer((req,res)=>{
//     console.log(req.url, req.method,  req.headers);    
// });
// server.listen(3000);

// redirecting request


const http = require('http');

const routes = require('./routes.js');

console.log(routes.someText);

const server = http.createServer(routes.handler);

server.listen(3000);