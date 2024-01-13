import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
const verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    const JWT_SECRET = process.env.JWT_SECRET || "nalcocare";
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decodedToken.userId);
    if (!user) {
      res.status(400).json({
        success: false,
        massage: "Not authonticated",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(400).json({
      success: false,
      massage: error.massage,
    });
  }
};

export default verifyToken;
