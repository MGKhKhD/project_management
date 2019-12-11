const http = require('http');
const app = require('./backend/app');

const port = process.env.PORT || 4400;
app.set('port', port);
const server = http.createServer(app);
server.on('error', (err) => {
    console.log('error in initiating the server on port' + port);
});
server.on('listening', () => {
    console.log('server is running on port' + port);
});
server.listen(port);
