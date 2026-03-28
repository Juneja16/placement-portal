import express from "express";
import authMiddleware from "../Middlewares/authMiddleware.js";
import { getJobs } from "../Controllers/jobsController.js";

const router = express.Router();

// Fetch all the Jobs From the External Api
router.get("/", authMiddleware, getJobs);

export default router;
