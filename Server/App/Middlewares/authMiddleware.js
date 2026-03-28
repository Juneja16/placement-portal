import jwt from "jsonwebtoken";
import Employee from "../Models/Employee.js";

/**
 * - Verify JWT
 * - Check if User still exists in the CURRENT database
 * - Attach fresh User data to Request Object
 */
const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "No token provided or invalid format",
      });
    }

    // Extract token
    const token = authHeader.split(" ")[1];

    // 1. Verify token signature and expiration
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 2. CRITICAL: Check if the user exists in the new database
    const currentUser = await Employee.findById(decoded.id);

    if (!currentUser) {
      return res.status(401).json({
        message:
          "The user belonging to this token no longer exists in the database.",
      });
    }

    // 3. Attach the actual Mongoose document to the request
    req.user = currentUser;

    next();
  } catch (error) {
    //  To Distinguish between expired and malformed tokens
    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ message: "Token expired, please login again" });
    }
    res.status(401).json({ message: "Invalid token" });
  }
};

export default authMiddleware;
