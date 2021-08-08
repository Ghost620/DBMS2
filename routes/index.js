var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  if(req.cookies.stat=='active'){
    res.redirect('/tables');
  }else{
    res.render("login", { title: "Login to WIMS"});
  }
});

router.get("/team", function (req, res, next) {
  if(req.cookies.stat=='active'){
    res.render('team', {user: req.cookies.user});
  }else{
    res.render("login", { title: "Login to WIMS"});
  }
});

router.get("/about", function (req, res, next) {
  if(req.cookies.stat=='active'){
    res.render('about', {user: req.cookies.user});
  }else{
    res.render("login", { title: "Login to WIMS"});
  }
});

router.get("/contactUs", function (req, res, next) {
  if(req.cookies.stat=='active'){
    res.render('contact', {user: req.cookies.user});
  }else{
    res.render("login", { title: "Login to WIMS"});
  }
});

module.exports = router;