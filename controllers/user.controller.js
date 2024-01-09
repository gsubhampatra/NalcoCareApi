import User from "../models/user.model.js"
import generateToken from "../utils/generateToken.js"


const register = async (res,username,password,role) => {
   try {
        const user = await user.findOne({ username })
        if (user) {
            res.json({
                success: false,
                message: "User Already Exist"
            })
        }
    
        const hashedPassword = await bcrypt.hash(password, 10)
        
            const newUser = new User({
                username,
                password: hashedPassword,
                role
            })
            await newUser.save()
            res.json({
                success: true,
                message: "User Registered Successfully"
            })
        

   } catch (error) {
      console.log(error.massage);
   }

}

const login = async (res,username,password) => {
    try {
        const user = await user.findOne({ username })
        if(!user){
            res.json({
                success: false,
                message: "User Not Found"
            })
        }
        else{
            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) {
                res.json({
                    success: false,
                    message: "Incorrect Password"
                })
            }
            else {
                const token = generateToken(user._id)
                res.json({
                    success: true,
                    message: "User Logged In Successfully",
                    token: token,
                    user: {
                        id: user._id,
                        username: user.username,
                        role: user.role
                    }
                })
            }
        }
    } catch (error) {
        console.log(error.massage);
    }
}

const getUsers = async (req,res) => {
    try {
        const users = await User.find({})
        res.json({
            success: true,
            users: users
        })
    } catch (error) {
        console.log(error.massage);
    }
}

const deleteUser = async (req,res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        res.json({
            success: true,
            message: "User Deleted Successfully"
        })
    } catch (error) {
        console.log(error.massage);
    }
}

export { register, login, getUsers, deleteUser }