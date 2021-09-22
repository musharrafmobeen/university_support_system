const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check_auth');
const employeeControllers = require('../controllers/employees');
const imageHandler = require("../utils/imageHandler");


router.get("/", employeeControllers.get_Employees);
router.get("/rejectedEmployees", employeeControllers.get_Rejected_Employees);
router.get("/nonStaffEmployees", employeeControllers.get_NonStaffEmployees);
router.get("/approvedEmployees", employeeControllers.get_Approved_Employees);
router.get("/unapprovedEmployees", employeeControllers.get_UnApproved_Employees);
router.post("/" , imageHandler.image_Uploader.single("employeeImage"), employeeControllers.add_Employee);
router.get("/:employeeData", employeeControllers.get_A_Employee );
router.patch("/:employeeData", employeeControllers.update_Employee);
router.delete("/:employeeData", employeeControllers.delete_Employee);
module.exports = router;
