const amqp = require("amqplib");
const { USER_QUEUE, BOOK_QUEUE } = require("../events/queues-events");

const RABBITMQ_URL = process.env.RABBITMQ_URL;

let connection;
let channel;

async function initializeRabbitMQ() {
  if (!connection) {
    connection = await amqp.connect(RABBITMQ_URL);
  }

  if (!channel) {
    channel = await connection.createChannel();
    channel.assertQueue(USER_QUEUE, { durable: false });
    channel.assertQueue(BOOK_QUEUE, { durable: false });
  }
}

module.exports = {
  initializeRabbitMQ,
  getChannel: () => channel,
};
