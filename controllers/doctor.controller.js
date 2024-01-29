import Doctor from "../models/doctor.model.js";
import Appointment from "../models/appointment.model.js";

const getDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ email: req.params.id });
    if (!doctor) {
      return res.status(400).json({
        success: false,
        message: "Doctor not found",
      });
    }
    return res.status(200).json({
      success: true,
      user: {
        role: "doctor",
        name: doctor.nsme,
        _id: doctor._id,
        email:doctor.email,
        specilization:doctor.specilization,
        availability: doctor.availability
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

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
};

export { getDoctor, getAllDoctors };
