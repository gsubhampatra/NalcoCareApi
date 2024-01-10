import Doctor from '../models/doctor.model.js';
import { register } from './user.controller.js';

const doctorRegister = async (req, res) => {
 try {
    const { password,name,email,specilization} = req.body;
    if ( !password || !name || !email || !specilization) {
        res.status(400).json({
            success: false,
            message: "All Fields are required"
        })
       await register(res,email,password,"doctor")
       const doctor = await new Doctor({
           name,
           email,
           specilization
       }).save().select("-password")
       if (!doctor) {
        res.status(400).json({
            success:false,
            massage:"Error in Doctor registration"
        })
       }
         
            res.status(200).json({
                success: true,
                doctor,
                message: "Doctor Registered Successfully"

            })
        
    }
    
 } catch (error) {
    res.status(500).json({
        success: false,
        message: error.message
    })
 }
}

const getDoctor = async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id).select("-password")
        if (!doctor) {
            res.status(400).json({
                success:false,
                massage:"Doctor not exist"
            })
        }
        res.status(200).json({
            success:true,
            massage:"Doctor get Successfully",
            doctor
        })
         
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}



export { doctorRegister,getDoctor }