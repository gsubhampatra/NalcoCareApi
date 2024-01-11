import express from "express"
import { DBConnect } from "./db.js"
import cors from "cors"
const app = express()
import userRoute from "./routes/user.route.js"
import patientRoute from "./routes/patient.route.js"
import doctorRoute from "./routes/doctor.route.js"
// import adminRoute from "./routes/admin.route.js"
app.use(express.json())
app.use(cors({
    origin:"*"
}))
app.use(express.urlencoded({ extended: true }))



app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Welcome to Nalco Care API"
    })
    }
    )
app.use("/api/v1/auth",userRoute)
app.use("/api/v1/patient",patientRoute)
app.use("/api/v1/doctor",doctorRoute)
// app.use("/api/v1/admin",adminRoute)    

    
    app.listen(process.env.PORT || 8000, async() => {
       await DBConnect()
        console.log(`Server is running at http://localhost:${process.env.PORT || 8000}`)
    }
)