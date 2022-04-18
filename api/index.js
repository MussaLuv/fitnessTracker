// create an api router
// attach other routers from files in this api directory (users, activities...)
// export the api router


const express = require("express");

const apiRouter = express.Router();

const activitiesRouter = require("./activities");
const routineActivitiesRouter = require("./routine_activities");
const routinesRouter = require("./routines");
const usersRouter = require("./users");

apiRouter.get("/health", (req, res, next) => {
  try {
      res.send({
          message: "Still Alive",
      });
  } catch ({ name, message }) {
      next({ name, message });
  }
});

apiRouter.use("/activities", activitiesRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use("/routines", routinesRouter);
apiRouter.use("/routine_activities", routineActivitiesRouter);

module.exports = apiRouter;