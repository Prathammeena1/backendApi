const mongoose = require("mongoose");

const internshipSchema = new mongoose.Schema(
  {
    image: {
      type: Object,
      default: {
        fileId: '',
        url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      }
    },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
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
      amount: {
        type: String,
        default: null,
        required: function() {
          return this.stipend.status !== "Unpaid";
        }
      },
    },
    perks: String,
    assessment: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Internship", internshipSchema);
