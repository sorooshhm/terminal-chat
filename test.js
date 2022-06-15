const http = require('http');

const server = http.createServer((req, res)=>{
    res.end("hi");
})

server.listen(8080, "192.168.1.5")