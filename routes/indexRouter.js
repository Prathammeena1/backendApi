const express = require("express");
const {
  homepage,
  studentSignup,
  studentSignin,
  studentSignout,
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

module.exports = router;
