const { Worker } = require('bullmq');

function emailNotification(data) {
  console.log("Email send require data", data);
  return new Promise(resolve => setTimeout(resolve, 2000));
}

new Worker('email-queue', (job) => {
  const { data } = job;
  emailNotification(data);
}, {
  connection: {
    host: 'redis-141abf64-ppapai-bc1a.a.aivencloud.com',
    port: 27350,
    username: 'default',
    password: 'AVNS_g4HUTj2d3OayQTsaiYY',
  },
});
