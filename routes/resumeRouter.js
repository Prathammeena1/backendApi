const express = require("express");
const { isAuthenticated } = require("../middlewares/auth");
const router = express.Router();
const {
  resume,
  addEducation,
  editEducation,
  deleteEducation,
} = require("../controllers/resumeControllers");

// GET /
router.get("/", isAuthenticated, resume);

// POST /
router.post("/add-education", isAuthenticated, addEducation);

// POST /
router.post("/edit-education/:educationId", isAuthenticated, editEducation);

// POST /
router.post("/delete-education/:educationId", isAuthenticated, deleteEducation);

module.exports = router;
