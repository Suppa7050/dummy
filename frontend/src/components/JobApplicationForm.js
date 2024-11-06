import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const JobApplicationForm = () => {
  const { jobId } = useParams(); // Retrieve job ID from the URL
  const [studentId, setStudentId] = useState('');
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [statusMessage, setStatusMessage] = useState('');

  // Fetch questions related to the job
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/jobs/${jobId}/questions/`);
        setQuestions(response.data);
        setAnswers(response.data.map(() => '')); // Initialize answers array with empty strings
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };
    fetchQuestions();
  }, [jobId]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const applicationData = {
      student_id: studentId,
      answers: questions.map((question, index) => ({
        question: question.id,
        answer_text: answers[index],
      })),
    };

    try {
      const response = await axios.post(`http://localhost:8000/api/jobs/${jobId}/apply/`, applicationData);
      setStatusMessage('Application submitted successfully!');
      console.log(response.data);
    } catch (error) {
      setStatusMessage('Error submitting application.');
      console.error('Error:', error);
    }
  };

  // Handle change in answers
  const handleAnswerChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  return (
    <div>
      <h2>Apply for Job {jobId}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Student ID:</label>
          <input
            type="text"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            required
          />
        </div>

        {questions.map((question, index) => (
          <div key={question.id}>
            <label>{question.question_text}</label>
            <textarea
              value={answers[index] || ''}
              onChange={(e) => handleAnswerChange(index, e.target.value)}
              required
            />
          </div>
        ))}

        <button type="submit">Submit Application</button>
      </form>
      
      {statusMessage && <p>{statusMessage}</p>}
    </div>
  );
};

export default JobApplicationForm;
