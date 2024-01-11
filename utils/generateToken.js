import jwt from 'jsonwebtoken';

const generateToken = (user) => {
    try {
        const token =  jwt.sign({ userId:user._id,role:user.role,email:user.email },"nalcocare", {
            expiresIn: "30d"
        })
        if (!token) {
            return {success:false,message:"Token not generated"}
        }
       
        return {success:true,token}
    } catch (error) {
        return {success:false,message:error.message}
    }
}

export default generateToken;