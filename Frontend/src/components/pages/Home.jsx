import React from "react";
import { useNavigate } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import Navbar from "../Navbar";

const Home = () => {
  const navigate = useNavigate();

  const features = [
    { icon: "🧠", title: "AI-Powered Analysis", desc: "Our machine learning model analyzes your skills and interests to predict your ideal IT career path." },
    { icon: "💬", title: "Chat Assistant", desc: "Ask our AI chatbot anything about your recommended career — roles, skills, salaries, and growth paths." },
    { icon: "🎙️", title: "Voice Assistant", desc: "Prefer talking? Use our voice AI to get career guidance hands-free in a conversational way." },
    { icon: "📊", title: "Instant Results", desc: "Get your career prediction in seconds with a confidence score and actionable next steps." },
  ];

  return (
    <div className="min-h-screen bg-[#050510] text-white">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-violet-600/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-indigo-600/10 rounded-full blur-[80px] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-violet-600/10 border border-violet-500/20 rounded-full px-4 py-2 text-violet-300 text-sm mb-8">
            <span className="w-2 h-2 bg-violet-400 rounded-full animate-pulse"></span>
            AI-Powered Career Guidance for IT Students
          </div>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
            Discover Your{" "}
            <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
              Perfect Career
            </span>{" "}
            Path
          </h1>

          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-6 leading-relaxed">
            Answer a few questions about your skills and interests. Our AI will predict 
            the IT career that suits you best and guide you every step of the way.
          </p>

          <div className="mb-10 h-8">
            <TypeAnimation
              sequence={[
                "Software Engineer", 2000,
                "UI/UX Designer", 2000,
                "Data Scientist", 2000,
                "Network Security Expert", 2000,
                "Mobile App Developer", 2000,
              ]}
              wrapper="span"
              repeat={Infinity}
              className="text-violet-400 text-xl font-semibold"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/register")}
              className="px-8 py-4 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-xl font-semibold text-lg hover:from-violet-700 hover:to-indigo-700 transition-all shadow-lg shadow-violet-500/25"
            >
              Get Started Free →
            </button>
            <button
              onClick={() => navigate("/signin")}
              className="px-8 py-4 bg-white/5 border border-white/10 rounded-xl font-semibold text-lg hover:bg-white/10 transition-all"
            >
              Sign In
            </button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything You Need</h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            From prediction to guidance — our platform has all the tools to help you succeed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((f, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/8 hover:border-violet-500/30 transition-all group">
              <div className="text-4xl mb-4">{f.icon}</div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-violet-400 transition-colors">{f.title}</h3>
              <p className="text-gray-400 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center bg-gradient-to-br from-violet-600/20 to-indigo-600/20 border border-violet-500/20 rounded-3xl p-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to find your path?</h2>
          <p className="text-gray-400 text-lg mb-8">Join thousands of IT students who discovered their ideal career with our AI system.</p>
          <button
            onClick={() => navigate("/register")}
            className="px-8 py-4 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-xl font-semibold text-lg hover:from-violet-700 hover:to-indigo-700 transition-all"
          >
            Start Your Assessment →
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 px-6 text-center text-gray-500 text-sm">
        <p>© 2026 CareerPath.ai — Built for FUOYE Final Year Project</p>
      </footer>
    </div>
  );
};

export default Home;
