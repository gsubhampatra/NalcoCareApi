import express from "express";
import { patientRegister } from "../controllers/patient.controller.js";
import { doctorRegister } from "../controllers/doctor.controller.js";
import { login } from "../controllers/user.controller.js";

const router = express()

router.route("/patient-register").post(patientRegister)
router.route("/doctor-register").post(doctorRegister)

router.route("/login").post(login)





export default router