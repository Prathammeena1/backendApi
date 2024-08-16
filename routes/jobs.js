const express = require("express");
const {
    getAllJobs
} = require("../controllers/jobs.js");
const { isAuthenticated } = require("../middlewares/auth.js");
const router = express.Router();

// GET /
router.get("/job/all", getAllJobs);

module.exports = router;
