import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { useSelector, useDispatch } from 'react-redux'; 

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { currentUser, loading } = useSelector((state) => state.user); 
  const [message, setMessage] = useState('');
  const [progress, setProgress] = useState(0); 
  const [isAnimated, setIsAnimated] = useState(false); 

  const quizScore = currentUser?.result; 

  useEffect(() => {
    setTimeout(() => {
      setIsAnimated(true);
    }, 300);

    if (!currentUser) {
      setMessage('No user found. Please log in.');
      return;
    }

    if (quizScore !== undefined) {
      setMessage(quizScore > 45 ? 'Congratulations! You scored above 45%' : 'Score at least 45% to access the company page.');
      setTimeout(() => {
        setProgress(quizScore); 
      }, 300); 
    }
  }, [currentUser, quizScore]); 

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>; 
  }

  const handleNavigation = () => {
    if (quizScore > 45) {
      navigate('/compage'); 
    } else {
      navigate('/quizpage'); 
    }
  };

  const quizPercentage = quizScore !== undefined ? quizScore : 0;

  return (
    <div className="flex flex-col w-full min-h-screen bg-gray-50">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-16 shadow-md">
        <div className="container mx-auto text-center">
          <h1 className={`text-5xl font-extrabold ${isAnimated ? 'slide-in-down' : ''} font-serif`}>
            Welcome to the Professional Quiz Portal
          </h1>
          <p className={`mt-6 text-xl font-light ${isAnimated ? 'slide-in-up' : ''}`}>
            Unlock your potential. Score above 45% to explore exclusive content!
          </p>
        </div>
      </header>

      {/* Content Section */}
      <main className="flex flex-col w-full py-12 bg-gradient-to-b from-blue-100 to-white backdrop-blur-md shadow-lg rounded-lg">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center mb-16">
            <div className={`text-left ${isAnimated ? 'slide-in-left' : ''}`}>
              <h2 className="text-4xl font-bold mb-2 text-gray-900 font-serif">Your Journey Awaits</h2>
              <p className="text-gray-600 text-lg font-sans">
                Stay sharp with our professional quizzes. Let’s help you ace your challenges.
              </p>
            </div>
          </div>

          {/* Quiz Score & Progress Tracker */}
          <div className={`flex items-center justify-between mb-12 bg-gradient-to-br from-white to-blue-50 p-8 rounded-xl shadow-lg border-2 border-blue-200 hover:shadow-xl transition-shadow duration-300 ${isAnimated ? 'fade-in-delay' : ''}`}>
            {/* Quiz Score */}
            <div className={`flex flex-col items-center text-center ${isAnimated ? 'zoom-in' : ''}`}>
              <p className="text-2xl font-semibold text-gray-800 mb-2 font-serif">Your Quiz Score:</p>
              <p className="text-5xl font-extrabold text-gray-900">{quizPercentage}%</p>
              <p className={`text-md font-medium ${quizScore > 45 ? 'text-green-500' : 'text-red-500'}`}>
                {quizScore > 45 ? 'Great job! Keep it up!' : 'You can do better, try again!'}
              </p>
            </div>

            {/* Custom Circular Progress Tracker */}
            <div className={`relative w-40 h-40 progress-circle ${isAnimated ? 'draw' : ''}`}>
              <svg className="absolute top-0 left-0 w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-gray-300 stroke-current"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  strokeWidth="3.8"
                />
                <path
                  className={`${quizScore > 45 ? 'text-green-400' : 'text-red-400'} stroke-current`}
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  strokeWidth="4"
                  strokeDasharray="100"
                  strokeDashoffset={`${100 - progress}`}
                  style={{
                    transition: 'stroke-dashoffset 1.9s ease-out',
                  }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-4xl font-bold text-gray-800">{quizPercentage}%</span>
              </div>
            </div>

            {/* Animated Motivation Block */}
            <div className={`flex flex-col items-center text-center motivation-block ${isAnimated ? 'fade-in-delay' : ''}`}>
              <img src="https://img.icons8.com/fluent/48/000000/trophy.png" alt="Trophy Icon" className="w-12 h-12 mb-4 bounce" />
              <p className="text-xl font-semibold text-gray-700">Aim higher and reach the next level!</p>
            </div>
          </div>

          <div className={`text-center ${isAnimated ? 'fade-in' : ''}`}>
            {message && <p className="text-xl font-semibold text-gray-800 mb-8 font-serif">{message}</p>} 
            
            {quizScore !== undefined && (
              <button 
                className={`px-8 py-4 rounded-lg text-xl font-bold text-white transition duration-300 ease-in-out 
                  ${quizScore > 45 ? 'bg-green-500 hover:bg-green-600 shadow-md' : 'bg-red-500 hover:bg-red-600 shadow-md'} font-sans`}
                onClick={handleNavigation}
              >
                {quizScore > 45 ? 'Go to Company Page' : 'Try Quiz Again'}
              </button>
            )}
          </div>
        </div>
      </main>

      {/* Footer Section */}
      <footer className="bg-gray-900 text-white py-6 mt-auto">
        <div className="container mx-auto text-center">
          <p className="text-sm font-light">&copy; 2024 Quiz Corp. All Rights Reserved.</p>
        </div>
      </footer>

      <style jsx>{`
        .fade-in {
          opacity: 0;
          animation: fadeIn 1s forwards;
        }
        .fade-in-delay {
          opacity: 0;
          animation: fadeIn 1.5s forwards;
        }
        .slide-in-left {
          transform: translateX(-100%);
          animation: slideInLeft 1s forwards;
        }
        .slide-in-down {
          transform: translateY(-100%);
          animation: slideInDown 1s forwards;
        }
        .slide-in-up {
          transform: translateY(100%);
          animation: slideInUp 1s forwards;
        }
        .zoom-in {
          transform: scale(0);
          animation: zoomIn 1.5s forwards;
        }
        .draw {
          animation: drawCircle 2s forwards;
        }
        .motivation-block {
          opacity: 0;
          animation: fadeIn 1.5s forwards;
        }
        .bounce {
          animation: bounce 2s infinite;
        }

        @keyframes fadeIn {
          to {
            opacity: 1;
          }
        }

        @keyframes slideInLeft {
          to {
            transform: translateX(0);
          }
        }

        @keyframes slideInDown {
          to {
            transform: translateY(0);
          }
        }

        @keyframes slideInUp {
          to {
            transform: translateY(0);
          }
        }

        @keyframes zoomIn {
          to {
            transform: scale(1);
          }
        }

        @keyframes drawCircle {
          to {
            stroke-dashoffset: 0;
          }
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </div>
  );
}
