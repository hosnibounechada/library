const { getChannel } = require("../../config/rabbitmq");
const { USER_QUEUE } = require("../queues-events");

async function publishToUserQueue(message) {
  getChannel().sendToQueue(USER_QUEUE, Buffer.from(JSON.stringify(message)));

  console.log(`Sent: ${JSON.stringify(message)}`);
}

module.exports = {
  publishToUserQueue,
};
