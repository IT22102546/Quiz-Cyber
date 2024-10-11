import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion'; 
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function TrainingQuize() {
  const { currentUser } = useSelector(state => state.user); 
  const [trainingQuizzes, setTrainingQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState(new Set());
  const [score, setScore] = useState(null);
  const [progressPercentage, setProgressPercentage] = useState(0); 
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
    // Calculate the score
    let correctCount = 0;
    trainingQuizzes.forEach((quiz) => {
      if (selectedAnswers[quiz._id] === quiz.correctAnswerIndex) {
        correctCount++;
      }
    });
    const totalQuestions = trainingQuizzes.length;
    const percentageScore = (correctCount / totalQuestions) * 100;

    // Set the score in state
    setScore({ correctCount, totalQuestions, percentage: percentageScore });

    // Calculate progress percentage
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

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-60 to-slate-100 flex justify-center items-center">
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
          <div className="bg-gray-200 p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-bold text-gray-700 mb-4">Questions List</h2>
            <ul className="space-y-2">
              {trainingQuizzes.map((quiz, index) => (
                <motion.li
                  key={quiz._id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <button
                    onClick={() => goToQuestion(index)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors duration-200 ${
                      currentQuestionIndex === index
                        ? 'bg-blue-500 text-white'
                        : answeredQuestions.has(index)
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                    }`}
                  >
                    Question {index + 1}
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
              <div className="mt-6 flex justify-between">
                {currentQuestionIndex > 0 && (
                  <button
                    onClick={handlePreviousQuestion}
                    className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition duration-200"
                  >
                    Previous
                  </button>
                )}
                {currentQuestionIndex < trainingQuizzes.length - 1 ? (
                  <button
                    onClick={handleNextQuestion}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    onClick={handleSubmitQuiz}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-200"
                  >
                    Submit
                  </button>
                )}
              </div>
            </motion.div>
          ) : (
            <p className="text-gray-600">No quizzes found in the selected categories.</p>
          )}

          {/* Display Score after submission */}
          {score && (
            <div className="mt-6">
              <h2 className="text-2xl font-bold text-gray-700">Quiz Results</h2>
              <p className="text-lg">
                You got <span className="font-semibold text-green-500">{score.correctCount}</span> out of <span className="font-semibold text-green-500">{score.totalQuestions}</span> correct!
              </p>
              Your score: <span className={`text-lg font-semibold ${score.percentage < 45 ? 'text-red-500' : 'text-green-500'}`}>
                {score.percentage.toFixed(2)}%
              </span>

              <div className="mt-4">
                <h3 className="text-lg font-semibold">Correct Answers:</h3>
                <ul>
                  {trainingQuizzes.map((quiz) => {
                    const userAnswer = selectedAnswers[quiz._id];
                    const isCorrect = userAnswer === quiz.correctAnswerIndex;

                    return (
                      <li key={quiz._id} className={`flex items-center ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                        <span className="font-medium">{quiz.question}</span>
                        {!isCorrect && (
                          <span className="ml-2">
                            Correct Answer: <span className="font-semibold">{quiz.answers[quiz.correctAnswerIndex]}</span>
                          </span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}
