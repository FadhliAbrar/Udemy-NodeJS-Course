const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
//Databases
const mongoose = require("mongoose");
//Collection
const User = require("./models/user");
//Template Engines for views
app.set("view engine", "ejs");
app.set("views", "views");
//Routes
const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const errorRoutes = require("./routes/error");

//Util
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
//Dummy Request
app.use((req, res, next) => {
  User.findById("60467058e9619b4a30807ad3")
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});

//Middleware Routes
app.use("/admin", adminData.routes);
app.use(shopRoutes);
app.use(errorRoutes);
//Mensinkronkan database
mongoose
  .connect(
    "mongodb+srv://fantastic099:kraken1288@cluster0.lrvnf.mongodb.net/shop"
  )
  .then(() => {
    User.findOne().then((users) => {
      if (!users) {
        const user = new User({
          username: "Fadhli Abrar",
          email: "abrar.fadhil.fa@gmail.com",
          cart: {
            items: [],
          },
        });
        user.save();
      }
    });
    app.listen(3000);
  })
  .catch();
