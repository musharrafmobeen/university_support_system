const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check_auth');
const grievanceControllers = require('../controllers/grievances');
const imageHandler = require("../utils/imageHandler");


router.get("/", grievanceControllers.get_Grievances);
router.get("/androidApp", grievanceControllers.get_Grievances_Mobile);
router.get("/androidApp/:lodgerID", grievanceControllers.get_Certain_Grievances_Mobile);
router.get("/androidApp/incharge/:staffID", grievanceControllers.get_Staff_Grievances_Mobile);
router.post("/" , grievanceControllers.add_Grievance);
router.get("/:grievanceData", grievanceControllers.get_A_Grievance );
router.patch("/:grievanceData", grievanceControllers.update_Grievance);
router.delete("/:grievanceData", grievanceControllers.delete_Grievance);
module.exports = router;
