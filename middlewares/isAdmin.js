import jwt from "jsonwebtoken";
export const isAdmin = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization
    const JWT_SECRET = process.env.JWT_SECRET || "nalcocare";
    const decodedToken = jwt.verify(token, JWT_SECRET);
    if (decodedToken.role === "admin") {
      next();
    }else {
      res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
