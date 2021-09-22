const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check_auth');
const adminControllers = require('../controllers/admin');
const imageHandler = require("../utils/imageHandler");


router.get("/", adminControllers.get_Admins);
router.post("/", imageHandler.image_Uploader.single("adminImage"), adminControllers.add_Admin);
router.get("/:AdminData", adminControllers.get_An_Admin);
router.patch("/:AdminData", adminControllers.update_Admin);
router.delete("/:AdminData", adminControllers.delete_Admin);
module.exports = router;
