const {
  USER_CREATED,
  USER_UPDATED,
  USER_DELETED,
} = require("../queues-events");
const { publishToUserQueue } = require("./event-publisher");

function publishCreateUserEvent(data) {
  const message = { type: USER_CREATED, data: data };
  publishToUserQueue(message);
}

function publishUpdateUserEvent(data) {
  const message = { type: USER_UPDATED, data: data };
  publishToUserQueue(message);
}

function publishDeleteUserEvent(data) {
  const message = { type: USER_DELETED, data: data };
  publishToUserQueue(message);
}

module.exports = {
  publishCreateUserEvent,
  publishUpdateUserEvent,
  publishDeleteUserEvent,
};
