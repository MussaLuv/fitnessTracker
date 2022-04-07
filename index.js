// create the server here

require("dotenv").config();
const PORT = 3000;
const express = require("express");
const app = express();
const apiRouter = require("./api");

app.use(express());
app.use((req, res, next) => {
  console.log("logger is starting up!!");
  console.log(req.body);
  console.log("logger is ending now");
  next();
});

app.use("./api", apiRouter);

const client = require("./db/client");
client.connect();

app.listen(PORT, () => {
  console.log("SERVER IS LISTENING!!");
});
