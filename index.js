// create the express server here
require("dotenv").config();
const { PORT = 3000 } = process.env;
const express = require("express");
const server = express();

const morgan = require("morgan");
server.use(morgan("dev"));

const apiRouter = require("./api");
server.use("/api", apiRouter);

const client = require("./db/client.js");

server.use("*", (req, res, next) => {
  res.status(404);
  res.send({ error: "404" });
});
server.use((error, req, res, next) => {
  res.status(500);
  res.send(error);
});

server.listen(PORT, () => {
  client.connect();
  console.log(`Listening to PORT: ${PORT}`);
});