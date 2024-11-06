import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import JobList from './components/JobList';
import JobForm from './components/JobForm';
import ApplicationList from './components/ApplicationList';
import JobApplicationForm from './components/JobApplicationForm';

function App() {
    return (
        <Router>
            <div className="App">
                <h1>Company Job Portal</h1>
                <nav>
                    <Link to="/">Job Listings</Link> | 
                    <Link to="/post-job">Post a Job</Link>
                </nav>

                <Routes>
                    <Route path="/" element={<JobList />} />
                    <Route path="/post-job" element={<JobForm />} />
                    <Route path="/jobs/:jobId/applications" element={<ApplicationList />} />
                    <Route path="/apply/:jobId" element={<JobApplicationForm />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
