import express from "express";
import { getPatient } from "../controllers/patient.controller";

const router = express()

router.route("/get-patient/:id").get(getPatient)


export default router