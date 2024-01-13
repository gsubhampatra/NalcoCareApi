import jwt from "jsonwebtoken";

const generateToken = (user) => {
  try {
    const JWT_SECRET = process.env.JWT_SECRET || "nalcocare";
    const token = jwt.sign(
      { userId: user._id, role: user.role, email: user.email },
      JWT_SECRET,
      {
        expiresIn: "30d",
      }
    );
    if (!token) {
      return { success: false, message: "Token not generated" };
    }

    return { success: true, token };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export default generateToken;
