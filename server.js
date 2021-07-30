// IMPORT FILES
const { getConnection } = require("./connection/connection");
const configPort = require("./config/index");
const {databaseCheck} = require("./controller/dbCheck")

// IMPORT LIBRARIES
const express = require("express");

// CONNECTION TO MONGOOSE
getConnection();

// PIPELINING OF FUNCTIONS
const app = express();
app.use(express.json());

// DB CHECK
databaseCheck()

// CREATE SERVER
const server = app.listen(configPort.SERVER_PORT, () => {
  console.log(`Server: ${configPort.SERVER_PORT}`);
});

// EXPORT SERVER
module.exports = server