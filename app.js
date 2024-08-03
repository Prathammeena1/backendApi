require("dotenv").config("path", "./.env");
const express = require("express");
const app = express();


const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:5173', // Replace with your frontend domain
  credentials: true
}));


// db connection
require("./models/databaseConnection.js").databaseConnection();

// logger
app.use(require("morgan")("dev"));

// bodyParser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// session
const expressSession = require("express-session");
app.use(
  expressSession({
    resave: true,
    saveUninitialized: true,
    secret: process.env.EXPRESS_SESSION_SECRET,
  })
);
// cookie parser
const cookieParser = require('cookie-parser');
app.use(cookieParser());
// express-fileupload
const fileupload = require("express-fileupload");
app.use(fileupload());


// routes
app.use("/", require("./routes/indexRouter.js"));
app.use("/resume", require("./routes/resumeRouter.js"));
app.use("/employee", require("./routes/employeeRouter.js"));

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
