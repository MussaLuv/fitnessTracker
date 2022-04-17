const client = require('./client');

// // inside of createUser({ username, password})

// const SALT_COUNT = 10;

// bcrypt.hash(password, SALT_COUNT, function(err, hashedPassword) {
//   createUser({
//     username,
//     password: hashedPassword // not the plaintext
//   });
// });

// // inside of getUser({username, password})
// const user = await getUserByUserName(username);
// const hashedPassword = user.password;

// bcrypt.compare(password, hashedPassword, function(err, passwordsMatch) {
//   if (passwordsMatch) {
//     // return the user object (without the password)
//   } else {
//     throw SomeError;
//   }
// });





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