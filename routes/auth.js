const express = require("express");

const {
  register,
  postRegister,
  login,
  postLogin,
  logout,
} = require("../controller/auth");

const { allowIfNotAuth } = require("../util/auth-middlewares");

const { body } = require("express-validator");
const User = require("../model/user");

const router = express.Router();

router
  .route("/signup")
  .get(allowIfNotAuth)
  .get(register)
  .post(
    [
      body("email")
        .trim()
        .notEmpty()
        .isEmail()
        .withMessage("Please enter a valid email")
        .custom(async (value) => {
          try {
            let user = await User.findOne({ email: value });
            console.log(user);
            if (user) {
              return Promise.reject("user already exists");
            }
          } catch (e) {
            throw new Error("Server-side error. Please try again");
          }
        }),

      body("pwd")
        .trim()
        .notEmpty()
        .isLength({ min: 2 })
        .withMessage("Please enter valid password"),
      body("confirmPwd")
        .trim()
        .notEmpty()
        .isLength({ min: 2 })
        .withMessage("Please enter  valid confirm password ")
        .custom(async (value, { req }) => {
          if (value != req.body.pwd) {
            throw new Error("Password does not match");
          }
        }),
    ],
    postRegister
  );

router.route("/login").get(allowIfNotAuth).get(login).post(postLogin);

router.route("/logout").post(logout);

module.exports = router;
