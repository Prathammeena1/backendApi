const {catchAsyncError} = require('../middlewares/catchAsyncError.js');

exports.homepage = catchAsyncError(async(req, res) => {
    res.status(200).json({success:true, message:"Homepage"})
})