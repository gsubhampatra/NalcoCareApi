import Appointment from "../models/appointment.model.js";
import Doctor from "../models/doctor.model.js";


const createAppointment = async (req, res) => {
    try {
        const {patientId,doctorId, date, slot,details } = req.body;
        if (!patientId || !doctorId || !date || !slot || !details) {
            return res.status(400).json({
                success: false,
                message: "Please provide all the details",
            });
            
        }
        const appointment = await  Appointment.create({
            patient: patientId,
            doctor:doctorId,
            date,
            slot,
            details
        });

        if (!appointment) {
            return res.status(400).json({
                success: false,
                message: "Appointment not created",
            });
        }
        return res.status(200).json({ success: true, appointment });


    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
        
    }
      
}
const getPatientAppointments = async (req, res) => {
    try {
        const { patientId } = req.body;
        const appointments = await Appointment.find({ patient: patientId });
        if (!appointments) {
            return res.status(400).json({
                success: false,
                message: "There are no appointments",
            });
        }
        return res.status(200).json({ success: true, appointments });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}



const getDoctorAppointments = async (req, res) => {
    try {
        const { doctorId } = req.body;
        const appointments = await Appointment.find({ doctor:doctorId });
        if (!appointments) {
            return res.status(400).json({
                success: false,
                message: "There are no appointments",
            });
        }
        return res.status(200).json({ success: true, appointments });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

const ApproveAppointment = async (req, res) => {
    try {
        const { doctorId } = req.body;
        const appointment = await Appointment.findById( req.params.id );
        if (!appointment) {
            return res.status(400).json({
                success: false,
                message: "Appointment not found",
            });
        }
        appointment.status = "approved";
        await appointment.save();
        await Doctor.findOneAndUpdate(
            { _id: doctorId },
            { $pull: { availability: appointment.slot } },
            { new: true }
          );      
      return res.status(200).json({ success: true, appointment });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

export { createAppointment, getPatientAppointments, getDoctorAppointments, ApproveAppointment }