import { Router } from "express";
import { getAllDoctors, getDoctor } from "../controllers/doctor.controller.js";


const router = Router();

router.route("/get-doctor/:id").get(getDoctor);
router.route("/get-all-doctors").get(getAllDoctors);

export default router;