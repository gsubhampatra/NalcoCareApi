import mongoose from "mongoose";

const DoctorSchema = mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    specilization:{
        type:String,
        required:true,
    },
},{timestamps:true})

export default  Doctor = mongoose.model("Doctor",DoctorSchema)