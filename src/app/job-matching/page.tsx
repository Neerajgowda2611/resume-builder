"use client";
import { useEffect, useState } from "react";
import { fetchJobs } from "@/lib/api";

type Job = {
  id: string;
  title: string;
  company: string;
};

export default function JobMatching() {
  const [jobs, setJobs] = useState<Job[]>([]); // Define the type explicitly

  useEffect(() => {
    fetchJobs().then((data: Job[]) => setJobs(data)); // Ensure API returns the correct type
  }, []);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">Job Recommendations</h1>
      <ul className="mt-4">
        {jobs.map((job) => (
          <li key={job.id} className="border p-4 rounded-lg">
            <h2 className="text-lg font-bold">{job.title}</h2>
            <p>{job.company}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
