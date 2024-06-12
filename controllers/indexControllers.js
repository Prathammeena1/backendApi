const { catchAsyncError } = require("../middlewares/catchAsyncError");
const studentModel = require("../models/studentModel");
const { settoken } = require("../utils/SetToken");
const ErrorHandler = require("../utils/errorHandler");

exports.homepage = catchAsyncError(async (req, res, next) => {
  res.status(200).json({ success: true, message: "Homepage" });
});

exports.studentSignup = catchAsyncError(async (req, res, next) => {
  const student = await new studentModel(req.body).save();
  settoken(student, 201, res);
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

  const isMatched = await student.comparePassword(req.body.password);
  if (!isMatched) return next(new ErrorHandler("Password do not matched", 404));

  settoken(student, 200, res);
});

exports.studentSignout = catchAsyncError(async (req, res) => {
  res.clearCookie('token')
  res.json({success:'Successfully signed out!'})
});
