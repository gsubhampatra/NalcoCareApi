import { Router } from "express";
import verifyToken from "../middlewares/verifyToken.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import { getAllAppointments,deleteAppointment } from "../controllers/appointment.controller.js";
import { deleteDoctor ,deletePatient} from "../controllers/admin.controller.js";

const router = Router();

router
  .route("/get-all-appointments")
  .get(verifyToken, isAdmin, getAllAppointments);

router.route("/delete-doctor/:id").delete(verifyToken, isAdmin, deleteDoctor);
router.route("/delete-patient/:id").delete(verifyToken, isAdmin, deletePatient);
router.route("/delete-appointment/:id").delete(verifyToken, isAdmin, deleteAppointment);

export default router;
