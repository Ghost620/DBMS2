var express = require("express");
var router = express.Router();
const mysqlConnection = require("./mysqlconn");

router.post("/", function (req, res, next) {
  username = req.body.username;
  password = req.body.password;
  if (username == "admin" && password == "admin") {
    stat = "active";
    res.cookie("stat", stat);
    res.cookie("user", "admin");
    res.redirect("/tables");
  } else {
    mysqlConnection.query(
      `select * from Account where user_name = '${username}' and user_password = '${password}'`,
      (err, rows, fields) => {
        if (rows.length === 0 || err) {
          res.render("login", { message: "Incorrect Username or password !" });
        } else {
          data = rows[0];
          stat = "active";
          res.cookie("stat", stat);
          res.cookie("user", username);
          res.redirect('/tables')
        }
      }
    );
  }
});

module.exports = router;
