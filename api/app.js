// load app dependencies
import express from 'express';
import dotenv from 'dotenv';
import '@babel/polyfill'
import bodyParser from 'body-parser';
import usersRoute from './routes/userRoutes';

dotenv.config();
const app = express();

const port = process.env.PORT || 7000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  return res.status(200).send({
    message: 'The API is necessary to run this application'
  });
});

app.listen(port, () => {
  console.log(`This server is live on ${port}`);
});

app.use('/api/v1/users', usersRoute);

export default app;