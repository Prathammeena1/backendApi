const express = require("express");
const {
  homepage,
  studentSignup,
  studentSignin,
  studentSignout,
  studentSendmail,
  studentForgetLink,
  studentResetPassword,
  studentUpdate,
  studentAvatar,
  studentApplyInternship,
  studentApplyJob,
} = require("../controllers/indexControllers");
const { isAuthenticated } = require("../middlewares/auth");
const router = express.Router();

// GET /
router.get("/student",isAuthenticated, homepage);

// POST /student/signup
router.post("/student/signup", studentSignup);

// POST /student/signin
router.post("/student/signin", studentSignin);

// GET /student/signout
router.get("/student/signout",isAuthenticated, studentSignout);

// POST /student/send-mail
router.post("/student/sendmail", studentSendmail);

// GET /student/forget-link/:id
router.get("/student/forget-link/:id", studentForgetLink);

// POST /student/reset-password
router.post("/student/resetpassword/:id",isAuthenticated, studentResetPassword);

// POST /student/update
router.post("/student/update/:id",isAuthenticated, studentUpdate);

// POST /student/update
router.post("/student/avatar/:id",isAuthenticated, studentAvatar);


// ----------------------------apply internships ---------------------------- 

// POST /student/apply/internship/:id
router.post("/student/apply/internship/:id",isAuthenticated, studentApplyInternship);

// POST /student/apply/job/:id
router.post("/student/apply/job/:id",isAuthenticated, studentApplyJob);

module.exports = router;
