const { catchAsyncError } = require("../middlewares/catchAsyncError");
const studentModel = require("../models/studentModel");
const ErrorHandler = require("../utils/errorHandler");

exports.resume = catchAsyncError(async (req, res, next) => {
  const {resume} = await studentModel.findById(req.id).exec();
  res.status(200).json({resume });
});
