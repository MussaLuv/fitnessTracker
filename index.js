// create the express server here

const { PORT = 3000 } = process.env;

const express = require("express")
const server = express();

const morgan = require("morgan");
const bodyParser = require("body-parser");

server.use(morgan("dev"));
server.use(bodyParser.json());

const cors = require("cors");
server.use(cors());

server.use("/api", require("./api"));

const { client } = require("./db");
client.connect();

server.use("*", (req, res, next) => {
  res.status(404);
  res.send(error);
});

server.use((error, req, res, next) => {
  res.status(500);
  res.send(error);
});

server.listen(PORT, () => {
  console.log(`Listening to: ${PORT}`);
});