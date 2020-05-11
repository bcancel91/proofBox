var MongoClient = require("mongodb").MongoClient;

var db_name = "proofbox";
var db_url =
  "mongodb+srv://kevinkyle4:redondo1@mflix-01nch.mongodb.net/proofbox?retryWrites=true&w=majority";
var db = null;
MongoClient.connect(db_url, function (err, client) {
  db = client.db(db_name);
  console.log("Connected successfully to mongo db...");
});
