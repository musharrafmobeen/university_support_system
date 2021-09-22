const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check_auth');
const appointmentsControllers = require('../controllers/appointment');


router.get("/", appointmentsControllers.get_Appointments);
router.get("/staffAppointments/:appointmentData", appointmentsControllers.get_Staff_Appointments);
router.post("/", appointmentsControllers.add_Appointments);
router.get("/:appointmentData", appointmentsControllers.get_An_Appointment);
router.patch("/:appointmentData", appointmentsControllers.update_Appointment);
router.delete("/:appointmentData", appointmentsControllers.delete_Appointment);
module.exports = router;