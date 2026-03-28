import { fetchJobs } from "../Services/jobsService.js";
import dotenv from "dotenv";
dotenv.config();

/* Frontend → Backend → External API → Filter → Response
 */

export const getJobs = async (req, res) => {
  try {
    const jobs = await fetchJobs();

    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
