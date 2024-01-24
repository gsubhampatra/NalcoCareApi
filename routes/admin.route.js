import { Router } from "express";
import verifyToken from "../middlewares/verifyToken.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import { getAllAppointments } from "../controllers/appointment.controller.js";
import { deleteDoctor } from "../controllers/admin.controller.js";

const router = Router();

router
  .route("/get-all-appointments")
  .get(verifyToken, getAllAppointments);

router.route("/delete-doctor/:id").delete(verifyToken, isAdmin, deleteDoctor);

export default router;
