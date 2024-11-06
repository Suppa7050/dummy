import React, { useState } from 'react';
import { createJob } from '../api'; // Assuming createJob is defined in the '../api' file
import axios from 'axios';

const JobForm = () => {
    const [jobData, setJobData] = useState({
        job_name: '',
        job_role: '',
        job_description: '',
        salary: '',
        experience: '',
        job_type: '',
        last_date: '',
        questions: []  // Track questions in an array
    });
    
    const [questionText, setQuestionText] = useState('');  // Track individual question text

    const handleChange = (e) => {
        setJobData({ ...jobData, [e.target.name]: e.target.value });
    };

    const handleAddQuestion = () => {
        if (questionText.trim()) {
            setJobData({
                ...jobData,
                questions: [...jobData.questions, { question_text: questionText }]
            });
            setQuestionText('');  // Clear question input after adding
        }
    };
    
    const handleDeleteQuestion = (index) => {
        const updatedQuestions = jobData.questions.filter((_, i) => i !== index);
        setJobData({ ...jobData, questions: updatedQuestions });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // First, call createJob (Assuming it's a function defined to post job data to your backend)
            const response1=await createJob(jobData);
            alert("Job posted successfully!");

            // Then, call axios.post to handle the job creation separately (or you could combine the logic in one API call)
            const response = await axios.post('http://localhost:8000/company/create_job/', {
                job_name: jobData.job_name,
                job_role: jobData.job_role,
                job_description: jobData.job_description,
                salary: jobData.salary,
                experience: jobData.experience,
                type: jobData.job_type,
                last_date: jobData.last_date,
                questions: jobData.questions ,// Send questions as part of the request
                company_id:1,
                required_skills:[],
                flag:false,
                job_c_id:response1.data.id,
            })
            console.log("Job created via axios:", response.data);

            // Optionally reset the form fields
            setJobData({
                job_name: '',
                job_role: '',
                job_description: '',
                salary: '',
                experience: '',
                job_type: '',
                last_date: '',
                questions: []
            });
        } catch (error) {
            console.error("Error posting job:", error);
            alert("Failed to create job. Please try again.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Post a New Job</h2>

            <label>Job Name</label>
            <input name="job_name" value={jobData.job_name} onChange={handleChange} required />

            <label>Job Role</label>
            <input name="job_role" value={jobData.job_role} onChange={handleChange} required />

            <label>Description</label>
            <textarea name="job_description" value={jobData.job_description} onChange={handleChange} required />

            <label>Salary</label>
            <input name="salary" value={jobData.salary} onChange={handleChange} required type="number" />

            <label>Experience (years)</label>
            <input name="experience" value={jobData.experience} onChange={handleChange} required type="number" />

            <label>Type</label>
            <input name="job_type" value={jobData.job_type} onChange={handleChange} required />

            <label>Last Date</label>
            <input name="last_date" value={jobData.last_date} onChange={handleChange} required type="date" />

            <h3>Questions</h3>
            <input
                type="text"
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                placeholder="Add a question"
            />
            <button type="button" onClick={handleAddQuestion}>Add Question</button>

            <ul>
                {jobData.questions.map((question, index) => (
                    <li key={index}>
                        {question.question_text}
                        <button type="button" onClick={() => handleDeleteQuestion(index)}>Delete</button>
                    </li>
                ))}
            </ul>

            <button type="submit">Post Job</button>
        </form>
    );
};

export default JobForm;
