import React, { useState } from 'react';

export default function AddQuiz() {
  const [question, setQuestion] = useState('');
  const [answers, setAnswers] = useState(Array(5).fill(''));
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(0);
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
    };

    try {
      const response = await fetch('/api/quize/quizzes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(quizData),
      });

      if (!response.ok) {
        throw new Error('Failed to add quiz');
      }

      const data = await response.json();
      console.log('Quiz submitted:', data);
      setSuccessMessage('Quiz added successfully!');

      // Reset form
      setQuestion('');
      setAnswers(Array(5).fill(''));
      setCorrectAnswerIndex(0);
      setError('');
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to add quiz. Please try again.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-lg">
      <h2 className="text-3xl font-extrabold text-center text-blue-600 mb-6">Create a New Quiz</h2>
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-8 space-y-6">
        {error && <p className="text-red-500">{error}</p>}
        {successMessage && <p className="text-green-500">{successMessage}</p>}
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
          Add Quiz
        </button>
      </form>
    </div>
  );
}
