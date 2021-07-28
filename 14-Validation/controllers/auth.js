const User = require("../models/user");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

const transport = nodemailer.createTransport({
  host: "mail.smtp2go.com",
  port: 2525, // 2525, 8025, 587 and 25 can also be used.
  auth: {
    user: "student.uin-suka.ac.id",
    pass: "m4HzDdjR6BJi",
  },
});

exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: false,
    errorMessage: req.flash("error"),
    successMessage: req.flash("success"),
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
        req.flash("error", "Akun anda tidak ditemukan, silahkan daftar");
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
            req.flash("error", "Password anda salah!");
            return res.redirect("/login");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch();
};

exports.getReset = (req, res, next) => {
  res.render("auth/reset", {
    path: "/login",
    pageTitle: "Reset Password",
    errorMessage: req.flash("error"),
    successMessage: req.flash("success"),
  });
};

exports.postReset = (req, res, next) => {
  crypto.randomBytes(32, (err, buff) => {
    if (err) {
      console.log(err);
      return res.redirect("/login");
    }
    const token = buff.toString("hex");
    User.findOne({ email: req.body.email })
      .then((user) => {
        if (!user) {
          req.flash("error", "User not found!");
          return res.redirect("/login");
        }
        user.resetToken = token;
        user.resetTokenExpiration = Date.now() + 1800000;
        return user.save();
      })
      .then(() => {
        req.flash("success", "We sent you a token on your email!");
        res.redirect("/login");
        return transport.sendMail({
          from: "stupidlearner0407@gmail.com",
          to: req.body.email,
          subject: "Password reset request!",
          html: ` <p>You have requested for password reset, if you don't.. ignore this email.</p>
                  <p>Here's your link: <a href="http://localhost:3000/reset-password/${token}">${token}</a></p>
                `,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

exports.getPasswordReset = (req, res, next) => {
  User.findOne({
    resetToken: req.params.resetToken,
    resetTokenExpiration: { $gt: Date.now() },
  })
    .then((user) => {
      if (!user) {
        req.flash("error", "Your token out of time!");
        return res.redirect("/login");
      }
      res.render("auth/update-password", {
        path: "/new-password",
        pageTitle: "New Password",
        errorMessage: req.flash("error"),
        userId: user._id.toString(),
        queryParameter: req.params.resetToken,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postPasswordReset = (req, res, next) => {
  const newPassword = req.body.password;
  let newUser;
  User.findOne({
    _id: req.body.userId,
    resetToken: req.params.resetToken,
    resetTokenExpiration: { $gt: Date.now() },
  })
    .then((user) => {
      if (!user) {
        req.flash("error", "Your token out of time!");
        return res.redirect("/login");
      }
      newUser = user;
      return bcrypt.hash(newPassword, 12);
    })
    .then((hashedPassword) => {
      newUser.password = hashedPassword;
      newUser.resetToken = undefined;
      newUser.resetTokenExpiration = undefined;
      return newUser.save();
    })
    .then(() => {
      req.flash("success", "Your password changed!");
      return res.redirect("/login");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getSignup = (req, res, next) => {
  res.render("auth/signup", {
    path: "/signup",
    pageTitle: "Sign Up",
    isAuthenticated: false,
    errorMessage: req.flash("error"),
  });
};

exports.postSignup = (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  if (password != confirmPassword) {
    req.flash("error", "Password doesn't match!");
    return res.redirect("/signup");
  }
  User.findOne({ email: email })
    .then((user) => {
      if (user) {
        req.flash("error", "Email already taken!");
        return res.redirect("/signup");
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
          return transport.sendMail({
            to: email,
            from: "stupidlearner0407@gmail.com",
            subject: "Your account was created!",
            html: `<h1>Selamat datang ${username}</h1>`,
          });
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
