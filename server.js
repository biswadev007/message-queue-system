import express, { json } from 'express';
import { Queue } from 'bullmq';

import { purchaseCourse } from './supportive.js';

const app = express();
const PORT = process.env.PORT ?? 4000;
app.use(json());

const queue = new Queue('email-queue', {
  connection: {
    host: 'redis-141abf64-ppapai-bc1a.a.aivencloud.com',
    port: 27350,
    username: 'default',
    password: 'AVNS_g4HUTj2d3OayQTsaiYY',
  },
});

app.get('/', (req, res) => res.send('<h1>Server running successfully</h1>'));

app.post('/purchase-course', async (req, res) => {
  const data = await purchaseCourse();
  await queue.add('email-queue', {
    sender: 'test@codeseller.com',
    receiver: 'purchasedperson@gmail.com',
    subject: 'Course purcase confirmation',
    body: 'Hurrey, This course is added to your study list.',
  });

  return res.status(200).send(data);
});

app.listen(PORT, () => console.log(`Server running at PORT:${PORT}`));
