const express = require('express');
const { getAllActivities, createActivity, updateActivity } = require('../db/activities');
const { getPublicRoutinesByActivity } = require('../db/routines');
const { loginAuth } = require('./login');
const activitiesRouter = express.Router();

activitiesRouter.get('/', async (req, res, next) => {
  try {
    const activities = await getAllActivities();
    res.send(activities);

  } catch (error) {
    next(error)
  }
});

activitiesRouter.post('/', loginAuth, async (req, res, next) => {
  const { name, description } = req.body
  try {
    const activities = await createActivity({ name, description })
    res.send(activities)

  } catch (error) {
    next(error)
  }
})

activitiesRouter.patch('/:activityId', loginAuth, async (req, res, next) => {
  const { name, description } = req.body
  const id = req.params.activityId

  try {
    const activities = await updateActivity({ id, name, description });
    res.send(activities)

  } catch (error) {
    next(error)
  }
})


activitiesRouter.get('/:activityId/routines', async (req, res, next) => {
  const id = req.params.activityId
  try {
    const activities = await getPublicRoutinesByActivity({ id })
    res.send(activities)

  } catch (error) {
    next(error)
  }
})

module.exports = activitiesRouter;