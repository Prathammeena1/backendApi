const jwt = require('jsonwebtoken')
const ErrorHandler = require('../utils/errorHandler')
const { catchAsyncError } = require('./catchAsyncError')


exports.isAuthenticated = catchAsyncError(async (req,res,next)=>{
    const {token}= req.cookies

    console.log(req.cookies)
    
    if(!token) return next(new ErrorHandler ("Please Login to access the resource.",401))
    
    const {id} = jwt.verify(token, process.env.JWT_SECRET_KEY)
    req.id = id;
    next()

}) 