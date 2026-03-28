import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Employee from "../Models/Employee.js";

/* 
    SIGNUP FLOW 

     1. Get email + password
     2. Check if user exists
     3. Hash password
     4. Save user
    5. Return success

*/

// Signup
export const signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check existing user
    const existingUser = await Employee.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Employee already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create employee
    const employee = await Employee.create({
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "Signup successful",
      employee: { id: employee._id, email: employee.email },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* LOGIN FLOW 

    1. Get email + password
    2. Find user (+password)
    3. Compare password
    4. Generate JWT
    5. Return token
 */

// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user with password
    const employee = await Employee.findOne({ email }).select("+password");

    if (!employee) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, employee.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate token
    const token = jwt.sign({ id: employee._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
