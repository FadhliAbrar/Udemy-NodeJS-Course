const express = require("express");
const { check } = require("express-validator");

const authController = require("../controllers/auth");
const auth = require("../middleware/is-auth");

const router = express.Router();

router.get("/login", auth.isLoggedIn, authController.getLogin);

router.post("/login", auth.isLoggedIn, authController.postLogin);

router.get("/reset-password", auth.isLoggedIn, authController.getReset);

router.post("/reset-password", auth.isLoggedIn, authController.postReset);

router.get(
  "/reset-password/:resetToken",
  auth.isLoggedIn,
  authController.getPasswordReset
);

router.post(
  "/reset-password/:resetToken",
  auth.isLoggedIn,
  authController.postPasswordReset
);

router.get("/signup", auth.isLoggedIn, authController.getSignup);

router.post(
  "/signup",
  auth.isLoggedIn,
  check("password", "Minimal panjang password adalah 8 karakter!").isLength({
    min: 8,
  }),
  authController.postSignup
);

router.post("/logout", authController.postLogout);

module.exports = router;
