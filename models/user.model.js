import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["patient","doctor","admin"],
        default:"patient"
    }
},{timestamps:true})

 const User = mongoose.model("User",UserSchema)

 export default User