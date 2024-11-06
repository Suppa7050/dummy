import React, { useState, useEffect } from 'react';
import axios from 'axios';

function JobApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch job applications from the Django API
    axios.get('http://localhost:8001/api/job-applications/list/')
      .then(response => {
        setApplications(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Error fetching job applications');
        setLoading(false);
      });
  }, []);

  const handleButtonClick = (appId, action) => {
    console.log(`Application ID: ${appId}, Action: ${action}`);
    // Add logic here to handle the action, such as making an API call to update the application status
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Job Applications</h2>
      {applications.length > 0 ? (
        <ul>
          {applications.map(application => (
            <li key={application.id}>
              {application.name} applied for job ID {application.applied_job_id}
              <div>
                <button onClick={() => handleButtonClick(application.id, 'passed_round_1')}>Passed Round 1</button>
                <button onClick={() => handleButtonClick(application.id, 'failed_round_1')}>Failed Round 1</button>
                <button onClick={() => handleButtonClick(application.id, 'passed_round_2')}>Passed Round 2</button>
                <button onClick={() => handleButtonClick(application.id, 'failed_round_2')}>Failed Round 2</button>
                <button onClick={() => handleButtonClick(application.id, 'passed_round_3')}>Passed Round 3</button>
                <button onClick={() => handleButtonClick(application.id, 'failed_round_3')}>Failed Round 3</button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No job applications found.</p>
      )}
    </div>
  );
}

export default JobApplications;
