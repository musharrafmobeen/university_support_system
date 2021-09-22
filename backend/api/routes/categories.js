const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check_auth');
const categoryControllers = require('../controllers/categories');
const imageHandler = require("../utils/imageHandler");


router.get("/", categoryControllers.get_Categories);
router.get("/unassignedCategories", categoryControllers.get_Unassigned_Categories);
router.post("/", categoryControllers.add_Category);
router.get("/:categoryData", categoryControllers.get_A_Category);
router.patch("/:categoryData", categoryControllers.update_Category);
router.delete("/:categoryData", categoryControllers.delete_Category);
module.exports = router;