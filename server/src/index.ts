import * as mongoose from 'mongoose';

import app from './app';

// Connect to our Database and handle an bad connections
mongoose.connect(process.env.DATABASE, { useNewUrlParser: true }, () => {
  console.log('Connected to the DB');
});
// Turn off deprecation
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
(mongoose as any).Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on('error', err => {
  console.error(`Error → ${err.message}`);
});

// Start our app!
app.set('port', process.env.PORT || 7777);
app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${app.get('port')}`);
});