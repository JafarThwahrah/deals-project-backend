const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
require("dotenv").config();

const sessionStore = new MySQLStore({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  createDatabaseTable: true,
  schema: {
    tableName: "sessions",
    columnNames: {
      session_id: "session_id",
      expires: "expires",
      data: "data",
    },
  },
});

module.exports = sessionStore;
