import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";
import FeedbackForm from "../feedbackForm/Feedback";
import { useSelector } from "react-redux";
import Navbar from "../Navbar";

const Predict = () => {
  const location = useLocation();
  const { prediction, probability } = location.state || {};
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const feedback = useSelector((state) => state.feedbacks);

  const roleMapping = {
    0: "Network Security Engineer", 1: "Software Engineer",
    2: "UI/UX Engineer", 3: "Software Developer",
    4: "Database Developer", 5: "QA Engineer",
    6: "Web Developer", 7: "CRM Technical Developer",
    8: "Technical Supporter", 9: "Systems Security Administrator",
    10: "Applications Developer", 11: "Mobile Applications Developer",
  };

  const roleIcons = {
    0: "🔐", 1: "💻", 2: "🎨", 3: "⚙️", 4: "🗄️", 5: "🧪",
    6: "🌐", 7: "📊", 8: "🛠️", 9: "🛡️", 10: "📱", 11: "📲",
  };

  const role = roleMapping[prediction] || "Unknown Role";
  const icon = roleIcons[prediction] || "🚀";
  const confidence = probability ? Math.round(probability * 100) : null;

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  return (
    <div className="min-h-screen bg-[#050510] text-white flex flex-col">
      <Navbar />
      {loading ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-violet-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-400">Analyzing your profile...</p>
          </div>
        </div>
      ) : (
        <div className="flex-1 px-6 pt-24 pb-12 max-w-4xl mx-auto w-full">

          {prediction !== undefined ? (
            <>
              {/* Result Card */}
              <div className="text-center mb-12">
                <p className="text-gray-400 mb-4 text-lg">Based on your responses, your ideal career is</p>
                <div className="bg-gradient-to-br from-violet-600/20 to-indigo-600/20 border border-violet-500/30 rounded-3xl p-10 mb-6">
                  <div className="text-7xl mb-4">{icon}</div>
                  <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                    {role}
                  </h1>
                  {confidence && (
                    <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-full px-4 py-2">
                      <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                      <span className="text-green-400 font-medium">{confidence}% confidence match</span>
                    </div>
                  )}
                </div>
                <p className="text-gray-400 text-lg">Keep learning, stay consistent, and you'll excel in this role! 💪</p>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
                <button onClick={() => navigate("/chat")}
                  className="py-4 bg-blue-600/20 border border-blue-500/30 rounded-2xl font-semibold hover:bg-blue-600/30 transition-all">
                  💬 Chat with AI
                  <p className="text-gray-400 text-sm font-normal mt-1">Ask about this career</p>
                </button>
                <button onClick={() => navigate("/voice")}
                  className="py-4 bg-green-600/20 border border-green-500/30 rounded-2xl font-semibold hover:bg-green-600/30 transition-all">
                  🎙️ Voice Assistant
                  <p className="text-gray-400 text-sm font-normal mt-1">Talk to our AI</p>
                </button>
                <button onClick={() => navigate("/quiz")}
                  className="py-4 bg-white/5 border border-white/10 rounded-2xl font-semibold hover:bg-white/10 transition-all">
                  🔄 Retake Quiz
                  <p className="text-gray-400 text-sm font-normal mt-1">Try different answers</p>
                </button>
              </div>

              {/* Feedback */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <h3 className="text-xl font-bold mb-2">Share Your Feedback</h3>
                <p className="text-gray-400 mb-6">Are you satisfied with your career prediction?</p>
                <FeedbackForm />
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <p className="text-2xl text-red-400 mb-4">No prediction available.</p>
              <button onClick={() => navigate("/quiz")}
                className="px-8 py-3 bg-violet-600 rounded-xl font-semibold hover:bg-violet-700 transition-all">
                Take the Quiz
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Predict;
