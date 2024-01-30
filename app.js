require("dotenv").config();
const path = require("path");

const express = require("express");
const ejs = require("ejs");
const app = express();
const session = require("express-session");
const flash = require("express-flash");
const passport = require("passport");
const MongoStore = require("connect-mongo");
const methodOverride = require("method-override");

const connectDB = require("./util/db");
const initializer = require("./util/passport-config");

// routes

const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/tasks");

// auth middlewares
const { isAuth } = require("./util/auth-middlewares");

app.set("view engine", "ejs"); //setting the ejs templates
app.set("views", "views");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  })
);
app.use(passport.initialize());
app.use(passport.session());
initializer(passport);
app.use(methodOverride("_method"));

app.use("/auth", authRoutes);
app.use("/tasks", isAuth, taskRoutes);

app.get("/", (req, res) => {
  res.render("home.ejs", { req: req });
});

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("database connected succesfully! ");

    app.listen(5000, () => {
      console.log("server running on machine 5000");
    });
  } catch (e) {
    console.log(e);
  }
};

start();
