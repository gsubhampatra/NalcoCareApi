import mongoose from "mongoose";

const PatientSchema = mongoose.Schema({
    userId:{
       type:mongoose.Types.ObjectId,
       ref:"User"
    },
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    medHistory:{
        type:String,
        required:true,
    },
},{timestamps:true})

 const  Patient = mongoose.model("Patient",PatientSchema)

 export default Patient