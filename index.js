import express from "express";
import { DBConnect } from "./db.js";
import cors from "cors";
import userRoute from "./routes/user.route.js";
import patientRoute from "./routes/patient.route.js";
import doctorRoute from "./routes/doctor.route.js";
import cookieParser from "cookie-parser";
import adminRoute from "./routes/admin.route.js";

const app = express();
//middlewares
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.get("/", (req, res) => {
  res.send({ success: true, message: "Welcome to NALCO Care API" });
});
//routes
app.use("/api/v1/auth", userRoute);
app.use("/api/v1/patient", patientRoute);
app.use("/api/v1/doctor", doctorRoute);
app.use("/api/v1/admin", adminRoute);
const PORT = process.env.PORT || 8000;
app.listen(PORT, async () => {
  await DBConnect();
  console.log(
    `Server is running at http://localhost:${process.env.PORT || 8000}`
  );
});

export default app;
