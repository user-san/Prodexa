// server.js
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);

// Enable CORS
server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Allow all
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
});

server.use(router);
server.listen(8080, '0.0.0.0', () => {
    console.log('JSON Server is running on port 8080');
});
