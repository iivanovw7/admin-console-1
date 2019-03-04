const mongoose = require('mongoose');

// Connect to our Database and handle an bad connections
mongoose.connect(process.env.DATABASE, { useNewUrlParser: true }, () => {
  console.log('Connected to the DB');
});
// Turn off deprecation
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on('error', err => {
  console.error(`Error → ${err.message}`);
});

// Import all our models
require('./models/Branch');
require('./models/Group');
require('./models/Role');
require('./models/Ticket');
require('./models/User');


// Start our app!
const app = require('./app');
app.set('port', process.env.PORT || 7777);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});