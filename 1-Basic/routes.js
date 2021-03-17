const fs = require('fs');

function requestHandler(req, res){
    const url = req.url;
    const method = req.method;
    if (url === '/') {
        res.write('<html>');
        res.write('<head><title>Belajar NodeJS</title></head>');
        res.write('<body><form action="/message" method="POST"><input class="input" type="text" name="message"><button type="submit">click</button></form></body>');
        res.write('</html>');
        return res.end();
    }
    if (url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', (chunk)=>{
            console.log(chunk);
            body.push(chunk);
        })
        req.on('end',()=>{
            const parseBody = Buffer.concat(body).toString();
            const message = parseBody.split('=')[1]; 
            fs.writeFileSync('message.txt', message); // Writing File Synchronously
        })
        res.statusCode = 302; // Redirecting statusCode
        res.setHeader('Location', '/'); // Redirecting to location "/"
        return res.end();
    }
    if(url=== '/bruh'){
    res.write('<html>');
    res.write('<head><title>Belajar NodeJS</title></head>');
    res.write('<body><h1>just a lil shitty</h1></body>');
    res.write('</html>');
    res.end();
    }
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Belajar NodeJS</title></head>');
    res.write('<body><h1>Goodbye from node.js!</h1></body>');
    res.write('</html>');
    res.end();
}

module.exports = {
    handler : requestHandler,
    someText : "Just a random text for testing"
}