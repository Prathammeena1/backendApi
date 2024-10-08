const { catchAsyncError } = require("../middlewares/catchAsyncError");
const employeeModel = require("../models/employeeModel");
const jobModel = require("../models/jobModel");
const internshipModel = require("../models/internshipModel");
const { SendMail } = require("../utils/SendMail");
const { settoken } = require("../utils/SetToken");
const ErrorHandler = require("../utils/errorHandler");
const path = require("path");
const imagekit = require("../utils/ImageKit").initImageKit();

exports.homepage = catchAsyncError(async (req, res, next) => {
  const employee = await employeeModel.findById(req.id).exec();
  res.status(200).json({ success: true, message: "Protected employee Homepage",employee });
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

exports.employeeOrganisationlogo = catchAsyncError(async (req, res, next) => {
  const employee = await employeeModel.findById(req.params.id);
  const file = req.files.organisationlogo;
  const modifiedFileName = `resumebuilder-${Date.now()}${path.extname(
    file.name
  )}`;

  const { fileId, url } = await imagekit.upload({
    file: file.data,
    fileName: modifiedFileName,
  });

  if (employee.organisationlogo.fileId !== "") {
    await imagekit.deleteFile(employee.organisationlogo.fileId);
  }

  employee.organisationlogo = { fileId, url };
  await employee.save();

  res.json({ employee });
});

// -----------------------------------------------------internships --------------------------------

exports.createInternship = catchAsyncError(async (req, res, next) => {
  const employee = await employeeModel.findById(req.id); // Get the employee by ID

  // console.log(req.files)
  const file = req.files.image; // Access the uploaded file
  
  // console.log(path.extname(file.name))

  if (!file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const modifiedFileName = `internship-${Date.now()}${path.extname(file.name)}`;

  const { fileId, url } = await imagekit.upload({
    file: file.data,
    fileName: modifiedFileName,
  });

  // console.log(req.body)

  const newInternship = new internshipModel({
    ...req.body,
    employee: employee._id,
    image: { fileId, url }, // Store the file ID and URL
  });
  await newInternship.save();

  employee.internships.push(newInternship._id);
  await employee.save();

  res.status(201).json({ employee, newInternship });
});

exports.readInternship = catchAsyncError(async (req, res, next) => {
  const {internships} = await employeeModel.findById(req.id).populate('internships');
  res.status(200).json({ internships });
});

exports.readSingleInternship = catchAsyncError(async (req, res, next) => {
  const internship = await internshipModel.findById(req.params.id);
  res.status(200).json({ internship });
});


//  ----------------------------------------------------------------jobs ----------------------------------------------------------------

exports.createJob = catchAsyncError(async (req, res, next) => {
  const employee = await employeeModel.findById(req.id); // Get the employee by ID

  const file = req.files.image; // Access the uploaded file
  // console.log(file)
  
  
  if (!file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  
  const modifiedFileName = `job-${Date.now()}${path.extname(file.name)}`;
  
  const { fileId, url } = await imagekit.upload({
    file: file.data,
    fileName: modifiedFileName,
  });
  
  const newJob = new jobModel({
    ...req.body,
    employee: employee._id,
    image: { fileId, url }, // Store the file ID and URL
  });

  await newJob.save();

  // console.log(newJob)

  employee.jobs.push(newJob._id);
  await employee.save();

  res.status(201).json({ employee, newJob });
});

exports.readJob = catchAsyncError(async (req, res, next) => {
  const {jobs} = await employeeModel.findById(req.id).populate('jobs');
  res.status(200).json({ jobs });
});

exports.readSingleJob = catchAsyncError(async (req, res, next) => {
  const job = await jobModel.findById(req.params.id);
  res.status(200).json({ job });
});
