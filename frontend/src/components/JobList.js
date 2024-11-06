import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchJobs } from '../api';

const JobList = () => {
    const [jobs, setJobs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchJobs()
            .then(response => setJobs(response.data))
            .catch(error => console.error("Error fetching jobs:", error));
    }, []);

    // Function to handle the Apply button click
    const handleApplyClick = (jobId) => {
        navigate(`/apply/${jobId}`);
    };

    return (
        <div>
            <h2>Job Listings</h2>
            <ul>
                {jobs.map(job => (
                    <li key={job.id}>
                        <h3>{job.job_name}</h3>
                        <p>{job.job_description}</p>
                        <p>Salary: ${job.salary}</p>
                        <p>Experience: {job.experience} years</p>
                        <Link to={`/jobs/${job.id}/applications`}>View Applications</Link>
                        <button onClick={() => handleApplyClick(job.id)} style={{ marginLeft: '10px' }}>
                            Apply
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default JobList;
