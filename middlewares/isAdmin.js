import jwt from "jsonwebtoken";
export const isAdmin = async (req, res, next) => {
  try {
    const JWT_SECRET = process.env.JWT_SECRET || "nalcocare";
    const token = req.cookies.token;
    const decodedToken = jwt.verify(token, JWT_SECRET);
    if (decodedToken.role === "admin") {
      next();
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      massage: error.massage,
    });
  }
};
