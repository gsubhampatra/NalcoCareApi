import mongoose from "mongoose";

const PatientSchema = mongoose.Schema({
    
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    details:{
        type:String,
        required:true,
    },
},{timestamps:true})

export default  Patient = mongoose.model("Patient",PatientSchema)