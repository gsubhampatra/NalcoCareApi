<<<<<<< HEAD
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
=======
import express from "express"
import { DBConnect } from "./db.js"
import cors from "cors"
const app = express()
import userRoute from "./routes/user.route.js"
import patientRoute from "./routes/patient.route.js"
import doctorRoute from "./routes/doctor.route.js"
import cookieParser from "cookie-parser"
// import adminRoute from "./routes/admin.route.js"
app.use(express.json())
app.use(cors({
  origin: 'http://localhost:5173',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}))
app.use(express.urlencoded({ extended: true }))
>>>>>>> 601062a8af5a9a834e8e5f651cb425f17c2986ff
app.use(cookieParser());

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
