const express = require('express');
const bodyParser = require('body-parser');

const api = require('./routes/api');
const ticketRoutes = require('./routes/ticketRoutes');
const userRoutes = require('./routes/userRoutes');

// create our Express app
const app = express();

// Takes the raw requests and turns them into usable properties on req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up routes
app.use('/tickets', ticketRoutes);
app.use('/users', userRoutes);
app.use('/api/v1', api);

module.exports = app;