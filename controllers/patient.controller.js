import Patient from "../models/patient.model.js";

const getPatient = async (req, res) => {
  try {
    const patient = await Patient.findOne({ email: req.params.id });
    if (!patient) {
      return res.status(400).json({
        success: false,
        message: "Patient not found",
      });
    }
    return res.status(200).json({
      success: true,
      user: {
        _id: patient._id,
        name: patient.name,
        email: patient.email,
        medHistory: patient.medHistory,
        role: "patient",
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllPatients = async (_, res) => {
  try {
    const patients = await Patient.find();
    if (!patients) {
      return res.status(400).json({
        success: false,
        message: "Patient not found",
      });
    }
    return res.status(200).json({ success: true, patients });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { getPatient, getAllPatients };
