import { Router } from "express";
import verifyToken from "../middlewares/verifyToken.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const router = Router();

router
  .route("/get-all-pointments")
  .get(verifyToken, isAdmin, getAllApointments);

export default router;
