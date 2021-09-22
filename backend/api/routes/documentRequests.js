const express = require("express");
const router = express.Router();
const fileHandler = require("../utils/fileHandler");
const checkAuth = require('../middleware/check_auth');
const documentRequestControllers = require('../controllers/documentRequests');


router.get("/", documentRequestControllers.get_Document_Requests);
router.post("/", documentRequestControllers.add_Document_Request);
router.post("/mobile", documentRequestControllers.add_Document_Request_Mobile);
router.get("/:documentRequestData", documentRequestControllers.get_A_Document_Request);
router.patch("/:documentRequestData",fileHandler.file_Uploader.single('document'), documentRequestControllers.update_Document_Request);
router.delete("/:documentRequestData", documentRequestControllers.delete_Docement_Request);
module.exports = router;