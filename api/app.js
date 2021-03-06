// load app dependencies
import express from 'express';
import dotenv from 'dotenv';
import '@babel/polyfill';
import bodyParser from 'body-parser';

// Import routes
import usersRoute from './routes/userRoutes';
import tripRoute from './routes/tripRoutes';
import busRoute from './routes/busRoutes';
import bookingRoute from './routes/bookingRoutes';

dotenv.config();
const app = express();

const port = process.env.PORT || 7000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  return res.status(200).json({
    status: 'success',
    message: 'The API is necessary to run this application'
  });
});

app.listen(port, () => {
  console.log(`This server is live on ${port}`);
});

app.use('/api/v1', usersRoute);
app.use('/api/v1', usersRoute);
app.use('/api/v1', tripRoute);
app.use('/api/v1', busRoute);
app.use('/api/v1', bookingRoute);

export default app;
