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
  const [quizScore, setQuizScore] = useState(0);
  const [showPopup, setShowPopup] = useState(false); // To show terms and conditions modal
  const [termsAccepted, setTermsAccepted] = useState(false); // To track if terms are accepted

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimated(true);
    }, 300);

    if (!currentUser) {
      setMessage('No user found. Please log in.');
      return;
    } else {
      setShowPopup(true); // Show terms and conditions popup only when user is logged in
    }

    const fetchUserData = async () => {
      try {
        const response = await fetch(`/api/user/updateresult/${currentUser._id}`);
        const data = await response.json();
        if (data?.result !== undefined) {
          setQuizScore(data.result);
          setMessage(
            data.result > 45 ? 'Congratulations! You scored above 45%' : 'Score at least 45% to access the company page.'
          );
          setProgress(data.result);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
    const interval = setInterval(fetchUserData, 5000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [currentUser]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  const handleNavigation = () => {
    if (quizScore > 45) {
      navigate('/company');
    } else {
      navigate('/mainquize');
    }
  };

  const quizPercentage = quizScore;

  const handleTermsAcceptance = () => {
    if (termsAccepted) {
      setShowPopup(false); // Hide the modal after accepting terms
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-gray-50">
      {showPopup && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white rounded-lg p-8 shadow-lg w-[600px]"> {/* Custom width */}
      <h2 className="text-xl font-bold mb-4 text-gray-900">Terms and Conditions</h2>
      <p className="text-gray-700 mb-4">
        By continuing, you agree to the following policies and terms of using this platform:
      </p>
      <p className="font-semibold mb-2">POLICIES</p>
      <ul className="list-disc list-inside text-gray-700 mb-4">
        <li><strong>ISO 9001</strong> (Quality Management System): Ensures consistent quality of products and services.</li>
        <li><strong>ISO 14001</strong> (Environmental Management System): Minimizes environmental impact through effective management.</li>
        <li><strong>ISO 45001</strong> (Occupational Health and Safety): Ensures a safe working environment, particularly for chemical handling.</li>
        <li><strong>REACH</strong> (Registration, Evaluation, Authorisation, and Restriction of Chemicals): A European Union regulation focusing on safe production and use of chemical substances.</li>
        <li><strong>GHS</strong> (Globally Harmonized System): Ensures consistent global safety guidelines for labeling and classification of chemicals.</li>
        <li><strong>Responsible Care</strong>: A global initiative to improve health, safety, and environmental performance in the chemical industry.</li>
        <li><strong>ISO 50001</strong> (Energy Management System): Aims at improving energy performance and reducing energy costs.</li>
        <li><strong>ADR</strong> (European Agreement for Dangerous Goods by Road): Ensures safe transportation of dangerous chemicals by road.</li>

      </ul>
      <div className="flex items-center mb-4">
        <input
          type="checkbox"
          id="acceptTerms"
          className="mr-2"
          checked={termsAccepted}
          onChange={(e) => setTermsAccepted(e.target.checked)}
        />
        <label htmlFor="acceptTerms" className="text-gray-700">
          I accept the terms and conditions.
        </label>
      </div>
      <button
        className={`px-6 py-3 rounded-lg text-white font-semibold transition-colors ${
          termsAccepted ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400 cursor-not-allowed'
        }`}
        onClick={handleTermsAcceptance}
        disabled={!termsAccepted}
      >
        Continue
      </button>
    </div>
  </div>
)}



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

          <div
            className={`flex items-center justify-between mb-12 bg-gradient-to-br from-white to-blue-50 p-8 rounded-xl shadow-lg border-2 border-blue-200 hover:shadow-xl transition-shadow duration-300 ${
              isAnimated ? 'fade-in-delay' : ''
            }`}
          >
            <div className={`flex flex-col items-center text-center ${isAnimated ? 'zoom-in' : ''}`}>
              <p className="text-2xl font-semibold text-gray-800 mb-2 font-serif">Your Quiz Score:</p>
              <p className="text-5xl font-extrabold text-gray-900">{quizPercentage}%</p>
              <p className={`text-md font-medium ${quizScore > 45 ? 'text-green-500' : 'text-red-500'}`}>
                {quizScore > 45 ? 'Great job! Keep it up!' : 'You can do better, try again!'}
              </p>
            </div>

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

            <div className={`flex flex-col items-center text-center motivation-block ${isAnimated ? 'fade-in-delay' : ''}`}>
              <img
                src="https://img.icons8.com/fluent/48/000000/trophy.png"
                alt="Trophy Icon"
                className={`w-12 h-12 mb-4 ${isAnimated ? 'bounce' : ''}`}
              />
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

      <footer className="bg-gray-900 text-white py-6 mt-auto">
        <div className="container mx-auto text-center font-light font-sans">
          <p className="text-sm">© 2024 Professional Quiz Portal. All rights reserved.</p>
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
          animation: fadeIn 1.2s forwards;
        }
        .bounce {
          animation: bounce 1s infinite;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slideInLeft {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(0);
          }
        }
        @keyframes slideInDown {
          from {
            transform: translateY(-100%);
          }
          to {
            transform: translateY(0);
          }
        }
        @keyframes slideInUp {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        @keyframes zoomIn {
          from {
            transform: scale(0);
          }
          to {
            transform: scale(1);
          }
        }
        @keyframes drawCircle {
          from {
            stroke-dashoffset: 100;
          }
          to {
            stroke-dashoffset: 0;
          }
        }
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-10px);
          }
          60% {
            transform: translateY(-5px);
          }
        }
      `}</style>
    </div>
  );
}

// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';

// export default function Home() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const { currentUser, loading } = useSelector((state) => state.user);
//   const [message, setMessage] = useState('');
//   const [progress, setProgress] = useState(0);
//   const [isAnimated, setIsAnimated] = useState(false);
//   const [quizScore, setQuizScore] = useState(0); 

//   console.log(currentUser);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsAnimated(true);
//     }, 300);

//     if (!currentUser) {
//       setMessage('No user found. Please log in.');
//       return;
//     }

//     const fetchUserData = async () => {
//       try {
//         const response = await fetch(`/api/user/updateresult/${currentUser._id}`);
//         const data = await response.json();
//         if (data?.result !== undefined) {
//           setQuizScore(data.result); 
//           setMessage(data.result > 45 ? 'Congratulations! You scored above 45%' : 'Score at least 45% to access the company page.');
//           setProgress(data.result);
//         }
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//       }
//     };

//     fetchUserData();
//     const interval = setInterval(fetchUserData, 5000);

//     return () => {
//       clearTimeout(timer);
//       clearInterval(interval);
//     };
//   }, [currentUser]);

//   if (loading) {
//     return <div className="flex justify-center items-center h-screen">Loading...</div>;
//   }

//   const handleNavigation = () => {
//     if (quizScore > 45) {
//       navigate('/company');
//     } else {
//       navigate('/mainquize');
//     }
//   };

//   const quizPercentage = quizScore;

//   return (
//     <div className="flex flex-col w-full min-h-screen bg-gray-50">
//       <header className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-16 shadow-md">
//         <div className="container mx-auto text-center">
//           <h1 className={`text-5xl font-extrabold ${isAnimated ? 'slide-in-down' : ''} font-serif`}>
//             Welcome to the Professional Quiz Portal
//           </h1>
//           <p className={`mt-6 text-xl font-light ${isAnimated ? 'slide-in-up' : ''}`}>
//             Unlock your potential. Score above 45% to explore exclusive content!
//           </p>
//         </div>
//       </header>

//       <main className="flex flex-col w-full py-12 bg-gradient-to-b from-blue-100 to-white backdrop-blur-md shadow-lg rounded-lg">
//         <div className="container mx-auto px-6">
//           <div className="flex justify-between items-center mb-16">
//             <div className={`text-left ${isAnimated ? 'slide-in-left' : ''}`}>
//               <h2 className="text-4xl font-bold mb-2 text-gray-900 font-serif">Your Journey Awaits</h2>
//               <p className="text-gray-600 text-lg font-sans">
//                 Stay sharp with our professional quizzes. Let’s help you ace your challenges.
//               </p>
//             </div>
//           </div>

//           <div className={`flex items-center justify-between mb-12 bg-gradient-to-br from-white to-blue-50 p-8 rounded-xl shadow-lg border-2 border-blue-200 hover:shadow-xl transition-shadow duration-300 ${isAnimated ? 'fade-in-delay' : ''}`}>
//             <div className={`flex flex-col items-center text-center ${isAnimated ? 'zoom-in' : ''}`}>
//               <p className="text-2xl font-semibold text-gray-800 mb-2 font-serif">Your Quiz Score:</p>
//               <p className="text-5xl font-extrabold text-gray-900">{quizPercentage}%</p>
//               <p className={`text-md font-medium ${quizScore > 45 ? 'text-green-500' : 'text-red-500'}`}>
//                 {quizScore > 45 ? 'Great job! Keep it up!' : 'You can do better, try again!'}
//               </p>
//             </div>

//             <div className={`relative w-40 h-40 progress-circle ${isAnimated ? 'draw' : ''}`}>
//               <svg className="absolute top-0 left-0 w-full h-full transform -rotate-90" viewBox="0 0 36 36">
//                 <path
//                   className="text-gray-300 stroke-current"
//                   d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
//                   fill="none"
//                   strokeWidth="3.8"
//                 />
//                 <path
//                   className={`${quizScore > 45 ? 'text-green-400' : 'text-red-400'} stroke-current`}
//                   d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
//                   fill="none"
//                   strokeWidth="4"
//                   strokeDasharray="100"
//                   strokeDashoffset={`${100 - progress}`}
//                   style={{
//                     transition: 'stroke-dashoffset 1.9s ease-out',
//                   }}
//                 />
//               </svg>
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <span className="text-4xl font-bold text-gray-800">{quizPercentage}%</span>
//               </div>
//             </div>

//             <div className={`flex flex-col items-center text-center motivation-block ${isAnimated ? 'fade-in-delay' : ''}`}>
//               {/* Animated Trophy Icon */}
//               <img src="https://img.icons8.com/fluent/48/000000/trophy.png" alt="Trophy Icon" className={`w-12 h-12 mb-4 ${isAnimated ? 'bounce' : ''}`} />
//               <p className="text-xl font-semibold text-gray-700">Aim higher and reach the next level!</p>
//             </div>
//           </div>

//           <div className={`text-center ${isAnimated ? 'fade-in' : ''}`}>
//             {message && <p className="text-xl font-semibold text-gray-800 mb-8 font-serif">{message}</p>}

//             {quizScore !== undefined && (
//               <button
//                 className={`px-8 py-4 rounded-lg text-xl font-bold text-white transition duration-300 ease-in-out 
//                   ${quizScore > 45 ? 'bg-green-500 hover:bg-green-600 shadow-md' : 'bg-red-500 hover:bg-red-600 shadow-md'} font-sans`}
//                 onClick={handleNavigation}
//               >
//                 {quizScore > 45 ? 'Go to Company Page' : 'Try Quiz Again'}
//               </button>
//             )}
//           </div>
//         </div>
//       </main>

//       <footer className="bg-gray-900 text-white py-6 mt-auto">
//         <div className="container mx-auto text-center">
//           <p className="text-sm font-light">&copy; 2024 Quiz Corp. All Rights Reserved.</p>
//         </div>
//       </footer>

      // <style jsx>{`
      //   .fade-in {
      //     opacity: 0;
      //     animation: fadeIn 1s forwards;
      //   }
      //   .fade-in-delay {
      //     opacity: 0;
      //     animation: fadeIn 1.5s forwards;
      //   }
      //   .slide-in-left {
      //     transform: translateX(-100%);
      //     animation: slideInLeft 1s forwards;
      //   }
      //   .slide-in-down {
      //     transform: translateY(-100%);
      //     animation: slideInDown 1s forwards;
      //   }
      //   .slide-in-up {
      //     transform: translateY(100%);
      //     animation: slideInUp 1s forwards;
      //   }
      //   .zoom-in {
      //     transform: scale(0);
      //     animation: zoomIn 1.5s forwards;
      //   }
      //   .draw {
      //     animation: drawCircle 2s forwards;
      //   }
      //   .motivation-block {
      //     opacity: 0;
      //     animation: fadeIn 1.2s forwards;
      //   }
      //   .bounce {
      //     animation: bounce 1s infinite;
      //   }

      //   @keyframes fadeIn {
      //     from {
      //       opacity: 0;
      //     }
      //     to {
      //       opacity: 1;
      //     }
      //   }
      //   @keyframes slideInLeft {
      //     from {
      //       transform: translateX(-100%);
      //     }
      //     to {
      //       transform: translateX(0);
      //     }
      //   }
      //   @keyframes slideInDown {
      //     from {
      //       transform: translateY(-100%);
      //     }
      //     to {
      //       transform: translateY(0);
      //     }
      //   }
      //   @keyframes slideInUp {
      //     from {
      //       transform: translateY(100%);
      //     }
      //     to {
      //       transform: translateY(0);
      //     }
      //   }
      //   @keyframes zoomIn {
      //     from {
      //       transform: scale(0);
      //     }
      //     to {
      //       transform: scale(1);
      //     }
      //   }
      //   @keyframes drawCircle {
      //     from {
      //       stroke-dashoffset: 100;
      //     }
      //     to {
      //       stroke-dashoffset: 0;
      //     }
      //   }
      //   @keyframes bounce {
      //     0%, 20%, 50%, 80%, 100% {
      //       transform: translateY(0);
      //     }
      //     40% {
      //       transform: translateY(-10px);
      //     }
      //     60% {
      //       transform: translateY(-5px);
      //     }
      //   }
      // `}</style>
//     </div>
//   );
// }
