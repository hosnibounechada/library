require("dotenv").config({
  path: `.env.${process.env.NODE_ENV || "development"}`,
});
const app = require("./src/app");
const umzug = require("./src/config/umzug-migration");

const { initializeRabbitMQ } = require("./src/config/rabbitmq");

(async () => {
  await umzug.up();
})();

function main() {
  console.log("Books Service is starting...");

  const PORT = process.env.PORT || 3000;

  initializeRabbitMQ();

  app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));
}

main();
