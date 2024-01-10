import express from "express";
import { getDoctor } from "../controllers/doctor.controller";

const router = express()

router.route("/get-doctor/:id").get(getDoctor)