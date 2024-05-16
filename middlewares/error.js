exports.generateError = (err, req,res,next)=>{
    const statusCode = err.statusCode || 500;


    res.status(statusCode).json({
        message:err.message,
        erroe:err.name,
        statusCode:err.statusCode
    })
}