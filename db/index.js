const client = new Client({
  connectionString:
    process.env.DATABASE_URL || "postgres://localhost:5432/juicebox-dev",
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : undefined,
});
// require and re-export all files in this db directory (users, activities...)
module.exports = {
  ...require("./users"), // adds key/values from users.js
  ...require("./activities"), // adds key/values from activites.js
  ...require("./routines"), // etc
  ...require("./routine_activities"), // etc
};
