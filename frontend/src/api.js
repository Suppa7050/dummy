import axios from 'axios';

const API_URL = 'http://localhost:8001/api'; // Adjust if needed

export const fetchJobs = () => axios.get(`${API_URL}/jobs/`);
export const createJob = (jobData) => axios.post(`${API_URL}/jobs/`, jobData);
export const fetchApplications = (jobId) => axios.get(`${API_URL}/applications/${jobId}/`);
export const createApplication = (applicationData) => axios.post(`${API_URL}/applications/`, applicationData);
