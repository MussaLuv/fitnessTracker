const express = require('express');
const routine_activitiesRouter = express.Router();
const { requireUser } = require('./utils');

const {
    getRoutineActivityById,
    getRoutineById,
    updateRoutineActivity,
    destroyRoutineActivity
  } = require('../db');
  
  
  routine_activitiesRouter.patch('/:routineActivityId', requireUser, async (req, res, next) => {
     
    const { count, duration  } = req.body
    const { routineActivityId } = req.params
    const id = routineActivityId
    try {
      const routine_activity = await getRoutineActivityById(id)
      const routine = await getRoutineById(routine_activity.routineId)
      if (routine.creatorId === req.user.id) {
      const updatedRoutine = await updateRoutineActivity({id, count, duration});
      
      res.send(updatedRoutine);
    }else {
      next({
        name:"Not Authorized",
        Message: "Not Authorized"
      }
      )}
      } catch (error) {
      next(error)
    }
  });
    
    
    routine_activitiesRouter.delete('/:routineActivityId', requireUser, async (req, res, next) => {
     
      const { routineActivityId } = req.params
      const id = routineActivityId
      try {
        const routine_activity = await getRoutineActivityById(id)
        const routine = await getRoutineById(routine_activity.routineId)
        if (routine.creatorId === req.user.id) {
        const deletedRoutine = await destroyRoutineActivity(id);
        
        res.send(deletedRoutine);
      }else {
        next({
          name:"Not Authorized",
          Message: "Not Authorized"
        }
        )}
        } catch (error) {
        next(error)
      }
        });
  
    module.exports = routine_activitiesRouter;