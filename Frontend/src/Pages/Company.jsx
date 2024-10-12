import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Company() {
  const navigate = useNavigate();
  const [isAnimated, setIsAnimated] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimated(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);
  
  const handleGoToDashboard = () => {
    navigate('/dashboard'); // Navigate to the dashboard or any other page after the congratulations page.
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-gradient-to-r from-green-400 to-blue-500 opacity-90">
      <header className="bg-transparent py-8">
        <div className="container mx-auto text-center">
          <h1 className={`text-6xl font-extrabold text-white ${isAnimated ? 'fade-in' : ''}`}>
            Congratulations!
          </h1>
          <p className={`mt-4 text-2xl text-white ${isAnimated ? 'fade-in-delay' : ''}`}>
            You have successfully passed the quiz!
          </p>
        </div>
      </header>

      <main className="flex flex-col items-center justify-center flex-1">
        <div className={`text-center ${isAnimated ? 'fade-in' : ''}`}>
          <h2 className="text-4xl font-bold text-white">Bio Ingredients Lanka (pvt) Ltd</h2>
          <p className="mt-4 text-lg text-white">
            Now that you’ve proven your skills, it’s time to explore exclusive content and opportunities.
          </p>
          {/*<button
            onClick={handleGoToDashboard}
            className="mt-6 px-6 py-3 rounded-lg bg-white text-green-600 font-bold text-lg shadow-lg transition duration-300 ease-in-out hover:bg-gray-100"
          >
            Go to Your Dashboard
          </button>*/}
        </div>
      </main>

      <footer className="bg-transparent text-white py-4">
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

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
