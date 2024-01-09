import mongoose from "mongoose";

const AppoitmentSchema = mongoose.Schema({
    patient:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Patient",
        required:true,
    },
    doctor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Doctor",
        required:true,
    },
    date:{
        type:String,
        required:true,
    },
    time:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        enum:["pending","approved","rejected"],
        default:"pending",
    },
    details:{
        type:String,
        required:true,
    },
},{timestamps:true})

export default  Appoitment = mongoose.model("Appoitment",AppoitmentSchema)