import Doctor from "../models/doctor.model.js";
import Patient from "../models/patient.model.js";
import User from "../models/user.model.js";

const deleteDoctor = async(req,res)=>{
    try {
        const {id} = req.params;
        const doctor = await Doctor.findByIdAndDelete(id);
                  await User.findOneAndDelete({email:doctor.email})
        if(!doctor){
            return res.status(400).json({success: false, message: "Doctor not found"})
        }
        return res.status(200).json({success: true, message: "Doctor deleted"})
    } catch (error) {
        return res.status(500).json({success: false, message: error.message})
    }
}
const deletePatient = async(req,res)=>{
    try {
        const {id} = req.params;
        const patient = await Patient.findByIdAndDelete(id);
                  await User.findOneAndDelete({email:patient.email})
        if(!patient){
            return res.status(400).json({success: false, message: "Patient not found"})
        }
        return res.status(200).json({success: true, message: "Patient deleted"})
    } catch (error) {
        return res.status(500).json({success: false, message: error.message})
    }
}



export  {deleteDoctor,deletePatient};
