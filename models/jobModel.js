const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    employee: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
    title: String,
    type: {
      type: String,
      enum: ["In office", "remote"],
    },
    openings: Number,
    skills: String,
    description:String,
    preferences:String,
    salary:Number,
    perks: String,
    assessment: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);
