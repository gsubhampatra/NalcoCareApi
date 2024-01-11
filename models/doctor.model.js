import mongoose from "mongoose";

const DoctorSchema = mongoose.Schema({
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
    },
    specilization:{
        type:String,
        required:true,
    },
    availability:{
        type:[String],
        default:["8am-9am","10am-11am","12pm-1pm","2pm-3pm","4pm-5pm"]
    }
},{timestamps:true})

 const  Doctor = mongoose.model("Doctor",DoctorSchema)

 export default Doctor