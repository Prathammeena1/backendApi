const express = require("express");
const {
  homepage,
  employeeSignup,
  employeeSignin,
  employeeSignout,
  employeeSendmail,
  employeeForgetLink,
  employeeResetPassword,
  employeeUpdate,
  employeeOrganisationlogo,
  createInternship,
  readInternship,
  readSingleInternship,
  createJob,
  readJob,
  readSingleJob,
} = require("../controllers/employeeControllers");
const { isAuthenticated } = require("../middlewares/auth");
const router = express.Router();

// GET /
router.get("/", isAuthenticated, homepage);

// POST /signup
router.post("/signup", employeeSignup);

// POST /signin
router.post("/signin", employeeSignin);

// GET /signout
router.get("/signout",isAuthenticated, employeeSignout);

// POST /send-mail
router.post("/sendmail", employeeSendmail);

// GET /forget-link/:id
router.get("/forget-link/:id", employeeForgetLink);

// POST /reset-password
router.post("/resetpassword/:id",isAuthenticated, employeeResetPassword);

// POST /update
router.post("/update/:id",isAuthenticated, employeeUpdate);

// POST /oreganisationlog/:id
router.post("/organisationlogo/:id",isAuthenticated, employeeOrganisationlogo);


// ----------------------------------------- internships -------------------------------


// POST /internship/create
router.post("/internship/create",isAuthenticated, createInternship);

// POST /internship/read/
router.post("/internship/read/",isAuthenticated, readInternship);

// POST /internship/read/:id
router.post("/internship/read/:id",isAuthenticated, readSingleInternship);



// ----------------------------------------- jobs -------------------------------


// POST /job/create
router.post("/job/create",isAuthenticated, createJob);

// POST /job/read/
router.post("/job/read/",isAuthenticated, readJob);

// POST /job/read/:id
router.post("/job/read/:id",isAuthenticated, readSingleJob);

module.exports = router;
