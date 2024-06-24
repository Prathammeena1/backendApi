exports.settoken = async (student, statusCode, res, req) => {
  
  const token = await student.getJwtToken();
  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure:true
  };
  
  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({ success: true, id: student._id, token });
};
