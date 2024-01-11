import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import Doctor from "../models/doctor.model.js";
import Patient from "../models/patient.model.js";
import generateToken from "../utils/generateToken.js";

const register = async (req, res) => {
  try {
    const { name, email, password,role,medHistory,specilization } = req.body;

    const userRegister = async (email, password, role) => {
      try {
        if (!email || !password || !role) {
          return { success: false, message: "Missing email or password or role" };
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
    
        const newUser = await user.save();
        if (!newUser) {
          return { success: false, message: "User not created" };
        }
        const {token} = generateToken(newUser);
        return { success: true, newUser ,token};
      } catch (error) {
        return { success: false, message: error.message };
      }
    };
    
    
     if (role==="doctor") {
      if (!specilization) {
       return res.status(400).json({
          success: false,
           message: "Missing specilization" });
      }
       const user = await userRegister(email,password,role)
       if (!user.success) {
        return res.status(400).json(user);
      }
      const userId = (user?.newUser?._id).toHexString();

       const doctor = await new Doctor({
        userId,
        name,
        email,
        specilization,
      }).save()
      if (!doctor) {
        return res.status(400).json({ success: false, message: "Doctor not created",token:user.token });
        
      }
      return res.status(200).json({ success: true, message: "Doctor created",doctor });
      
     }
      if (role==="patient") {
        if (!medHistory) {
        return  res.status(400).json({
            success: false,
             message: "Missing medHistory" });
        }

        const user = await userRegister(email,password,role)
        if (!user.success) {
          return res.status(400).json(user);
        }
        const userId = (user?.newUser?._id).toHexString();


        const patient = await new Patient({
          userId,
        name,
        email,
        medHistory,
      }).save()
      if (!patient) {
        return res.status(400).json({ success: false, message: "Patient not created" });
        
      }
      return res.status(200).json({ success: true, message: "Patient created",patient,token:user.token });
        
      }
    
  } catch (error) {
    res.status(500).json({
      success: false,
       message: error.message });
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password ) {
      return res.status(400).json({
        success: false,
        message: "Missing email or password",
      });
    }
    const user = await User.findOne({ email });
    const isMatch =  bcrypt.compare(password, user?.password);
    if (!user || !isMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect email or password",
      });
    }
    
     const userId = (user._id).toHexString();

    const {token} = await generateToken(user);
     if (token.success==='false') {
      return res.status(400).json(token.message);
     }
    if (user.role==="doctor") {
      const doctor = await Doctor.findOne({ userId });
      if (!doctor) {
        return res.status(400).json({ success: false, message: "Doctor not found" });
      }
      return res.status(200).json({ success: true, message: "Doctor logged in",token,doctor });  
    }
    if (user.role==='patient') {
      
      const patient = await Patient.findOne({userId} );
      if (!patient) {
        return res.status(400).json({ success: false, message: "Patient not found" });
      }
      return res.status(200).json({ success: true, message: "Patient logged in",token,patient });
    }
   if (user.role==='admin') {
      return res.status(200).json({ success: true, message: "Admin logged in",token });
   }
   if(user.role!==('admin'||'patient'||'doctor')){
    return res.status(400).json({ success: false, message: "Invalid role" });
   }
    
  } catch (error) {
     res.status(500).json({
      success: false,
       message: error.message });
  }
}

export { register, login}

