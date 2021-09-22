const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check_auth');
const documentControllers = require('../controllers/documents');
const fileHandler = require("../utils/fileHandler");


router.get("/", documentControllers.get_Documents);
router.post("/", fileHandler.file_Uploader.single("documentFile"), documentControllers.add_Document);
router.get("/:studentReg", documentControllers.get_A_Document);
router.patch("/:studentReg", documentControllers.update_Document);
router.delete("/:studentReg", documentControllers.delete_Document);
module.exports = router;