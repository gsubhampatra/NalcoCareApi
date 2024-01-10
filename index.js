import express from "express"
import { DBConnect } from "./db.js"
import cors from "cors"
const app = express()
import userRouter from "./routes/user.route.js"

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
app.get("/api/v1/auth",userRouter)    
    
    app.listen(process.env.PORT || 8000, async() => {
       await DBConnect()
        console.log(`Server is running at http://localhost:${process.env.PORT || 8000}`)
    }
)