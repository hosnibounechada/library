const { getChannel } = require("../../config/rabbitmq");
const {
  BOOK_QUEUE,
  BOOK_CREATED,
  BOOK_UPDATED,
  BOOK_DELETED,
} = require("../queues-events");

const {
  createBookHandler,
  updateBookHandler,
  deleteBookHandler,
} = require("../event-handlers/book-events-handler");

async function consumeFromBookQueue() {
  const channel = getChannel();

  console.log("Waiting for messages...");

  channel.consume(BOOK_QUEUE, (msg) => {
    const message = JSON.parse(msg.content.toString());
    console.log("Received:", message);

    if (message.type === BOOK_CREATED) {
      createBookHandler(message.data);
    } else if (message.type === BOOK_UPDATED) {
      updateBookHandler(message.data);
    } else if (message.type === BOOK_DELETED) {
      deleteBookHandler(message.data);
    }

    channel.ack(msg);
  });
}

module.exports = {
  consumeFromBookQueue,
};
