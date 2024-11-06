import React, { useState } from 'react';
import { createJob } from '../api';

const JobForm = () => {
    const [jobData, setJobData] = useState({
        job_name: '',
        job_role: '',
        job_description: '',
        salary: '',
        experience: '',
        job_type: '',
        last_date: '',
        questions: []  // Add questions field as an array
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

    const handleSubmit = (e) => {
        e.preventDefault();
        createJob(jobData)
            .then(() => alert("Job posted successfully!"))
            .catch(error => console.error("Error posting job:", error));
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
                        {question}
                        <button type="button" onClick={() => handleDeleteQuestion(index)}>Delete</button>
                    </li>
                ))}
            </ul>

            <button type="submit">Post Job</button>
        </form>
    );
};

export default JobForm;
