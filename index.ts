import express from 'express';
import dotenv from 'dotenv';
import { consumeMessages } from './helper/consumer.helper';
import router from './router/route';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', router);

// message que works perfectly
consumeMessages()
  .then(() => {
    console.log('RabbitMQ Consumer started.');
  })
  .catch((error: any) => {
    console.error('Error starting RabbitMQ Consumer:', error);
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
