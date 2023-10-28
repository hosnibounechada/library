const {
  BOOK_CREATED,
  BOOK_UPDATED,
  BOOK_DELETED,
} = require("../queues-events");
const { publishToBookQueue } = require("./event-publisher");

function publishCreateBookEvent(data) {
  const message = { type: BOOK_CREATED, data: data };
  publishToBookQueue(message);
}

function publishUpdateBookEvent(data) {
  const message = { type: BOOK_UPDATED, data: data };
  publishToBookQueue(message);
}

function publishDeleteBookEvent(data) {
  const message = { type: BOOK_DELETED, data: data };
  publishToBookQueue(message);
}

module.exports = {
  publishCreateBookEvent,
  publishUpdateBookEvent,
  publishDeleteBookEvent,
};
