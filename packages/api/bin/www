const http = require('http');
const https = require('https');
const dotenv = require('dotenv');
dotenv.config();
const prod = process.env.NODE_ENV === 'production';

const app = require('../app');

const port = parseInt(process.env.PORT, 10) || 3000;
app.set('port', port);

const server = http.createServer(app);
server.listen(port);