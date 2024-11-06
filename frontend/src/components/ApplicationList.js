import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchApplications } from '../api';

const ApplicationList = () => {
    const { jobId } = useParams();
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        fetchApplications(jobId)
            .then(response => setApplications(response.data))
            .catch(error => console.error("Error fetching applications:", error));
    }, [jobId]);

    return (
        <div>
            <h2>Applications for Job ID: {jobId}</h2>
            <ul>
                {applications.map(application => (
                    <li key={application.id}>
                        <p>Application ID: {application.id}</p>
                        <p>Status: {application.status}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ApplicationList;
