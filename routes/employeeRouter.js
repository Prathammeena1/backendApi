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

// POST /update
router.post("/organisationlogo/:id",isAuthenticated, employeeOrganisationlogo);

module.exports = router;
