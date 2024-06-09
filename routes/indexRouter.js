const express = require("express");
const {
  homepage,
  studentSignup,
  studentSignin,
  studentSignout,
} = require("../controllers/indexControllers");
const router = express.Router();

// GET /
router.get("/", homepage);

// POST /student/signup
router.post("/student/signup", studentSignup);

// POST /student/signup
router.post("/student/signin", studentSignin);

// GET /student/signup
router.get("/student/signout", studentSignout);

module.exports = router;
