const express = require("express");
const router = express.Router();
const fileHandler = require("../utils/fileHandler");
const checkAuth = require('../middleware/check_auth');
const messagesControllers = require('../controllers/messages');


router.get("/", messagesControllers.get_Messages);
router.post("/", messagesControllers.add_Message);
router.get("/:messageID", messagesControllers.get_A_Message);
router.patch("/:messageID", messagesControllers.update_Message);
router.delete("/:messageID", messagesControllers.delete_Message);
module.exports = router;