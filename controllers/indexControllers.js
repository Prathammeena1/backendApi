const { catchAsyncError } = require("../middlewares/catchAsyncError");
const studentModel = require("../models/studentModel");
const { SendMail } = require("../utils/SendMail");
const { settoken } = require("../utils/SetToken");
const ErrorHandler = require("../utils/errorHandler");

exports.homepage = catchAsyncError(async (req, res, next) => {
  res.status(200).json({ success: true, message: "Protected Homepage" });
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
  res.clearCookie("token");
  res.json({ success: "Successfully signed out!" });
});

exports.studentSendmail = catchAsyncError(async (req, res, next) => {
  const student = await studentModel.findOne({ email: req.body.email }).exec();

  if (!student)
    return next(
      new ErrorHandler(
        `User not registered with this email address: ${req.body.email}`,
        404
      )
    );

  const url = `${req.protocol}://${req.get("host")}/student/forget-link/${
    student._id
  }`;

  SendMail(req, res, next, url);
  student.resetPasswordToken = 1;
  student.save();
});

exports.studentForgetLink = catchAsyncError(async (req, res, next) => {
  const student = await studentModel.findById(req.params.id).exec();

  if (!student)
    return next(
      new ErrorHandler(
        `User not registered with this email address: ${req.body.email}`,
        404
      )
    );

  if (student.resetPasswordToken == 1) {
    student.resetPasswordToken = 0;
    student.password = req.body.password;
    await student.save();
  } else {
    return next(new ErrorHandler(`Invalid password reset link`, 500));
  }

  res.status(200).json({ message: "password reset successfully" });
});

exports.studentResetPassword = catchAsyncError(async (req, res, next) => {
  const student = await studentModel.findById(req.params.id).exec();
  student.password = req.body.password;
  await student.save();
  settoken(student, 201, res);
});

exports.studentUpdate = catchAsyncError(async (req, res, next) => {
  await studentModel.findByIdAndUpdate(req.params.id,req.body).exec();
  res.status(200).json({success:true,message:'student updated successfully'})
});
