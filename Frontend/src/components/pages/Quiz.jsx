import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Navbar from "../Navbar";

const Quiz = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    question1: "", question2: "", question3: "", question4: "",
    question5: "", question6: "", question7: "", question8: "",
    question9: "", question10: "", question11: "", question12: "",
    question13: "", question14: "", question15: "", question16: "",
    question17: "", question18: "", question19: "",
  });

  const questions = [
    { key: "question1", label: "How would you rate your logical reasoning skills?", type: "number", min: 1, max: 9, hint: "Rate from 1 (low) to 9 (high)" },
    { key: "question2", label: "How many hackathons have you participated in?", type: "number", min: 0, max: 6, hint: "Enter a number from 0 to 6" },
    { key: "question3", label: "How would you rate your coding skills?", type: "number", min: 1, max: 9, hint: "Rate from 1 (low) to 9 (high)" },
    { key: "question4", label: "How would you rate your public speaking skills?", type: "number", min: 1, max: 9, hint: "Rate from 1 (low) to 9 (high)" },
    { key: "question5", label: "Do you consider yourself good at self-learning?", type: "select", options: [{ value: "1", label: "Yes" }, { value: "0", label: "No" }] },
    { key: "question6", label: "Have you completed extra courses outside formal education?", type: "select", options: [{ value: "1", label: "Yes" }, { value: "0", label: "No" }] },
    { key: "question7", label: "Which certification do you have?", type: "select", options: [
      { value: "R Programming", label: "R Programming" },
      { value: "Information Security", label: "Information Security" },
      { value: "Shell Programming", label: "Shell Programming" },
      { value: "Machine Learning", label: "Machine Learning" },
      { value: "Full Stack", label: "Full Stack" },
      { value: "Hadoop", label: "Hadoop" },
      { value: "Python", label: "Python" },
      { value: "Distro Making", label: "Distro Making" },
      { value: "App Development", label: "App Development" },
    ]},
    { key: "question8", label: "Which workshop have you attended?", type: "select", options: [
      { value: "Database Security", label: "Database Security" },
      { value: "System Designing", label: "System Designing" },
      { value: "Web Technologies", label: "Web Technologies" },
      { value: "Machine Learning", label: "Machine Learning" },
      { value: "Hacking", label: "Hacking" },
      { value: "Testing", label: "Testing" },
      { value: "Data Science", label: "Data Science" },
      { value: "Game Development", label: "Game Development" },
      { value: "Cloud Computing", label: "Cloud Computing" },
    ]},
    { key: "question9", label: "How would you rate your reading and writing skills?", type: "select", options: [{ value: "0", label: "Poor" }, { value: "1", label: "Medium" }, { value: "2", label: "Excellent" }] },
    { key: "question10", label: "How would you rate your memory capability?", type: "select", options: [{ value: "0", label: "Poor" }, { value: "1", label: "Medium" }, { value: "2", label: "Excellent" }] },
    { key: "question11", label: "Which subjects are you most interested in?", type: "select", options: [
      { value: "0", label: "Software Engineering" }, { value: "1", label: "IOT" },
      { value: "2", label: "Cloud Computing" }, { value: "3", label: "Programming" },
      { value: "4", label: "Networks" }, { value: "5", label: "Computer Architecture" },
      { value: "6", label: "Data Engineering" }, { value: "7", label: "Hacking" },
      { value: "8", label: "Management" }, { value: "9", label: "Parallel Computing" },
    ]},
    { key: "question12", label: "What is your preferred career area?", type: "select", options: [
      { value: "0", label: "System Developer" }, { value: "1", label: "Security" },
      { value: "2", label: "Business Process Analyst" }, { value: "3", label: "Developer" },
      { value: "4", label: "Testing" }, { value: "5", label: "Cloud Computing" },
    ]},
    { key: "question13", label: "What type of company would you like to work for?", type: "select", options: [
      { value: "0", label: "Service Based" }, { value: "1", label: "Web Services" },
      { value: "2", label: "BPA" }, { value: "3", label: "Testing & Maintenance" },
      { value: "4", label: "Product Based" }, { value: "5", label: "Finance" },
      { value: "6", label: "Cloud Services" }, { value: "7", label: "Product Development" },
      { value: "8", label: "Sales & Marketing" }, { value: "9", label: "SaaS Services" },
    ]},
    { key: "question14", label: "Do you take advice from seniors or elders?", type: "select", options: [{ value: "1", label: "Yes" }, { value: "0", label: "No" }] },
    { key: "question15", label: "What types of books do you enjoy reading?", type: "select", options: [
      { value: "0", label: "Guide" }, { value: "1", label: "Health" }, { value: "2", label: "Self Help" },
      { value: "3", label: "Horror" }, { value: "4", label: "Biographies" }, { value: "5", label: "Science Fiction" },
      { value: "6", label: "Satire" }, { value: "7", label: "Children" }, { value: "8", label: "Autobiographies" },
      { value: "9", label: "Prayer Books" }, { value: "10", label: "Fantasy" }, { value: "11", label: "Journals" },
      { value: "12", label: "Trilogy" }, { value: "13", label: "Anthology" }, { value: "14", label: "Encyclopedias" },
      { value: "15", label: "Drama" }, { value: "16", label: "Mystery" }, { value: "17", label: "History" },
      { value: "18", label: "Science" }, { value: "19", label: "Dictionaries" }, { value: "20", label: "Diaries" },
      { value: "21", label: "Religion/Spirituality" }, { value: "22", label: "Action & Adventure" },
      { value: "23", label: "Poetry" }, { value: "24", label: "Cookbooks" }, { value: "25", label: "Comics" },
      { value: "26", label: "Art" }, { value: "27", label: "Travel" }, { value: "28", label: "Series" },
      { value: "29", label: "Math" }, { value: "30", label: "Romance" },
    ]},
    { key: "question16", label: "Do you prefer management roles over technical roles?", type: "select", options: [{ value: "1", label: "Yes, Management" }, { value: "0", label: "No, Technical" }] },
    { key: "question17", label: "Do you consider yourself a hard worker or smart worker?", type: "select", options: [{ value: "0", label: "Hard Worker" }, { value: "1", label: "Smart Worker" }] },
    { key: "question18", label: "Have you ever worked in a team?", type: "select", options: [{ value: "1", label: "Yes" }, { value: "0", label: "No" }] },
    { key: "question19", label: "Are you an introvert?", type: "select", options: [{ value: "1", label: "Yes" }, { value: "0", label: "No" }] },
  ];

  const current = questions[currentStep];
  const progress = ((currentStep) / questions.length) * 100;

  const handleChange = (value) => {
    setFormData({ ...formData, [current.key]: value });
  };

  const handleNext = () => {
    if (!formData[current.key] && formData[current.key] !== "0") {
      Swal.fire({ icon: "warning", title: "Please answer this question", timer: 1500, showConfirmButton: false });
      return;
    }
    if (currentStep < questions.length - 1) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async () => {
    if (!formData[current.key] && formData[current.key] !== "0") {
      Swal.fire({ icon: "warning", title: "Please answer this question", timer: 1500, showConfirmButton: false });
      return;
    }
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/get/quiz/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      navigate("/predict", { state: { prediction: data.prediction, probability: data.probability } });
    } catch (error) {
      Swal.fire({ icon: "error", title: "Error", text: "Something went wrong. Please try again." });
    }
  };

  return (
    <div className="min-h-screen bg-[#050510] text-white flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-6 pt-24 pb-12">
        <div className="w-full max-w-2xl">

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Career Assessment Quiz</h1>
            <p className="text-gray-400">Answer honestly — there are no right or wrong answers</p>
          </div>

          {/* Progress bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-400 mb-2">
              <span>Question {currentStep + 1} of {questions.length}</span>
              <span>{Math.round(progress)}% complete</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-6">
            <p className="text-gray-400 text-sm mb-2">Question {currentStep + 1}</p>
            <h2 className="text-xl font-semibold mb-6">{current.label}</h2>

            {current.type === "number" ? (
              <div>
                <input
                  type="number"
                  min={current.min} max={current.max}
                  value={formData[current.key]}
                  onChange={(e) => handleChange(e.target.value)}
                  placeholder={`Enter ${current.min}–${current.max}`}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-lg focus:outline-none focus:border-violet-500 transition-colors"
                />
                {current.hint && <p className="text-gray-500 text-sm mt-2">{current.hint}</p>}
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-3">
                {current.options.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => handleChange(opt.value)}
                    className={`text-left px-4 py-3 rounded-xl border transition-all ${
                      formData[current.key] === opt.value
                        ? "bg-violet-600/30 border-violet-500 text-white"
                        : "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:border-white/20"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex gap-4">
            {currentStep > 0 && (
              <button onClick={handleBack}
                className="flex-1 py-3 bg-white/5 border border-white/10 rounded-xl font-semibold hover:bg-white/10 transition-all">
                ← Back
              </button>
            )}
            {currentStep < questions.length - 1 ? (
              <button onClick={handleNext}
                className="flex-1 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-xl font-semibold hover:from-violet-700 hover:to-indigo-700 transition-all">
                Next →
              </button>
            ) : (
              <button onClick={handleSubmit}
                className="flex-1 py-3 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all">
                🔮 Reveal My Career Path
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
