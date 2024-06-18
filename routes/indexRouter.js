const express = require("express");
const {
  homepage,
  studentSignup,
  studentSignin,
  studentSignout,
  studentSendmail,
  studentForgetLink
} = require("../controllers/indexControllers");
const { isAuthenticated } = require("../middlewares/auth");
const router = express.Router();

// GET /
router.get("/",isAuthenticated, homepage);

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

module.exports = router;
