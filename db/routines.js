const client = require("./client");

const { mapRoutines } = require("./utils");

async function createRoutine({ creatorId, isPublic, name, goal }) {
  const {
    rows: [routine],
  } = await client.query(
    `
        INSERT INTO routines ("creatorId", "isPublic", name, goal)
        VALUES ($1, $2, $3, $3)
        RETURNING *;
        `,
    [creatorId, isPublic, name, goal]
  );
  return routine;
}

async function getRoutineById(id) {
  try {
    const {
      rows: [routine],
    } = await client.query(
      `
        SELECT * FROM routines
        WHERE routines.id = $1
        `,
      [id]
    );
    return routine;
  } catch (error) {
    console.log("error in getRoutineById");
    throw error;
  }
}

async function updateRoutine({ id, isPublic, name, goal }) {
  try {
    const {
      rows: [routine],
    } = await client.query(
      `
      UPDATE routines SET
      "isPublic" = COALESCE($2, routines."isPublic"),
      name = COALESCE($3, name),
      goal = COALESCE($4, goal),
      WHERE routines.id = $1,
      RETURNING *;
      `,
      [id, isPublic, name, goal]
    );
    return routine;
  } catch (error) {
    console.log("Error in updateRoutine!");
    throw error;
  }
}

async function getRoutinesWithoutActivities() {
  const { rows } = await client.query(
    `
    SELECT * FROM routines`
  );
  return rows;
}

async function getAllRoutines() {
  try {
    const { rows } = await client.query(
      `
      SELECT
      routines.id, "creatorId", "isPublic", routines.name, goal,
      FROM ROUTINES
      LEFT JOIN activities on activities.id`
    );
    return rows;
  } catch (error) {
    console.log("Error in getAllRoutes");
    throw error;
  }
}

async function getAllPublicRoutines() {
  try {
    let all = await getAllPublicRoutines();
    return all.filter((routine, i) => routine.isPublic);
  } catch (error) {
    console.log("Error in getAllPublicRoutines");
    throw error;
  }
}

async function getAllRoutinesByUser(user) {
  try {
    let all = await getAllRoutines();
    return all.filter((routine, i) => {
      return routine.creatorName === user.username;
    });
  } catch (error) {
    console.log("Error in getAllRoutinesByUser!!");
    throw error;
  }
}

async function getPublicRoutinesByUser(user) {
  try {
    let all = await getAllRoutinesByUser(user);
    return all.filter((routine, i) => {
      return routine.isPublic;
    });
  } catch (error) {
    console.log("Error in getPublicRoutinesByUser");
    throw error;
  }
}

async function getPublicRoutinesByActivity() {
  try {
  } catch (error) {}
}

module.exports = {
  createRoutine,
  getRoutineById,
  updateRoutine,
  getRoutinesWithoutActivities,
  getPublicRoutinesByUser,
  getPublicRoutinesByActivity,
};
