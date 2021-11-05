const service = require('./service.js')();
const http = require('http');
const server = http.createServer(service);
const axios = require('axios');

let serviceName = "Carrito";
let version = "1.0.0";

server.listen(0, function(){
    const registerService = () => axios.put(`http://localhost:3000/register/${serviceName}/${version}/${server.address().port}`);
    setInterval(registerService, 5000);
    console.log(`Carrito listening in port: ${server.address().port}`); 
}); 