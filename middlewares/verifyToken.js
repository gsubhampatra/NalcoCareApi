import jwt from "jsonwebtoken"
import User from "../models/user.model.js"
export const verifyToken = async(req,res,next)=>{
    try {
       const {token} = req.token
       const JWT_SECRET = process.env.JWT_SECRET || "nalcocare"
       const decodedToken = jwt.verify(token,JWT_SECRET)
       const user = await User.findById(decodedToken.userId)
        if (!user) {
            res.status(400).json({
                success:false,
                massage:"Not authonticated"
            })    
        }
        next()
    } catch (error) {
        res.status(400).json({
            success:false,
            massage:error.massage
        })
    }
}