function loginAuth(req, res, next) {
    if (!req.user) {
        next({
            name: "Login",
            message: "Need to Login"
        });
    }
    next();
}

module.exports = {
    loginAuth
}