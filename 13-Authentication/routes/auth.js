const express = require("express");

const authController = require("../controllers/auth");
const auth = require("../middleware/is-auth");

const router = express.Router();

router.get("/login", auth.isLoggedIn, authController.getLogin);

router.post("/login", auth.isLoggedIn, authController.postLogin);

router.get("/signup", auth.isLoggedIn, authController.getSignup);

router.post("/signup", auth.isLoggedIn, authController.postSignup);

router.post("/logout", authController.postLogout);

module.exports = router;
