const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check_auth');
const staffControllers = require('../controllers/staff');


router.get("/", staffControllers.get_AllStaff);
router.post("/", staffControllers.add_Staff);
router.post("/mobile", staffControllers.add_Staff_Mobile);
router.get("/:staffData", staffControllers.get_A_Staff );
router.patch("/:staff_id", staffControllers.update_Staff);
router.delete("/:staff_id", staffControllers.delete_Staff);
module.exports = router;
