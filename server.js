const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const port = process.env.PORT || 8000;
var routesRouter = require("./routes/routes");
const mongoose = require("mongoose");
const app = express();

var cors = require("cors");

// the __dirname is the current directory from where the script is running
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", routesRouter);

app.use("/uploads", express.static("uploads"));

/* stores image in uploads folder using multer and creates a referene to the file
 */

app.use(express.static(path.join(__dirname, "client/build")));
mongoose
  .connect(
    "mongodb+srv://kevinkyle4:redondo1@mflix-01nch.mongodb.net/proofbox?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  )
  .then(() => {
    app.listen(port, () => console.log(`Listening on port ${port}`));
  })
  .catch((err) => {
    console.log(err);
  });
