const { catchAsyncError } = require("../middlewares/catchAsyncError");
const studentModel = require("../models/studentModel")

exports.homepage = catchAsyncError(async (req, res) => {
  res.status(200).json({ success: true, message: "Homepage" });
});

exports.studentSignup = catchAsyncError(async (req, res) => {
    const student = await new studentModel(req.body).save();
    res.status(200).json(student)
});
