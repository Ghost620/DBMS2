var express = require("express");
var router = express.Router();
const mysqlConnection = require("./mysqlconn.js");

router.get("/", function (req, res, next) {

  var stat = req.cookies.stat;

  if (stat == "active") {
    const gettablenames = () => {
      return new Promise((resolve, reject) => {
        mysqlConnection.query("show tables", (err, rows, fields) => {
          if (err) {
            console.log("First Function", err);
            reject(err);
          } else {
            resolve(rows);
          }
        });
      });
    };

    const getcolumndata = (element, key) => {
      return new Promise((resolve, reject) => {
        mysqlConnection.query(
          `SELECT * from ${element[key]}`,
          (err, rows, fields) => {
            if (err) {
              console.log("Second function", err);
              reject(err);
            } else {
              resolve(rows);
            }
          }
        );
      });
    };

    const allfunct = async () => {
      var tablenames = [];
      var data = [];
      var array_of_table = await gettablenames();
      if(req.cookies.user!='admin'){
        array_of_table.shift();
      }
      for (element of array_of_table) {
        for (key in element) {
          tablenames.push(element[key]);
          var object_of_data = await getcolumndata(element, key);
          data.push(object_of_data);
        }
      }
      var newarr = [tablenames, data];
      return newarr;
    };

    const start = async () => {
      var newarr = await allfunct();
      var tablenames = newarr[0];
      var data = newarr[1];
      res.render("tables", {
        user: req.cookies.user,
        data: data,
        tablenames: tablenames,
        cond: "table",
      });
    };
    start();
  } else {
    res.redirect("/");
  }
});

module.exports = router;
