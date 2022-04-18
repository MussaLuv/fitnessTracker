const express = require("express");
const { getPublicRoutinesByUser } = require("../db/routines");
const { getUserByUsername, getUser, createUser } = require("../db/users");
const { loginAuth } = require("./login");

const usersRouter = express.Router();

usersRouter.post("/register", async (req, res, next) => {
  const { username, password } = req.body
    try {
        const userSet = await getUserByUsername(username)
        if (userSet) {
            next({
                name: 'userExists',
                message: "username exsists"
            })
        } if (password.length < 8) {
            next({
                name: 'passwordLengthMin',
                message: "set your password longer than 8 characters"
            })
        } else {
            const info = await createUser({ username, password })
            res.send({info});
        }
    } catch(error){
      next(error)
    }
});

usersRouter.post("/login", async (req, res, next) => {
  const { username, password } = req.body
    try {
        const loginInfo = await getUser({ username, password })
        if (loginInfo) {
            res.send({ message: "Logged In", token: 'token' });
        }
        else {
            next({
                name: 'Login Info Error',
                message: 'Username or Password is wrong'
            });
        }
      } catch (error) {
        next(error)
    }
});

usersRouter.get("/me", loginAuth, async (req, res, next) => {
  try {
    res.send(req.user);  

} catch (error) {
    next(error)
}
});


usersRouter.get("/:username/routines", async (req, res, next) => {
  const { username } = req.params
    
  const userRoutines = await getPublicRoutinesByUser({ username });
    res.send(userRoutines);
});


module.exports = usersRouter;