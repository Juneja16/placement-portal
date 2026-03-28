import express from "express";
import { login, signup } from "../Controllers/authController.js";

const router = express.Router();

// Register Employee into the System
router.post("/signup", signup);

// Login Employee into the System
router.post("/login", login);

export default router;

/* User → Login → JWT → Access Protected Routes */
