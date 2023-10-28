const { getChannel } = require("../../config/rabbitmq");
const {
  USER_QUEUE,
  USER_CREATED,
  USER_UPDATED,
  USER_DELETED,
} = require("../queues-events");

const {
  createUserHandler,
  updateUserHandler,
  deleteUserHandler,
} = require("../event-handlers/user-events-handler");

async function consumeFromUserQueue() {
  const channel = getChannel();

  console.log("Waiting for messages...");

  channel.consume(USER_QUEUE, (msg) => {
    const message = JSON.parse(msg.content.toString());
    console.log("Received:", message);

    if (message.type === USER_CREATED) {
      createUserHandler(message.data);
    } else if (message.type === USER_UPDATED) {
      updateUserHandler(message.data);
    } else if (message.type === USER_DELETED) {
      deleteUserHandler(message.data);
    }

    channel.ack(msg);
  });
}

module.exports = {
  consumeFromUserQueue,
};
