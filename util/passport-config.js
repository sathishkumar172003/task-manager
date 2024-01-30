const LocalStrategy = require("passport-local").Strategy;
const User = require("../model/user");
const bcrypt = require("bcryptjs");

const initializer = (passport) => {
  async function authUser(email, pwd, done) {
    console.log(email, pwd);
    try {
      let user = await User.findOne({ email: email });
      if (user) {
        if (await bcrypt.compare(pwd, user.password)) {
          done(null, user, { message: "Successfully logged in " });
        } else {
          done(null, false, { message: "Incorrect Password" });
        }
      } else {
        done(null, false, { message: "no user with that email" });
      }
    } catch (e) {
      done(e, false);
    }
  }

  passport.use(
    new LocalStrategy(
      { usernameField: "email", passwordField: "pwd" },
      authUser
    )
  );
  passport.serializeUser((user, done) => {
    return done(null, user);
  });
  passport.deserializeUser((user, done) => {
    return done(null, user);
  });
};

module.exports = initializer;
