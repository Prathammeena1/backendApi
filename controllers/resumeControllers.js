const { catchAsyncError } = require("../middlewares/catchAsyncError");
const studentModel = require("../models/studentModel");
const ErrorHandler = require("../utils/errorHandler");
const { v4: uuidv4 } = require("uuid");

exports.resume = catchAsyncError(async (req, res, next) => {
  const { resume } = await studentModel.findById(req.id).exec();
  res.status(200).json({ resume });
});

exports.addEducation = catchAsyncError(async (req, res, next) => {
  const student = await studentModel.findById(req.id).exec();
  student.resume.education.push({ ...req.body, id: uuidv4() });
  await student.save();
  res.status(200).json({ message: "education added successfully!" });
});

exports.editEducation = catchAsyncError(async (req, res, next) => {
  const student = await studentModel.findById(req.id).exec();

  const index = student.resume.education.findIndex(
    (e) => e.id == req.params.educationId
  );
  student.resume.education[index] = {
    ...student.resume.education[index],
    ...req.body,
  };
  await student.save();
  res.status(200).json({ message: "education edited successfully!" });
});

exports.deleteEducation = catchAsyncError(async (req, res, next) => {
  const student = await studentModel.findById(req.id).exec();
  const filteredEducation = student.resume.education.filter(
    (e) => e.id !== req.params.educationId
  );
  student.resume.education = filteredEducation
  await student.save();
  res.status(200).json({ message: "education deleted successfully!" });
});
