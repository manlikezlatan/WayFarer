// load app dependencies
import express from 'express';
import dotenv from 'dotenv';
import '@babel/polyfill'
import bodyParser from 'body-parser';
import usersRoute from './routes/userRoutes';
import adminRoute from './routes/adminRoutes';
import tripRoute from './routes/tripRoutes';
import busRoute from './app/routes/busRoute';

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

app.use('/api/v1/signup', usersRoute);
app.use('/api/v1/signin', usersRoute);
app.use('/api/v1/admin/signup', adminRoute);
app.use('/api/v1/trips', tripRoute);
app.use('/api/v1/buses', busRoute);

export default app;