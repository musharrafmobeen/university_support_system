const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check_auth');
const studentControllers = require('../controllers/students');
const imageHandler = require("../utils/imageHandler");



router.get("/", studentControllers.get_Students);
router.get("/rejectedStudents", studentControllers.get_Rejected_Students);
router.get("/approvedStudents", studentControllers.get_Approved_Students);
router.get("/unapprovedStudents", studentControllers.get_Unapproved_Students);
router.post("/", imageHandler.image_Uploader.single('studentImage'), studentControllers.add_A_Student);
router.get("/:studentData", studentControllers.get_A_Student );
router.patch("/:studentData", studentControllers.update_A_Student);
router.delete("/:studentData", studentControllers.delete_A_Student);
module.exports = router;
