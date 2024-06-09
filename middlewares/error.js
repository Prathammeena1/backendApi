module.exports = (err,req,res,next) => {


    if(err.name == 'MongoServerError' && err.message.includes('E11000 duplicate key')) {
        err.message = "Student with this email address already exists"
    }


    res.status(err.statusCode || 500).json({
        message:err.message,
        errName:err.name
    })
}