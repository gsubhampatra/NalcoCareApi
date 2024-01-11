import { Router } from "express";
import { getAllDoctors, getDoctor } from "../controllers/doctor.controller.js";
import verifyToken from "../middlewares/verifyToken.js";
import { ApproveAppointment, getDoctorAppointments } from "../controllers/appointment.controller.js";
const router = Router();

router.route("/get-doctor/:id").get(getDoctor);
router.route("/get-all-doctors").get(getAllDoctors);

router.route("/get-doctor-appointments").post(verifyToken,getDoctorAppointments);
router.route("/approve-appointment/:id").post(verifyToken,ApproveAppointment);

export default router;