import { Router } from "express";
import { getAllDoctors, getDoctor } from "../controllers/doctor.controller.js";
import verifyToken from "../middlewares/verifyToken.js";
import {
  ApproveAppointment,
  RejectAppointment,
  getDoctorAppointments,
} from "../controllers/appointment.controller.js";
import { isDoctor } from "../middlewares/isDoctor.js";
const router = Router();

router.route("/get-doctor/:id").get(getDoctor);
router.route("/get-all-doctors").get(getAllDoctors);

router
  .route("/get-doctor-appointments/:id")
  .get(verifyToken, isDoctor, getDoctorAppointments);
router
  .route("/approve-appointment/:id")
  .post(verifyToken, isDoctor, ApproveAppointment);
router
  .route("/reject-appointment/:id")
  .post(verifyToken, isDoctor, RejectAppointment);

export default router;
