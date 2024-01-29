import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import Doctor from "../models/doctor.model.js";
import Patient from "../models/patient.model.js";
import generateToken from "../utils/generateToken.js";
import sendMail from "../utils/sendMail.js";

const register = async (req, res) => {
  try {
    const { name, email, password, role, medHistory, specilization } = req.body;

    const userRegister = async (email, password, role) => {
      try {
        if (!email || !password || !role) {
          return {
            success: false,
            message: "Missing email or password or role",
          };
        }

        const existUser = await User.findOne({ email });

        if (existUser) {
          return { success: false, message: "User already exists" };
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
          email,
          password: hashedPassword,
          role,
        });

        const newUser = await user.save()
        if (!newUser) {
          return { success: false, message: "User not created" };
        }
        const { token } = generateToken(newUser);

        return { success: true, newUser, token };
      } catch (error) {
        return { success: false, message: error.message };
      }
    };

    if (role === "doctor") {
      if (!specilization) {
        return res.status(400).json({
          success: false,
          message: "Missing specilization",
        });
      }
      const data = await userRegister(email, password, role);
      if (!data.success) {
        return res.status(400).json(data);
      }

      const doctor = await new Doctor({
        name,
        email,
        specilization,
      }).save();
      if (!doctor) {
        return res
          .status(400)
          .json({ success: false, message: "Doctor not created" });
      }
      res.cookie("token", data.token, { httpOnly: true });
      return res.status(200).json({
        success: true,
        message: "Doctor created",
        user: {
          _id: doctor._id,
          name: doctor.name,
          email: doctor.email,
          role: data.newUser.role,
          specilization: doctor.specilization,
          availability: doctor.availability,
        },
        token: data.token,
      });
    }
    if (role === "patient") {
      if (!medHistory) {
        return res.status(400).json({
          success: false,
          message: "Missing medHistory",
        });
      }

      const data = await userRegister(email, password, role);
      if (!data.success) {
        return res.status(400).json(data);
      }

      const patient = await new Patient({
        name,
        email,
        medHistory,
      }).save();
      if (!patient) {
        return res
          .status(400)
          .json({ success: false, message: "Patient not created" });
      }
      res.cookie("token", data.token, { httpOnly: true });
      return res.status(200).json({
        success: true,
        message: "Patient created",
        user: {
          _id: patient._id,
          name: patient.name,
          email: patient.email,
          role: "patient",
          medHistory: patient.medHistory,
        },
        token: data.token,
      });
    }
    if (role === "admin") {
      const data = await userRegister(email, password, role);
      if (!data.success) {
        return res.status(400).json(data);
      }
      res.cookie("token", data.token, { httpOnly: true });
      return res.status(200).json({
        success: true,
        message: "Admin created",
        user: {
          _id: data.newUser._id,
          name: data.newUser.name,
          email: data.newUser.email,
          role: data.newUser.role,
        },
        token: data.token,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Missing email or password",
      });
    }
    const user = await User.findOne({ email });
    const isMatch = bcrypt.compare(password, user?.password);
    if (!user || !isMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect email or password",
      });
    }

    const token = await generateToken(user);

    if (token.success === "false") {
      return res.status(400).json(token.message);
    }
    res.cookie("token", token.token, { httpOnly: true });
    res.status(200).json({
      success: true,
      message: "logged in successfully",
      user: {
        _id: user._id,
        email: user.email,
        role: user.role,
      },
      token: token.token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { register, login };
