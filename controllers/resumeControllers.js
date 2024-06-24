const { catchAsyncError } = require("../middlewares/catchAsyncError");
const studentModel = require("../models/studentModel");
const ErrorHandler = require("../utils/errorHandler");
const { v4: uuidv4 } = require("uuid");

exports.resume = catchAsyncError(async (req, res, next) => {
  const { resume } = await studentModel.findById(req.id).exec();
  res.status(200).json({ resume });
});

// -------------------------------Education-----------------------------------

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
  student.resume.education = filteredEducation;
  await student.save();
  res.status(200).json({ message: "education deleted successfully!" });
});

// -------------------------------Jobs-----------------------------------

exports.addJobs = catchAsyncError(async (req, res, next) => {
  const student = await studentModel.findById(req.id).exec();
  student.resume.jobs.push({ ...req.body, id: uuidv4() });
  await student.save();
  res.status(200).json({ message: "Jobs added successfully!" });
});

exports.editJobs = catchAsyncError(async (req, res, next) => {
  const student = await studentModel.findById(req.id).exec();
  const index = student.resume.jobs.findIndex((e) => e.id == req.params.jobId);
  student.resume.jobs[index] = {
    ...student.resume.jobs[index],
    ...req.body,
  };
  await student.save();
  res.status(200).json({ message: "jobs edited successfully!" });
});

exports.deleteJobs = catchAsyncError(async (req, res, next) => {
  const student = await studentModel.findById(req.id).exec();
  const filteredJobs = student.resume.jobs.filter(
    (e) => e.id !== req.params.jobId
  );
  student.resume.jobs = filteredJobs;
  await student.save();
  res.status(200).json({ message: "jobs deleted successfully!" });
});


// -------------------------------Internships-----------------------------------

exports.addinternships = catchAsyncError(async (req, res, next) => {
  const student = await studentModel.findById(req.id).exec();
  student.resume.internships.push({ ...req.body, id: uuidv4() });
  await student.save();
  res.status(200).json({ message: "internships added successfully!" });
});

exports.editinternships = catchAsyncError(async (req, res, next) => {
  const student = await studentModel.findById(req.id).exec();
  const index = student.resume.internships.findIndex((e) => e.id == req.params.internshipId);
  student.resume.internships[index] = {
    ...student.resume.internships[index],
    ...req.body,
  };
  await student.save();
  res.status(200).json({ message: "internships edited successfully!" });
});

exports.deleteinternships = catchAsyncError(async (req, res, next) => {
  const student = await studentModel.findById(req.id).exec();
  const filteredinternships = student.resume.internships.filter(
    (e) => e.id !== req.params.internshipId
  );
  student.resume.internships = filteredinternships;
  await student.save();
  res.status(200).json({ message: "internships deleted successfully!" });
});
