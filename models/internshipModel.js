const mongoose = require("mongoose");

const internshipSchema = new mongoose.Schema(
  {
    student: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
    employee: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
    profile: String,
    type: {
      type: String,
      enum: ["In office", "remote"],
    },
    openings: Number,
    skills: String,
    from: String,
    to: String,
    duration: String,
    responsibility: String,
    stipend: {
      status: {
        type: String,
        enum: ["Fixed", "Negotiable", "Performanced Based", "Unpaid"],
      },
      amount: Number,
    },
    perks: String,
    assessment: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Internship", internshipSchema);
