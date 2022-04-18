const express = require("express");
const { getRoutineById } = require("../db/routines");
const { getRoutineActivityById, updateRoutineActivity, destroyRoutineActivity } = require("../db/routine_activities");
const { loginAuth } = require("./login");
const routineActivitiesRouter = express.Router();

routineActivitiesRouter.patch("/:routineActivityId/", loginAuth, async (req, res, next) => {
  const { count, duration } = req.body;
  const id = req.params.routineActivityId;
  try {
    const prevRoutine = await getRoutineActivityById(id);
    const nextRoutine = await getRoutineById(prevRoutine.routineId)
    if (req.user.id === nextRoutine.creatorId) {
      const routineActivity = await updateRoutineActivity({ id, count, duration });
      res.send(routineActivity);
    }
  } catch (error) {
    next(error);
  }
});


routineActivitiesRouter.delete("/:routineActivityId/", loginAuth, async (req, res, next) => {
  const id = req.params.routineActivityId;
  try {
    const prevRoutine = await getRoutineActivityById(id);
    const nextRoutine = await getRoutineById(prevRoutine.routineId)
    if (req.user.id === nextRoutine.creatorId) {
      const routineActivity = await destroyRoutineActivity(id);
      res.send(routineActivity);
    }
  } catch (error) {
    next(error);
  }
});


module.exports = routineActivitiesRouter;