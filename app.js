require('dotenv').config('path','./.env')
const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(morgan('dev'))

app.use('/',require('./routes/indexRouter.js'));





const ErrorHandler = require('./utils/errorHandler.js');
const { generateError } = require('./middlewares/error.js');
app.all('*',(req, res,next) => {
    next(new ErrorHandler(`Requested URL ${req.url} Not Found`,404))
})
app.use(generateError)

app.listen(process.env.PORT,console.log(`server listening on port ${process.env.PORT}`));