import express from "express"
import { DBConnect } from "./db.js"

const app = express()


app.use(express.json())

app.use(express.urlencoded({ extended: true }))



app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Welcome to Nalco Care API"
    })
    }
    )
    
    app.listen(process.env.PORT || 8000, async() => {
       await DBConnect()
        console.log(`Server is running at http://localhost:${process.env.PORT || 8000}`)
    }
)