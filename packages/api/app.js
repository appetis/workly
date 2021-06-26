const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const db = require('./server/models');

// Set up the express app
const app = express();

db.sequelize.sync()
    .then(() => {
        console.log('DB connected');
    })
    .catch(console.error);

// Log requests to the console
app.use(logger('dev'));

app.use(cors({
    origin: '*'
}));

// parse incoming requests data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Require our routes into the application
require('./server/routes')(app);

// Setup a default catch-all route then sends back a welcome
app.get('*', (req, res) => res.status(200).send({
    message: 'Welcome to the beginning of nothingness! ['+  process.env.NODE_ENV +']['+ process.env.POSTGRES_HOST +']['+ process.env.POSTGRES_PORT +']['+ process.env.CONNECT +']'
}))

module.exports = app;