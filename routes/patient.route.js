import { Router } from "express";
import { getAllPatients, getPatient } from "../controllers/patient.controller.js";


const router = Router();

router.route("/get-patient/:id").get(getPatient);
router.route("/get-all-patients").get(getAllPatients);

export default router;