import Patient from '../models/patient.model.js';
import { register } from './user.controller.js';

const patientRegister = async (req, res) => {
 try {
    const { password,name,email,details} = req.body;
    if (!password || !name || !email || !details) {
        res.status(400).json({
            success: false,
            message: "All Fields are required"
        })
       await register(res,email,password,"patient")
       const patient = await new Patient({
           name,
           email,
           details
       }).save().select("-password")
            res.status(200).json({
                success: true,
                patient,
                message: "Patient Registered Successfully"
            })
        
    }
    
 } catch (error) {
    res.status(500).json({
        success: false,
        message: error.message
    })
 }
}

const getPatient = async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id).select("-password")
        if (!patient) {
            res.status(404).json({
                success: false,
                message: "Patient Not Found"
            })
        }
        else {
            res.status(200).json({
                success: true,
                patient: patient
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}



export { patientRegister,getPatient }