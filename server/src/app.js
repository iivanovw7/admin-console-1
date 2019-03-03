const express = require('express');
const bodyParser = require('body-parser');

const privateApiRoutes = require('./routes/privateApi');
const publicApiRoutes = require('./routes/publicApi');

// create our Express app
const app = express();

// Takes the raw requests and turns them into usable properties on req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up routes
app.use('/api', privateApiRoutes);
app.use('/api/v1', publicApiRoutes);

module.exports = app;