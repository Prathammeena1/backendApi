const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const studentSchema = new mongoose.Schema(
  {
    firstname:{
      type: String,
      required: [true, "First Name is required"],
      trim: true,
    },
    lastname:{
      type: String,
      required: [true, "Last Name is required"],
      trim: true,
    },
    contact:{
      type: String,
      required: [true, "First Name is required"],
      trim: true,
      maxLength:[12,'Contact must not exceed 12 characters'],
      mixLength:[10,'Contact should atleast contain 10 characters'],
    },
    city:{
      type: String,
      required: [true, "City is required"],
      trim: true,
    },
    gender:{
      type:String,
      enum: ["Male", "Female", "Others"],
      required:[true, "Gender is required"]
    },
    email: {
      type: String,
      required: [true, "Email address id required"],
      trim: true,
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    resetPasswordToken: {
      type:Number,
      default: 0,
    },
    avatar:{
      type:Object,
      default:{
        fileId:'',
        url:'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      }
    },
    resume:{
      education:[],
      jobs:[],
      internships:[],
      responsibilities:[],
      courses:[],
      projects:[],
      skills:[],
      accomplishments:[],
    },
    internships:[
      {type:mongoose.Schema.Types.ObjectId,ref:'Internship'}
  ],
  jobs:[
      {type:mongoose.Schema.Types.ObjectId,ref:'Job'}
  ]
  },
  { timestamps: true }
);

studentSchema.pre("save", function () {
  if (!this.isModified("password")) return;

  let salt = bcrypt.genSaltSync(10);
  this.password = bcrypt.hashSync(this.password, salt);
});

studentSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

studentSchema.methods.getJwtToken = async function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE_TIME,
  });
};

module.exports = mongoose.model("Student", studentSchema);
