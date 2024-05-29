const mongoose = require('mongoose')
const { catchAsyncError } = require('../middlewares/catchAsyncError')

exports.databaseConnection = catchAsyncError(async()=>{
    await mongoose.connect(process.env.MONGODBURL)
    console.log('Database Connection Established!')
})