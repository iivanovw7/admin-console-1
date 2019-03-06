import * as express from 'express';
import * as bodyParser from 'body-parser';

import api from './routes/api';
import messageRoutes from './routes/messageRoutes';
import ticketRoutes from './routes/ticketRoutes';
import userRoutes from './routes/userRoutes';

// create our Express app
const app: express.Express = express();

// Takes the raw requests and turns them into usable properties on req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up routes
app.use('/messages', messageRoutes);
app.use('/tickets', ticketRoutes);
app.use('/users', userRoutes);
app.use('/api/v1', api);

export default app;