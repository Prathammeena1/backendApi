const express = require("express");
const { isAuthenticated } = require("../middlewares/auth");
const router = express.Router();
const {resume} = require("../controllers/resumeControllers");

// GET /
router.get("/",isAuthenticated, resume);


module.exports = router;
