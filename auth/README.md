npx sequelize-cli init // to create the config/config.json

sequelize migration:generate --name create_users_table // to create a migration file

npx sequelize-cli db:migrate // apply migration files with the Sequelize CLI (default profile = development)

npx sequelize-cli db:migrate:status // show the status of migrations

npx sequelize db:migrate --env test // apply migration files for profile test
npx sequelize db:migrate:undo --env test // undo the migrations to clean up the database after testing
