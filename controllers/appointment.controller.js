import Appointment from "../models/appointment.model.js";
import Doctor from "../models/doctor.model.js";

const createAppointment = async (req, res) => {
  try {
    const { patientId, doctorId, date, slot, details } = req.body;
    if (!patientId || !doctorId || !date || !slot || !details) {
      return res.status(400).json({
        success: false,
        message: "Please provide all the details",
      });
    }
    const appointment = await Appointment.create({
      patient: patientId,
      doctor: doctorId,
      date,
      slot,
      details,
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
};
const getPatientAppointments = async (req, res) => {
  try {
    const patientId = req.params.id;
    const appointments = await Appointment.find({
      patient: patientId,
    })
      .populate("patient", "name email")
      .populate("doctor", "name email");
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
};

const getDoctorAppointments = async (req, res) => {
  try {
    const doctorId  = req.params.id;
    const appointments = await Appointment.find({ doctor: doctorId })
      .populate("patient", "name email")
      .populate("doctor", "name email");
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
};

const ApproveAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(400).json({
        success: false,
        message: "Appointment not found",
      });
    }
    appointment.status = "approved";
    await appointment.save();
    await Doctor.findOneAndUpdate(
      { _id: appointment.doctor },
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
};
const RejectAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(400).json({
        success: false,
        message: "Appointment not found",
      });
    }
    appointment.status = "rejected";
    await appointment.save();

    return res.status(200).json({ success: true, appointment });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({})
      .populate("doctor","name email")
      .populate("patient","name email")
      .exec();
    if (!appointments) {
      return res.status(400).json({
        success: false,
        message: "There are no appointments",
      });
    }
    return res.status(200).json({
      success: true,
      appointments,
      message: "all appointments fetched successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteAppointment = async(req,res)=>{
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id)
    res.status(200).json({
      success:true,
      message:"Appointment deleted Successfully"
    })
  } catch (error) {
    res.status(400).json({
      success:false,
      message:error.message
    })
  }
}

export {
  createAppointment,
  getPatientAppointments,
  getDoctorAppointments,
  ApproveAppointment,
  getAllAppointments,
  RejectAppointment,
  deleteAppointment
};
