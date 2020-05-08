const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const port = process.env.PORT || 8000;
var routesRouter = require("./routes/routes");
const mongoose = require("mongoose");
const app = express();
var cors = require("cors");
const ReceiptModel = require("./models/ReceiptModel");

// the __dirname is the current directory from where the script is running
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", routesRouter);

app.use(
  multer({
    dest: "./uploads/",
    rename: function (fieldname, filename) {
      return filename;
    },
  })
);

app.post("/api/photo", function (req, res) {
  var newItem = new ReceiptModel();
  newItem.img.data = fs.readFileSync(req.files.userPhoto.path);
  newItem.img.contentType = "image/png";
  newItem.save();
});

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
