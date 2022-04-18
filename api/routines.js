const express = require("express");

const routinesRouter = express.Router();

routinesRouter.get("/", async (req, res, next) => {}

routinesRouter.post("/", async (req, res, next) => {}

routinesRouter.patch("/:routineId", async (req, res, next) => {}

routinesRouter.delete("/:routineId", async (req, res, next) => {}

routinesRouter.post("/:routineId/activities", async (req, res, next) => {}

module.exports = routinesRouter;