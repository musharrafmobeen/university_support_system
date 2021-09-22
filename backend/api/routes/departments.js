const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check_auth');
const departmentControllers = require('../controllers/departments');


router.get("/", departmentControllers.get_Departments);
router.post("/", departmentControllers.add_Department);
router.get("/:departmentName", departmentControllers.get_A_Department);
router.patch("/:departmentName", departmentControllers.update_Department);
router.delete("/:departmentName", departmentControllers.delete_Department);
module.exports = router;