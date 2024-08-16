const { catchAsyncError } = require("../middlewares/catchAsyncError");
const studentModel = require("../models/studentModel");
const internshipModel = require("../models/internshipModel");
const jobModel = require("../models/jobModel");
const { SendMail } = require("../utils/SendMail");
const { settoken } = require("../utils/SetToken");
const ErrorHandler = require("../utils/errorHandler");
const path = require("path");
const imagekit = require("../utils/ImageKit").initImageKit();

exports.getAllInternships = catchAsyncError(async (req, res, next) => {
  const internships = await internshipModel.find();
  res.status(200).json({ success: true, message: "All internships",internships });
});

