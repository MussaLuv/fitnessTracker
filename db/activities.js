const client = require('./client');


//fetches activity IDs
async function getActivityById(id) {
    try {
        const { rows: [activity] } = await client.query(`
        SELECT * FROM activities
        WHERE id = $1
        `, [id])

        return activity;
    } catch (error) {
        throw error;
    }
}

//grabs all activities
async function getAllActivities() {
    try {
        const { rows } = await client.query(`
        SELECT * FROM activities
        `);
        
        return rows;
    } catch(error) {
        throw error;
    }
}

//creates new activities
async function createActivity({ name, description }) {
    try {
        const { rows: [activity] } = await client.query(`
            INSERT INTO activities(name, description)
            VALUES ($1, $2)
            ON CONFLICT (name) DO NOTHING
            RETURNING *;
            `, [name, description]
        );
        return activity;
} catch (error) {
    throw error;
    }
}

//updates names and descriptions of the activities without changing any IDs
async function updateActivity({ id, name, description }) {
    try {
        const { rows: [activity] } = await client.query(`
        UPDATE activities 
        SET name = $2, description = $3
        WHERE id = $1
        RETURNING *;
        `, [id, name, description])

        return activity
    } catch (error) {
        throw error;
    }
}

module.exports = {
    client, 
    getActivityById,
    getAllActivities,
    createActivity,
    updateActivity
}