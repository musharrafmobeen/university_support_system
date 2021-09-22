const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check_auth');
const annoncementsControllers = require('../controllers/announcements');


router.get("/", annoncementsControllers.get_Announcements);
router.get("/visibleToAllAnnouncements", annoncementsControllers.get_VisibleToAll_Announcements);
router.get("/staffAnnouncements", annoncementsControllers.get_Staff_Announcements);
router.get("/studentAnnouncements", annoncementsControllers.get_Students_Announcements);
router.post("/", annoncementsControllers.add_Announcements);
router.get("/:announcementData", annoncementsControllers.get_An_Announcement);
router.patch("/:announcementData", annoncementsControllers.update_Announcement);
router.delete("/:announcementData", annoncementsControllers.delete_Announcement);
module.exports = router;