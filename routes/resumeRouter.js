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
  addinternships,
  editinternships,
  deleteinternships,
  addResponsibilities,
  editResponsibilities,
  deleteResponsibilities,
  addCourses,
  editCourses,
  deleteCourses,
  addProjects,
  editProjects,
  deleteProjects,
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


// -----------------------------internships --------------------------------

// POST /
router.post("/add-internships/", isAuthenticated, addinternships);

// POST /
router.post("/edit-internships/:internshipId", isAuthenticated, editinternships);

// POST /
router.post("/delete-internships/:internshipId", isAuthenticated, deleteinternships);

// -----------------------------responsibilities --------------------------------

// POST /
router.post("/add-responsibilities/", isAuthenticated, addResponsibilities);

// POST /
router.post("/edit-responsibilities/:responsibilitiesId", isAuthenticated, editResponsibilities);

// POST /
router.post("/delete-responsibilities/:responsibilitiesId", isAuthenticated, deleteResponsibilities);


// -----------------------------courses --------------------------------

// POST /
router.post("/add-courses/", isAuthenticated, addCourses);

// POST /
router.post("/edit-courses/:coursesId", isAuthenticated, editCourses);

// POST /
router.post("/delete-courses/:coursesId", isAuthenticated, deleteCourses);




// -----------------------------projects --------------------------------

// POST /
router.post("/add-projects/", isAuthenticated, addProjects);

// POST /
router.post("/edit-projects/:projectsId", isAuthenticated, editProjects);

// POST /
router.post("/delete-projects/:projectsId", isAuthenticated, deleteProjects);


module.exports = router;
