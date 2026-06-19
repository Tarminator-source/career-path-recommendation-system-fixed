import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Navbar from "../Navbar";

const SignIn = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetStep, setResetStep] = useState(1);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.id]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      Swal.fire({ icon: "error", title: "Error", text: "Please fill in all fields." });
      return;
    }
    try {
      setLoading(true);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/signin/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!data.success) {
        setLoading(false);
        Swal.fire({ icon: "error", title: "Login Failed", text: "Invalid email or password." });
        return;
      }
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userName", data.name || "User");
      setLoading(false);
      navigate("/quiz");
    } catch (error) {
      setLoading(false);
      Swal.fire({ icon: "error", title: "Error", text: "Something went wrong. Try again." });
    }
  };

  const handleForgotPassword = async () => {
    if (resetStep === 1) {
      if (!resetEmail) { Swal.fire({ icon: "error", title: "Error", text: "Enter your email." }); return; }
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/check-email/`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: resetEmail }),
      });
      const data = await res.json();
      if (!data.exists) { Swal.fire({ icon: "error", title: "Not found", text: "No account found with that email." }); return; }
      setResetStep(2);
    } else {
      if (!newPassword || !confirmPassword) { Swal.fire({ icon: "error", title: "Error", text: "Fill in both fields." }); return; }
      if (newPassword !== confirmPassword) { Swal.fire({ icon: "error", title: "Error", text: "Passwords do not match." }); return; }
      if (newPassword.length < 6) { Swal.fire({ icon: "error", title: "Error", text: "Password must be at least 6 characters." }); return; }
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/reset-password/`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: resetEmail, new_password: newPassword }),
      });
      const data = await res.json();
      if (data.success) {
        Swal.fire({ icon: "success", title: "Password Reset!", text: "You can now log in with your new password." });
        setShowForgot(false); setResetStep(1); setResetEmail(""); setNewPassword(""); setConfirmPassword("");
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#050510] text-white flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-6 pt-20">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
            <div className="text-center mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔐</span>
              </div>
              <h2 className="text-2xl font-bold">Welcome back</h2>
              <p className="text-gray-400 mt-1">Sign in to continue your career journey</p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="text-sm text-gray-400 mb-1 block">Email</label>
                <input
                  type="email" id="email" placeholder="you@email.com"
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-violet-500 transition-colors"
                />
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-1 block">Password</label>
                <input
                  type="password" id="password" placeholder="••••••••"
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-violet-500 transition-colors"
                />
              </div>

              <button
                type="button"
                onClick={() => setShowForgot(true)}
                className="text-left text-violet-400 text-sm hover:text-violet-300 transition-colors"
              >
                Forgot password?
              </button>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-xl font-semibold hover:from-violet-700 hover:to-indigo-700 transition-all disabled:opacity-50 mt-2"
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>

            <p className="text-center text-gray-400 text-sm mt-6">
              Don't have an account?{" "}
              <Link to="/register" className="text-violet-400 hover:text-violet-300 font-medium">
                Create one
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgot && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 px-6">
          <div className="bg-[#0f0f1f] border border-white/10 rounded-2xl p-8 w-full max-w-md">
            <h3 className="text-xl font-bold mb-2">Reset Password</h3>
            <p className="text-gray-400 text-sm mb-6">
              {resetStep === 1 ? "Enter your email to get started." : `Set a new password for ${resetEmail}`}
            </p>

            {resetStep === 1 ? (
              <input type="email" placeholder="your@email.com" value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white mb-4 focus:outline-none focus:border-violet-500"
              />
            ) : (
              <div className="flex flex-col gap-3 mb-4">
                <input type="password" placeholder="New password" value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500"
                />
                <input type="password" placeholder="Confirm new password" value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500"
                />
              </div>
            )}

            <div className="flex gap-3">
              <button onClick={handleForgotPassword}
                className="flex-1 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-xl font-semibold hover:from-violet-700 hover:to-indigo-700 transition-all">
                {resetStep === 1 ? "Next →" : "Reset Password"}
              </button>
              <button onClick={() => { setShowForgot(false); setResetStep(1); }}
                className="flex-1 py-3 bg-white/5 border border-white/10 rounded-xl font-semibold hover:bg-white/10 transition-all">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignIn;
