const express = require("express");
const {
    getAllInternships
} = require("../controllers/internships.js");
const { isAuthenticated } = require("../middlewares/auth");
const router = express.Router();

// GET /
router.get("/internship/all", getAllInternships);

module.exports = router;
