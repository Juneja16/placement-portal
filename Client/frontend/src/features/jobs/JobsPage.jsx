import { useEffect, useState } from "react";
import { fetchJobs } from "./jobsAPI";
import MainLayout from "../../shared/layout/MainLayout";
import toast from "react-hot-toast";

function JobsPage() {
  const [jobs, setJobs] = useState([]);

  const loadJobs = async () => {
    try {
      const res = await fetchJobs();
      setJobs(res.data);
    } catch {
      toast.error("Failed to load jobs ❌");
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  return (
    <MainLayout>
      <h2 className="text-2xl font-semibold mb-4">
        Available Jobs
      </h2>

      <div className="grid gap-4">
        {jobs.map((job, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-xl shadow hover:shadow-md transition"
          >
            <h3 className="text-lg font-semibold">
              {job.title}
            </h3>

            <p className="text-sm text-gray-600">
              {job.company}
            </p>

            <p className="text-sm">{job.location}</p>

            <a
              href={job.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-primary)] mt-2 inline-block"
            >
              Apply →
            </a>
          </div>
        ))}
      </div>
    </MainLayout>
  );
}

export default JobsPage;