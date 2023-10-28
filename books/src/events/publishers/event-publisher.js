const { getChannel } = require("../../config/rabbitmq");
const { BOOK_QUEUE } = require("../queues-events");

async function publishToBookQueue(message) {
  getChannel().sendToQueue(BOOK_QUEUE, Buffer.from(JSON.stringify(message)));

  console.log(`Sent: ${JSON.stringify(message)}`);
}

module.exports = {
  publishToBookQueue,
};
