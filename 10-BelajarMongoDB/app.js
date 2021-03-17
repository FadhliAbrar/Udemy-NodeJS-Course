const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
//Databases
const mongoConnect = require("./util/database").mongoConnect;
//Collection
const User = require("./models/user");

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
  User.findById("6041e6c24f0c19b86af693b3")
    .then((user) => {
      req.user = new User(user.username, user.email, user.cart, user._id);
      next();
    })
    .catch((err) => console.log(err));
});

//Middleware Routes
app.use("/admin", adminData.routes);
app.use(shopRoutes);
app.use(errorRoutes);

//Mensinkronkan database
mongoConnect((result) => {
  app.listen(3000);
  // console.log(result);
});
