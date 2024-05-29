require('dotenv').config('path','./.env')
const express = require('express');
const logger = require('morgan');
const app = express();

app.use(logger('dev'))

app.use('/',require('./routes/indexRouter.js'));


const generateError = require('./middlewares/error.js')
const ErrorHandler = require('./utils/errorHandler.js');
app.all( "*",(req, res, next) => {
    next(new ErrorHandler(`Requested URL Not Found: ${req.url}`,404));
})
app.use(generateError)

app.listen(process.env.PORT,console.log(`server listening on port ${process.env.PORT}`));