const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check_auth');
const staffRatingControllers = require('../controllers/staffRating');
const imageHandler = require("../utils/imageHandler");


router.get("/", staffRatingControllers.get_Staff_Ratings);
router.post("/", staffRatingControllers.add_Staff_Rating);
// router.get("/:categoryData", categoryControllers.get_A_Category);
// router.patch("/:categoryData", categoryControllers.update_Category);
// router.delete("/:categoryData", categoryControllers.delete_Category);
module.exports = router;