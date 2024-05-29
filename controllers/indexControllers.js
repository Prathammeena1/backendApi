const { catchAsyncError } = require("../middlewares/catchAsyncError");

exports.homepage = catchAsyncError(async (req, res) => {
  res.status(200).json({ success: true, message: "Homepage" });
});

exports.studentSignup = catchAsyncError(async (req, res) => {
    res.json(req.body)
});
