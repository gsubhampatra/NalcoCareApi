import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
const verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization;
    const JWT_SECRET = process.env.JWT_SECRET || "nalcocare";
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decodedToken.userId);
    if (!user) {
      res.status(400).json({
        success: false,
        message: "Not authonticated",
      });
    }
    next();
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export default verifyToken;
