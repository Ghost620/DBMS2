var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

const mysql = require("mysql");
const bodyParser = require("body-parser");

var indexRouter = require("./routes/index");
// var usersRouter = require("./routes/users");
var dashboardrouter = require("./routes/tables");
var add = require("./routes/add");
var action = require("./routes/action");
var login = require("./routes/login");
var logout=require("./routes/logout")

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());

app.use("/", indexRouter);
// app.use("/users", usersRouter);
app.use("/tables", dashboardrouter);
app.use("/add", add);
app.use("/action", action);
app.use("/login", login);
app.use("/logout",logout);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
