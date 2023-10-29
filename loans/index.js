require("dotenv").config({
  path: `.env.${process.env.NODE_ENV || "development"}`,
});
const app = require("./src/app");
const umzug = require("./src/config/umzug-migration");

const { initializeRabbitMQ } = require("./src/config/rabbitmq");
const { consumeFromQueue } = require("./src/events/event-consumer");

(async () => {
  await umzug.up();
})();

async function main() {
  console.log("Starting...");

  const PORT = process.env.PORT || 3000;

  await initializeRabbitMQ();

  consumeFromQueue();

  app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));
}

main();
