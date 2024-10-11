import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion'; 
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function TrainingQuiz() {
  const { currentUser } = useSelector(state => state.user); 
  const [trainingQuizzes, setTrainingQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState(new Set());
  const [score, setScore] = useState(null);
  const [progressPercentage, setProgressPercentage] = useState(0); 
  const [results, setResults] = useState([]); // State to hold results for each question
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchTrainingQuizzes = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/quize/get-quizzes?category=Secondary&category=Third');
        const data = await res.json();
        if (res.ok) {
          setTrainingQuizzes(data.quizzes);
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTrainingQuizzes();
  }, []);

  const handleAnswerSelect = (quizId, answerIndex) => {
    setSelectedAnswers((prevAnswers) => ({
      ...prevAnswers,
      [quizId]: answerIndex,
    }));

    setAnsweredQuestions((prevAnswered) => {
      const newAnswered = new Set(prevAnswered);
      newAnswered.add(currentQuestionIndex);
      return newAnswered;
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < trainingQuizzes.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmitQuiz = () => {
    // Calculate the score and gather results
    let correctCount = 0;
    const quizResults = trainingQuizzes.map((quiz) => {
      const isAnswered = answeredQuestions.has(trainingQuizzes.indexOf(quiz));
      const isCorrect = isAnswered && selectedAnswers[quiz._id] === quiz.correctAnswerIndex;
      if (isCorrect) {
        correctCount++;
      }
      return {
        question: quiz.question,
        selectedAnswer: isAnswered ? selectedAnswers[quiz._id] : undefined,
        correctAnswer: quiz.correctAnswerIndex,
        isCorrect,
        correctAnswerText: quiz.answers[quiz.correctAnswerIndex], // Get the correct answer text
      };
    }).filter(result => result.selectedAnswer !== undefined); // Only include answered questions

    const totalQuestions = quizResults.length; // Updated total questions to only those answered
    const percentageScore = (correctCount / totalQuestions) * 100;

    // Set the score and results in state
    setScore({ correctCount, totalQuestions, percentage: percentageScore });
    setResults(quizResults); // Store results for rendering
    setProgressPercentage(percentageScore);
  };

  const goToQuestion = (index) => {
    setCurrentQuestionIndex(index);
  };

  if (loading) {
    return <div className="text-center py-10 text-xl text-white">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-10 text-xl">Error: {error}</div>;
  }

  const currentQuiz = trainingQuizzes[currentQuestionIndex];

  // Separate quizzes into categories
  const secondaryQuizzes = trainingQuizzes.filter(quiz => quiz.category === 'Secondary');
  const thirdQuizzes = trainingQuizzes.filter(quiz => quiz.category === 'Third');

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex justify-center items-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="flex max-w-6xl w-full mx-auto p-6 bg-white rounded-lg shadow-lg"
      >
        {/* Questions List (Left Sidebar) */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-1/4 pr-6"
        >
          <div className="bg-gray-200 p-4 rounded-lg shadow-md mb-4">
            <h2 className="text-lg font-bold text-gray-700 mb-4">Secondary Questions</h2>
            <ul className="space-y-2">
              {secondaryQuizzes.map((quiz) => (
                <motion.li
                  key={quiz._id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <button
                    onClick={() => goToQuestion(trainingQuizzes.indexOf(quiz))}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors duration-200 ${
                      currentQuestionIndex === trainingQuizzes.indexOf(quiz)
                        ? 'bg-blue-500 text-white'
                        : answeredQuestions.has(trainingQuizzes.indexOf(quiz))
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                    }`}
                  >
                    Question {trainingQuizzes.indexOf(quiz) + 1}
                  </button>
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="bg-gray-200 p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-bold text-gray-700 mb-4">Third Questions</h2>
            <ul className="space-y-2">
              {thirdQuizzes.map((quiz) => (
                <motion.li
                  key={quiz._id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <button
                    onClick={() => goToQuestion(trainingQuizzes.indexOf(quiz))}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors duration-200 ${
                      currentQuestionIndex === trainingQuizzes.indexOf(quiz)
                        ? 'bg-blue-500 text-white'
                        : answeredQuestions.has(trainingQuizzes.indexOf(quiz))
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                    }`}
                  >
                    Question {trainingQuizzes.indexOf(quiz) + 1}
                  </button>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Quiz Content (Main Area) */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-3/4"
        >
          <h1 className="text-3xl font-bold text-gray-700 mb-6 text-center">Training Quiz</h1>
          <div className="flex justify-between items-center mb-4 text-gray-600">
            <div className="text-lg">
              <span className="font-semibold">Question {currentQuestionIndex + 1}</span> of {trainingQuizzes.length}
            </div>
            <div>
              <span className="font-semibold">Answered: {answeredQuestions.size}</span> | Skipped: {trainingQuizzes.length - answeredQuestions.size}
            </div>
          </div>

          {currentQuiz ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="bg-gray-100 p-4 rounded-lg shadow-md mb-4"
            >
              <h3 className="text-2xl font-medium text-gray-800 mb-4">{currentQuiz.question}</h3>
              <ul className="space-y-2">
                {currentQuiz.answers.map((answer, index) => (
                  <li key={index} className="flex items-center">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name={`quiz-${currentQuiz._id}`}
                        value={index}
                        checked={selectedAnswers[currentQuiz._id] === index}
                        onChange={() => handleAnswerSelect(currentQuiz._id, index)}
                        className="form-radio h-5 w-5 text-blue-600"
                      />
                      <span className="text-gray-700">{answer}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </motion.div>
          ) : (
            <div className="text-center text-xl text-gray-700">No questions available.</div>
          )}

          <div className="flex justify-between mt-4">
            <button
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={currentQuestionIndex === trainingQuizzes.length - 1 ? handleSubmitQuiz : handleNextQuestion}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg"
            >
              {currentQuestionIndex === trainingQuizzes.length - 1 ? 'Submit' : 'Next'}
            </button>
          </div>
          {score !== null && (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.6 }}
    className="mt-6 p-6 rounded-lg bg-white shadow-lg border-t-4 border-blue-500"
  >
    <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Quiz Results</h2>
    <div className="text-lg text-gray-700 text-center">
      <span className="font-bold text-blue-600">You answered {score.correctCount}</span> out of {score.totalQuestions} questions correctly.
      <br />
      <span className="font-semibold text-green-600">Your score: {score.percentage.toFixed(2)}%</span>
    </div>
    
    <h3 className="font-bold mt-6 mb-4 text-xl text-center">Detailed Results:</h3>
    
    <ul className="space-y-4">
      {results.map((result, index) => (
        <motion.li 
          key={index} 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className={`flex justify-between items-center p-4 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 ${
            result.isCorrect ? 'bg-green-100 border-l-4 border-green-500' : 'bg-red-100 border-l-4 border-red-500'
          }`}
        >
          <span className="font-medium text-lg text-gray-800 flex-1">
            {index + 1}. {result.question}
          </span>
          
          <div className="flex items-center space-x-4">
            {result.isCorrect ? (
              <span className="text-green-600 font-bold">Correct!</span>
            ) : (
              <span className="text-red-600 font-bold">Wrong!</span>
            )}

            <div className="text-sm text-gray-600">
              <span className="block">
                Correct Answer: <span className="font-bold text-blue-600">{result.correctAnswerText}</span>
              </span>
            </div>
          </div>
        </motion.li>
      ))}
    </ul>

    {/* Add buttons to navigate to home and main quiz */}
    <div className="mt-6 flex justify-center space-x-4">
      <button
        onClick={() => navigate('/')} // Navigate to home page
        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-all duration-200"
      >
        Go to Home
      </button>
      <button
        onClick={() => navigate('/mainquize')} 
        className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-all duration-200"
      >
        Go to Main Quiz
      </button>
    </div>

  </motion.div>
)}


        </motion.div>
      </motion.div>
    </div>
  );
}
