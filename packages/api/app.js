const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

// Set up the express app
const app = express();

// Log requests to the console
app.use(logger('dev'));

// parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Reuquire our routes into the application
require('./server/routes')(app);

// Setup a default catch-all route then sends back a welcome
app.get('*', (req, res) => res.status(200).send({
    message: 'Welcome to the beginning of nothingness! ['+  process.env.NODE_ENV +']['+ process.env.POSTGRES_HOST +']['+ process.env.POSTGRES_PORT +']['+ process.env.CONNECT +']'
}))

module.exports = app;