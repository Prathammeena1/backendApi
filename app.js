require("dotenv").config("path", "./.env");
const express = require("express");
const app = express();

// db connection
require("./models/databaseConnection.js").databaseConnection();

// logger
app.use(require("morgan")("dev"));

// bodyParser
app.use(express.json());
app.use(express.urlencoded({extended: false}));



app.use("/", require("./routes/indexRouter.js"));

// error handler
const generateError = require("./middlewares/error.js");
const ErrorHandler = require("./utils/errorHandler.js");
app.all("*", (req, res, next) => {
  next(new ErrorHandler(`Requested URL Not Found: ${req.url}`, 404));
});
app.use(generateError);

// port
app.listen(
  process.env.PORT,
  console.log(`server listening on port ${process.env.PORT}`)
);
