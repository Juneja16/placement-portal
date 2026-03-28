import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

/*
1. Call Remotive API
2. Call Adzuna API
3. Merge results
4. Filter (React / Node)
5. Return clean data
*/

export const fetchJobs = async () => {
  try {
    // 🔹 1. Remotive API
    const remotiveRes = await axios.get("https://remotive.com/api/remote-jobs");

    const remotiveJobs = remotiveRes.data.jobs.map((job) => ({
      title: job.title,
      company: job.company_name,
      location: job.candidate_required_location,
      url: job.url,
    }));

    // 🔹 2. Adzuna API
    const adzunaRes = await axios.get(
      "https://api.adzuna.com/v1/api/jobs/us/search/1",
      {
        params: {
          app_id: process.env.ADZUNA_APP_ID,
          app_key: process.env.ADZUNA_APP_KEY,
          results_per_page: 20,
          what: "react developer",
        },
      },
    );

    const adzunaJobs = adzunaRes.data.results.map((job) => ({
      title: job.title,
      company: job.company.display_name,
      location: job.location.display_name,
      url: job.redirect_url,
    }));

    //  3. Merge both sources
    const allJobs = [...remotiveJobs, ...(adzunaJobs || [])];

    //  4. Filter React / Node
    const keywords = ["react", "node", "mern", "frontend", "backend"];

    const filteredJobs = allJobs.filter((job) =>
      keywords.some((key) => job.title.toLowerCase().includes(key)),
    );

    //  5. Remove duplicates
    const uniqueJobs = Array.from(
      new Map(filteredJobs.map((job) => [job.url, job])).values(),
    );

    return uniqueJobs;
  } catch (error) {
    console.error(" FULL ERROR:", error.response?.data || error.message);
    return [];
  }
};
