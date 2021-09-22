const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check_auth');
const timetableControllers = require('../controllers/timetable');


router.get("/", timetableControllers.get_TimeTables);
router.post("/", timetableControllers.add_TimeTable);
router.get("/:timetableData", timetableControllers.get_TimeTables);
router.patch("/:timetableData", timetableControllers.update_Timetable);
router.delete("/:timetableData", timetableControllers.delete_TimeTable);
module.exports = router;