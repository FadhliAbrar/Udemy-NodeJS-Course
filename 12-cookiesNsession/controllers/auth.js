const User = require("../models/user");

exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: false,
  });
};
// dengan adanya session, kita tidak perlu lagi merequest cookies pada browser.
// kita hanya perlu melakkan request pada server

exports.postLogin = (req, res, next) => {
  User.findById("60467058e9619b4a30807ad3")
    .then((user) => {
      req.session.user = user;
      req.session.isLoggedIn = true;
      res.redirect("/");
    })
    .catch((err) => console.log(err));
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    res.redirect("/");
    console.log(err);
  });
};
