// IMPORT FILES
const config = require("../config/index");

// IMPORT LIBRARIES
const mongoose = require("mongoose");

// CONNECTION FUNCTION
function getConnection() {
  const dbUri = config.MONGO_URI;
  mongoose.connect(dbUri,{ useNewUrlParser: true , useUnifiedTopology: true });
  mongoose.connection.on("connected", function () {
    console.log("DB connected");
  });
  mongoose.connection.on("error", function (err) {
    console.log("Mongoose default connection error: "); //+ err.message
  });
  mongoose.connection.on("disconnected", function () {
    console.log("Mongoose default connection disconnected");
  });
}

// EXPORT CONNECTION FUNCTION
module.exports = {
  getConnection,
};