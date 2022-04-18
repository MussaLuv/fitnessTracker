// require and re-export all files in this db directory (users, activities...)
const client = require("./client");

const {
    createActivity,
    getAllActivities,
    updateActivity,
    getActivityById
} = require('./activities')

const {
    getRoutineById,
    getRoutinesWithoutActivities,
    getAllRoutines,
    getAllPublicRoutines,
    getAllRoutinesByUser,
    getPublicRoutinesByUser,
    getPublicRoutinesByActivity,
    createRoutine,
    updateRoutine,
    destroyRoutine,
} = require('./routines')

const {
    getRoutineActivityById,
    addActivityToRoutine,
    updateRoutineActivity,
    destroyRoutineActivity,
    getRoutineActivitiesByRoutine
} = require('./routine_activities')

const {
    createUser,
    getUser,
    getUserById,
    getUserByUsername
} = require('./users')

module.exports = {
    ...require('./users'),
    ...require('./activities'),
    ...require('./routines'),
    ...require('./routine_activities'),
    client
}