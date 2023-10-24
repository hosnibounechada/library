require("dotenv").config({
  path: `.env.${process.env.NODE_ENV || "development"}`,
});
const app = require("./src/app");
const umzug = require("./src/config/umzug-migration");

(async () => {
  await umzug.up();
})();

function main() {
  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));
}

main();
