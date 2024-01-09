import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username:{
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

export default User = mongoose.model("User",UserSchema)