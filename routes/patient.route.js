import { Router } from "express";
import {
  getAllPatients,
  getPatient,
} from "../controllers/patient.controller.js";
import {
  createAppointment,
  getPatientAppointments,
} from "../controllers/appointment.controller.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = Router();

router.route("/get-patient/:id").get(getPatient);
router.route("/get-all-patients").get(getAllPatients);

router.route("/create-appoinment").post(createAppointment);
router
  .route("/get-patient-appointments/:id")
  .get(verifyToken, getPatientAppointments);

export default router;
