const { catchAsyncError } = require("../middlewares/catchAsyncError");
const studentModel = require("../models/studentModel");
const ErrorHandler = require("../utils/errorHandler");

exports.homepage = catchAsyncError(async (req, res, next) => {
  res.status(200).json({ success: true, message: "Homepage" });
});

exports.studentSignup = catchAsyncError(async (req, res, next) => {
  const student = await new studentModel(req.body).save();
  res.status(200).json(student);
});

exports.studentSignin = catchAsyncError(async (req, res, next) => {
  const student = await studentModel
    .findOne({ email: req.body.email })
    .select("+password")
    .exec();

  if (!student)
    return next(
      new ErrorHandler(
        `User not registered with this email address: ${req.body.email}`,
        404
      )
    );

  const isMatched =await student.comparePassword(req.body.password);
  if (!isMatched) return next(new ErrorHandler("Password do not matched", 404));


  res.json(student);
});

exports.studentSignout = catchAsyncError(async (req, res) => {});
