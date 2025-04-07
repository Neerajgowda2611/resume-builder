// lib/api.ts
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const fetchJobs = async () => {
  const response = await axios.get(`${API_URL}/job/recommend`);
  return response.data;
};
