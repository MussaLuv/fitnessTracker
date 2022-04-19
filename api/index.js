// create an api router
// attach other routers from files in this api directory (users, activities...)
// export the api router

const express = require("express");
const { getUserById } = require("../db");

const apiRouter = express.Router();

const activitiesRouter = require("./activities");
const routineActivitiesRouter = require("./routine_activities");
const routinesRouter = require("./routines");
const usersRouter = require("./users");

const jwt = require("jsonwebtoken");
const { JWT_SECRET = "neverTell" } = process.env;

apiRouter.use(async (req, res, next) => {
  const prefix = `Bearer `;
  const authorized = req.header("Authorization");

  if (!authorized) {
    next();
  } else if (authorized.startsWith(prefix)) {
    const token = authorized.slice(prefix.length);

    try {
      const reToken = jwt.verify(token, JWT_SECRET);

      const id = reToken && reToken.id;
      if (id) {
        req.user = await getUserById(id);
        next();
      }
    } catch (error) {
      next(error);
    }
  } else {
    next({
      name: "AuthHeaderErr",
      message: `Authorization does not start with ${prefix}`,
    });
  }
});

apiRouter.get("/health", (req, res, next) => {
  try {
    res.send({
      message: "STILL ALIVE",
    });
  } catch (error) {
    next(error);
  }
});

apiRouter.use("/activities", activitiesRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use("/routines", routinesRouter);
apiRouter.use("/routine_activities", routineActivitiesRouter);

module.exports = apiRouter;
