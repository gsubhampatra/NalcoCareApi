import Doctor from "../models/doctor.model.js";
import Patient from "../models/patient.model.js";
import User from "../models/user.model.js";
import generateToken from "../utils/generateToken.js";

const register = async (res, email, password, role) => {
  try {
    const user = await user.findOne({ email });
    if (user) {
      return res.json({
        success: false,
        message: "User Already Exist",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword,
      role,
    });
    await newUser.save();
    return res.json({
      success: true,
      message: "User Registered Successfully",
    });
  } catch (error) {
    console.log(error.massage);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({
        success: false,
        massage: "email or password required",
      });
    }
    const user = await User.findOne({ email });

    const hashedPassword = await bcrypt.hash(password, 10);
    const isMatch = bcrypt.compare(hashedPassword, user.password);
    if (!isMatch) {
      res.json({
        success: false,
        massage: "Incorrect Password",
      });
    }
    const token = generateToken(user._id);
    user.password = undefined;
    if (user.role === "patient") {
      const patient = await Patient.findOne({ email });
      return res.status(200).json({
        patient,
        token,
        massage: "Login Successfully",
      });
    }
    if (user.role === "doctor") {
      const doctor = await Doctor.findOne({ email });
      return res.status(200).json({
        doctor,
        token,
        massage: "Login Successfully",
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      massage: error.massage,
    });
  }
};

export { register, login };
