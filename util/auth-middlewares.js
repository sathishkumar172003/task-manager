// allow only if the user is authenticated
const isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/auth/login");
  }
};

const allowIfNotAuth = (req, res, next) => {

    if(!req.isAuthenticated()){
        next()
    }else {
        res.redirect('/tasks')
    }
};


module.exports = {
    isAuth,
    allowIfNotAuth
}
