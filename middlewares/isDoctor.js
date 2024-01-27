import jwt from "jsonwebtoken";
export const isDoctor = async (req, res, next) => {
  try {
    const JWT_SECRET = process.env.JWT_SECRET || "nalcocare";
    const token = req.cookies.token || req.headers.authorization;
    const decodedToken = jwt.verify(token, JWT_SECRET);
    if (decodedToken.role === "doctor" || decodedToken.role === "admin") {
      next();
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
