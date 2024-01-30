const { validationResult } = require("express-validator");
const User = require("../model/user");
const passport = require("passport");

const register = (req, res, next) => {
  const errMsg = req.flash("registrationFailed");
  res.render("./user/signup.ejs", { errMsg: errMsg, req: req });
};

const postRegister = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log("Validation errors:", errors.array());
    req.flash("registrationFailed", errors.array()[0].msg);
    return res.status(400).redirect("/auth/signup");
  }
  try {
    let user = await User.create({
      email: req.body.email,
      password: req.body.pwd,
    });
    res.status(201).render("./task/my-tasks.ejs", { req: req });
  } catch (e) {
    console.log(e);
    res.redirect("/auth/signup");
  }
};

const login = async (req, res, next) => {
  const logoutMsg = req.flash("logoutSuccess");
  res.render("./user/login.ejs", { req: req, logoutMsg: logoutMsg });
};

const postLogin = passport.authenticate("local", {
  failureRedirect: "/auth/login",
  successRedirect: "/",
  failureFlash: true,
  successFlash: true,
});

const logout = (req, res) => {
  req.logout(function (err) {
    if (err) {
      console.log(err);
    } else {
      req.flash("logoutSuccess", "you are logged out successfully! ");
      res.redirect("/auth/login");
    }
  });
};

module.exports = {
  register,
  postRegister,
  login,
  postLogin,
  logout,
};
