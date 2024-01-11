import Doctor from "../models/doctor.model.js";


const getDoctor = async(req, res) => {
    try {
        const doctor = await Doctor.findOne({userId:req.params.id});
        if (!doctor) {
        return res.status(400).json({
            success: false,
            message: "Doctor not found",
        });
        }
        return res.status(200).json({ success: true, doctor });
        
    } catch (error) {
        res.status(500).json({
        success: false,
        message: error.message,
        });
    }
}

const getAllDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find();
        if (!doctors) {
        return res.status(400).json({
            success: false,
            message: "Doctor not found",
        });
        }
        return res.status(200).json({ success: true, doctors });
        
    } catch (error) {
        res.status(500).json({
        success: false,
        message: error.message,
        });
    }
}

export {getDoctor,getAllDoctors}