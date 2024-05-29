const mongoose = require("mongoose");

exports.databaseConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODBURL);
    console.log("Database Connection Established!");
  } catch (error) {
    console.log(err.message);
  }
};
