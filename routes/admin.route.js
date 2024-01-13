import { Router } from "express";
import verifyToken from "../middlewares/verifyToken.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import { getAllAppointments } from "../controllers/appointment.controller.js";

const router = Router();

router
  .route("/get-all-appointments")
  .get(verifyToken, isAdmin, getAllAppointments);

export default router;
