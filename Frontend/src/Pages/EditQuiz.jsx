import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const EditQuiz = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { quiz } = location.state; // Get the quiz data passed through state

  const [question, setQuestion] = useState(quiz?.question || '');
  const [answers, setAnswers] = useState(quiz?.answers || ['', '', '', '']);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(quiz?.correctAnswerIndex || 0);
  const [category, setCategory] = useState(quiz?.category || 'Main'); // Initialize category state with default value 'Main'
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleAnswerChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const quizData = {
      question,
      answers,
      correctAnswerIndex,
      category, // Include category in the request data
    };

    try {
      const res = await fetch(`/api/quize/update/${quiz._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(quizData),
      });

      if (!res.ok) {
        throw new Error('Failed to update quiz');
      }

      const data = await res.json();
      console.log('Quiz updated:', data);
      setSuccessMessage('Quiz updated successfully!');
      setError('');

      // Navigate back to the dashboard or quizzes page after successful update
      navigate('/dashboard?tab=quize');
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to update quiz. Please try again.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-lg">
      <h2 className="text-3xl font-extrabold text-center text-blue-600 mb-6">Edit Quiz</h2>
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-8 space-y-6">
        {error && <p className="text-red-500">{error}</p>}
        {successMessage && <p className="text-green-500">{successMessage}</p>}
        
        {/* Question Input */}
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2" htmlFor="question">Question:</label>
          <input
            type="text"
            id="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
            className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            placeholder="Enter the quiz question..."
          />
        </div>

        {/* Category Selection (Main/Secondary) */}
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">Category:</label>
          <div className="flex space-x-4">
            <div className="flex items-center">
              <input
                type="radio"
                id="main"
                name="category"
                value="Main"
                checked={category === 'Main'}
                onChange={() => setCategory('Main')}
                className="h-5 w-5 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <label htmlFor="main" className="ml-2 text-gray-600">Main</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="secondary"
                name="category"
                value="Secondary"
                checked={category === 'Secondary'}
                onChange={() => setCategory('Secondary')}
                className="h-5 w-5 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <label htmlFor="secondary" className="ml-2 text-gray-600">Secondary</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="Third"
                name="category"
                value="Third"
                checked={category === 'Third'}
                onChange={() => setCategory('Third')}
                className="h-5 w-5 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <label htmlFor="Third" className="ml-2 text-gray-600">Third</label>
            </div>
          </div>
        </div>

        {/* Answer Inputs */}
        {answers.map((answer, index) => (
          <div key={index} className="space-y-2">
            <label className="block text-lg font-medium text-gray-700" htmlFor={`answer${index}`}>Answer {index + 1}:</label>
            <input
              type="text"
              id={`answer${index}`}
              value={answer}
              onChange={(e) => handleAnswerChange(index, e.target.value)}
              required
              className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              placeholder={`Enter answer ${index + 1}...`}
            />
            <div className="flex items-center">
              <input
                type="radio"
                id={`correctAnswer${index}`}
                name="correctAnswer"
                value={index}
                checked={correctAnswerIndex === index}
                onChange={() => setCorrectAnswerIndex(index)}
                className="h-5 w-5 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <label className="ml-2 text-gray-600" htmlFor={`correctAnswer${index}`}>Correct Answer</label>
            </div>
          </div>
        ))}

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Update Quiz
        </button>
      </form>
    </div>
  );
};

export default EditQuiz;
