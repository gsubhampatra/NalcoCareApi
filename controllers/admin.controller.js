import Doctor from "../models/Doctor.js";

const deleteDoctor = async(req,res)=>{
    try {
        const {id} = req.params;
        const doctor = await Doctor.findByIdAndDelete(id);
        if(!doctor){
            return res.status(400).json({success: false, message: "Doctor not found"})
        }
        return res.status(200).json({success: true, message: "Doctor deleted"})
    } catch (error) {
        return res.status(500).json({success: false, message: error.message})
    }
}



export  {deleteDoctor};