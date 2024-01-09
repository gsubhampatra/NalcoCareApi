import mongoose from "mongoose";

const PatientSchema = mongoose.Schema({
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
    details:{
        type:String,
        required:true,
    },
},{timestamps:true})

export default  Patient = mongoose.model("Patient",PatientSchema)