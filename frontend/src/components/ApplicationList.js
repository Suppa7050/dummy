import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { fetchApplications } from '../api';

const ApplicationList = () => {
    const { jobId } = useParams();
    const [applications, setApplications] = useState([]);
    const [error, setError] = useState(''); // Track error messages

    useEffect(() => {
        // Fetch applications based on jobId
        fetchApplications(jobId)
            .then(response => {
                console.log(response.data);
                setApplications(response.data);
            })
            .catch(error => {
                console.error("Error fetching applications:", error);
                setError("Failed to fetch applications.");
            });
    }, [jobId]);

    const handleStatus = async (application, status) => {
        try {
            const res=await axios.patch(`http://localhost:8000/company/applications/${application.App_id}/update_status/`, { status });
            console.log(res.data)
            // Update the application status locally
            const res1=await axios.patch(`http://localhost:8001/api/applications/${application.id}/update_status/`, { status });
            console.log(res1.data)
            setApplications((prevApplications) =>
                prevApplications.map((app) =>
                    app.id === application.id ? { ...app, status } : app
                )
            );
            
        } catch (err) {
            console.error("Error updating application status:", err);
            setError("Error updating application status.");
        }
        
    };
    
    

    return (
        <div>
            <h2>Applications for Job ID: {jobId}</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error if any */}
            <ul>
                {applications.map(application => (
                    <li key={application.id}>
                        <p>Application ID: {application.id}</p>
                        <p>Status: {application.status}</p>
                        <button onClick={() => handleStatus(application, 'Accepted')}>Accept</button>
                        <button onClick={() => handleStatus(application, 'Rejected')}>Reject</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ApplicationList;
