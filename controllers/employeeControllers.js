const { catchAsyncError } = require("../middlewares/catchAsyncError");
const employeeModel = require("../models/employeeModel");
const { SendMail } = require("../utils/SendMail");
const { settoken } = require("../utils/SetToken");
const ErrorHandler = require("../utils/errorHandler");
const path = require("path");
const imagekit = require("../utils/ImageKit").initImageKit();

exports.homepage = catchAsyncError(async (req, res, next) => {
  res.status(200).json({ success: true, message: "Protected employee Homepage" });
});

exports.employeeSignup = catchAsyncError(async (req, res, next) => {
  const employee = await new employeeModel(req.body).save();
  settoken(employee, 201, res);
});

exports.employeeSignin = catchAsyncError(async (req, res, next) => {
  const employee = await employeeModel
    .findOne({ email: req.body.email })
    .select("+password")
    .exec();

  if (!employee)
    return next(
      new ErrorHandler(
        `User not registered with this email address: ${req.body.email}`,
        404
      )
    );
  const isMatched = await employee.comparePassword(req.body.password);
  if (!isMatched) return next(new ErrorHandler("Password do not matched", 404));
  settoken(employee, 200, res);
});

exports.employeeSignout = catchAsyncError(async (req, res) => {
  res.clearCookie("token");
  res.json({ success: "Successfully signed out!" });
});

exports.employeeSendmail = catchAsyncError(async (req, res, next) => {
  const employee = await employeeModel.findOne({ email: req.body.email }).exec();

  if (!employee)
    return next(
      new ErrorHandler(
        `User not registered with this email address: ${req.body.email}`,
        404
      )
    );

  const url = `${req.protocol}://${req.get("host")}/employee/forget-link/${
    employee._id
  }`;

  SendMail(req, res, next, url);
  employee.resetPasswordToken = 1;
  employee.save();
});

exports.employeeForgetLink = catchAsyncError(async (req, res, next) => {
  const employee = await employeeModel.findById(req.params.id).exec();

  if (!employee)
    return next(
      new ErrorHandler(
        `User not registered with this email address: ${req.body.email}`,
        404
      )
    );

  if (employee.resetPasswordToken == 1) {
    employee.resetPasswordToken = 0;
    employee.password = req.body.password;
    await employee.save();
  } else {
    return next(new ErrorHandler(`Invalid password reset link`, 500));
  }

  res.status(200).json({ message: "password reset successfully" });
});

exports.employeeResetPassword = catchAsyncError(async (req, res, next) => {
  const employee = await employeeModel.findById(req.params.id).exec();
  employee.password = req.body.password;
  await employee.save();
  settoken(employee, 201, res);
});

exports.employeeUpdate = catchAsyncError(async (req, res, next) => {
  await employeeModel.findByIdAndUpdate(req.params.id, req.body).exec();
  res
    .status(200)
    .json({ success: true, message: "employee updated successfully" });
});

// exports.employeeAvatar = catchAsyncError(async (req, res, next) => {
//   const employee = await employeeModel.findById(req.params.id);
//   const file = req.files.avatar;
//   const modifiedFileName = `resumebuilder-${Date.now()}${path.extname(
//     file.name
//   )}`;

//   const { fileId, url } = await imagekit.upload({
//     file: file.data,
//     fileName: modifiedFileName,
//   });

//   if (employee.avatar.fileId !== "") {
//     await imagekit.deleteFile(employee.avatar.fileId);
//   }

//   employee.avatar = { fileId, url };
//   await employee.save();

//   res.json({ employee });
// });
