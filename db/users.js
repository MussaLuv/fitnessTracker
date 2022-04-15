const client = require('./client');

// inside of createUser({ username, password})
async function createUser({ username, password }){

    try{
        const {rows: [user] } = await client.query(`
        INSERT INTO users(username, password)
        VALUES ($1, $2)
        RETURNING *;`
        , [username, password]);

        delete user.password;        
        return user;
    }catch (error){
        throw error;
    }
}

// inside of getUser({username, password})
async function getUser({username, password}){
  try {
      const {rows: [user] } = await client.query(`
      SELECT * 
      FROM users
      WHERE username = $1;
      `, [username]);
  if (user.password !== password){
      return
  }
      
      delete user.password;
      return user;
  }catch (error){
      throw error;
  }
}

async function getUserById(id){
  try{
      const {rows: [user] } = await client.query(`
      SELECT * 
      FROM users
      WHERE id = $1;
      `, [id]);

      return user;
  }catch (error){
      throw error;
  }
}


async function getUserByUsername(username){
    
  try {
      const {rows: [user] } = await client.query(`
      SELECT id, username 
      FROM users
      WHERE username = $1;
      `, [username]);

      return user;
  }catch (error){
      throw error;
  }
}

module.exports = {
    createUser,
    getUser,
    getUserById,
    getUserByUsername
};