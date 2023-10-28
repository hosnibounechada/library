const { consumeFromUserQueue } = require("./consumers/user-events-consumer");
const { consumeFromBookQueue } = require("./consumers/book-events-consumer");

function consumeFromQueue() {
  consumeFromUserQueue();
  consumeFromBookQueue();
}

module.exports = {
  consumeFromQueue,
};
