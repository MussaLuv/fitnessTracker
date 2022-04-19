const express = require("express");
const {
  destroyRoutine,
  updateRoutine,
  createRoutine,
  getAllPublicRoutines,
} = require("../db/routines");
const { addActivityToRoutine } = require("../db/routine_activities");
const { loginAuth } = require("./login");

const routinesRouter = express.Router();

routinesRouter.get("/", async (req, res, next) => {
  try {
    const activities = await getAllPublicRoutines();
    res.send(activities);
  } catch (error) {
    next(error);
  }
});

routinesRouter.post("/", loginAuth, async (req, res, next) => {
  const { id: creatorId } = req.user;
  const { isPublic, name, goal } = req.body;
  try {
    const routineNew = await createRoutine({ creatorId, isPublic, name, goal });
    res.send(routineNew);
  } catch (error) {
    next(error);
  }
});

routinesRouter.patch("/:routineId", loginAuth, async (req, res, next) => {
  const { isPublic, name, goal } = req.body;
  const id = req.params.routineId;

  try {
    const upRoutine = await updateRoutine({ id, isPublic, name, goal });
    res.send(upRoutine);
  } catch (error) {
    next(error);
  }
});

routinesRouter.delete("/:routineId", loginAuth, async (req, res, next) => {
  const id = req.params.routineId;
  try {
    const delRoutine = await destroyRoutine(id);
    res.send(delRoutine);
  } catch (error) {
    next(error);
  }
});

routinesRouter.post("/:routineId/activities", async (req, res, next) => {
  const { activityId, count, duration } = req.body;
  const { routineId } = req.params;
  try {
    const reRoutine = await addActivityToRoutine({
      routineId,
      activityId,
      count,
      duration,
    });
    if (!reRoutine) {
      res.status(500).send(error);
    } else res.send(reRoutine);
  } catch (error) {
    next(error);
  }
});

module.exports = routinesRouter;
