const express = require("express");
const { isAuthenticated } = require("../middlewares/auth");
const router = express.Router();
const {
  resume,
  addEducation,
  editEducation,
  deleteEducation,
  addJobs,
  editJobs,
  deleteJobs,
} = require("../controllers/resumeControllers");

// GET /
router.get("/", isAuthenticated, resume);


// -----------------------------education --------------------------------

// POST /
router.post("/add-education", isAuthenticated, addEducation);

// POST /
router.post("/edit-education/:educationId", isAuthenticated, editEducation);

// POST /
router.post("/delete-education/:educationId", isAuthenticated, deleteEducation);

// -----------------------------jobs --------------------------------

// POST /
router.post("/add-jobs/", isAuthenticated, addJobs);

// POST /
router.post("/edit-jobs/:jobId", isAuthenticated, editJobs);

// POST /
router.post("/delete-jobs/:jobId", isAuthenticated, deleteJobs);


module.exports = router;
