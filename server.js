const express = require("express");
const path = require("path");
const passport = require("./passport");
const session = require("express-session");
const bodyParser = require("body-parser");
const routesRouter = require("./routes/routes");
const mongoose = require("mongoose");
var cors = require("cors");
const PORT = process.env.PORT || 8000;
const app = express();

// the __dirname is the current directory from where the script is running
app.use(cors());
app.use(express.json());
app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use("/", routesRouter);

// app.use(express.static(path.join(__dirname, "client/build")));
// mongoose.connect(
//   "mongodb+srv://kevinkyle4:redondo1@mflix-01nch.mongodb.net/proofbox?retryWrites=true&w=majority",
//   { useNewUrlParser: true }
// );
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/proofboxDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(PORT);
