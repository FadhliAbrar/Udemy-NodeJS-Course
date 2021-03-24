const User = require("../models/user");
const bcrypt = require("bcryptjs");

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
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        return res.redirect("/signup");
      }
      bcrypt
        .compare(password, user.password)
        .then((kalauBenar) => {
          if (kalauBenar) {
            req.session.user = user;
            req.session.isLoggedIn = true;
            res.redirect("/");
          } else {
            res.redirect("/login");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch();
};

exports.getSignup = (req, res, next) => {
  res.render("auth/signup", {
    path: "/signup",
    pageTitle: "Sign Up",
    isAuthenticated: false,
  });
};

exports.postSignup = (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  if (password != confirmPassword) {
    return res.redirect("/signup");
  }
  User.findOne({ email: email })
    .then((user) => {
      if (user) {
        return res.redirect("/login");
      }
      return bcrypt
        .hash(password, 12)
        .then((hashedPassword) => {
          const newUser = new User({
            username: username,
            email: email,
            password: hashedPassword,
          });
          return newUser.save();
        })
        .then(() => {
          res.redirect("login");
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    res.redirect("/");
    console.log(err);
  });
};
