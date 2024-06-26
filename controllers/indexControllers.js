const { catchAsyncError } = require("../middlewares/catchAsyncError");
const studentModel = require("../models/studentModel");
const internshipModel = require("../models/internshipModel");
const jobModel = require("../models/jobModel");
const { SendMail } = require("../utils/SendMail");
const { settoken } = require("../utils/SetToken");
const ErrorHandler = require("../utils/errorHandler");
const path = require("path");
const imagekit = require("../utils/ImageKit").initImageKit();

exports.homepage = catchAsyncError(async (req, res, next) => {
  const student = await studentModel.findById(req.id);
  res.status(200).json({ success: true, message: "Protected Homepage",student });
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
  await studentModel.findByIdAndUpdate(req.params.id, req.body).exec();
  res
    .status(200)
    .json({ success: true, message: "student updated successfully" });
});

exports.studentAvatar = catchAsyncError(async (req, res, next) => {
  const student = await studentModel.findById(req.params.id);
  const file = req.files.avatar;
  const modifiedFileName = `resumebuilder-${Date.now()}${path.extname(
    file.name
  )}`;

  const { fileId, url } = await imagekit.upload({
    file: file.data,
    fileName: modifiedFileName,
  });

  if (student.avatar.fileId !== "") {
    await imagekit.deleteFile(student.avatar.fileId);
  }

  student.avatar = { fileId, url };
  await student.save();

  res.json({ student });
});

exports.studentApplyInternship = catchAsyncError(async (req, res, next) => {
  const student = await studentModel.findById(req.id);
  const internship = await internshipModel.findById(req.params.id);
  student.internships.push(internship._id);
  internship.students.push(student._id);
  await student.save();
  await internship.save();
  res.json({ student });
});

exports.studentApplyJob = catchAsyncError(async (req, res, next) => {
  const student = await studentModel.findById(req.id);
  const job = await jobModel.findById(req.params.id);
  student.jobs.push(job._id);
  job.students.push(student._id);
  await student.save();
  await job.save();
  res.json({ student });
});
