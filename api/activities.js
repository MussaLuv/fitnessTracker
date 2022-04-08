const express = require('express');

const jwt = require('jsonwebtoken');
const { getPublicRoutinesByActivity } = require('../db');
const { JWT_SECRET } = process.env;
const { getActivityById, getAllActivities, createActivity, updateActivity } = require('../db/activities');
const activitiesRouter = express.Router();

/*GET /activities
Just return a list of all activities in the database*/

activitiesRouter.get('/', async (req, res, next) => {
    try {
        const allActivities = await getAllActivities()
        res.send(allActivities);
    } catch (error) {
        next(error)
    }
})

// POST /activities (*)
// Create a new activity

activitiesRouter.post('/', async (req, res, next) => {
    const newAct = req.body;
    try{
        const createdAct = await createActivity(newAct);
        res.send(createdAct)
    } catch (error) {
        next(error)
    }
})

activitiesRouter.patch('/:activityId', async (req, res, next) => {

    const { activityId } = req.params;
    const activity = req.body;
    activity.id = activityId;

    try {
        const updatedAct = await updateActivity(activity);
        res.send(updatedAct);
    } catch(error) {
        next(error)
    }
})


activitiesRouter.get('/:activityId/routines', async (req, res, next) => {
    const {activityId} = req.params;
        try {
            const activityRoutines = await getPublicRoutinesByActivity(activityId);
            res.send(activityRoutines);
        } catch(error) {
            next(error);
        }
})


module.exports = activitiesRouter;