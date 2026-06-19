import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Navbar from "../Navbar";

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.id]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.age || !formData.email || !formData.password) {
      Swal.fire({ icon: "error", title: "Error", text: "All fields are required!" });
      return;
    }
    try {
      setLoading(true);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/signup/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!data.success) {
        setLoading(false);
        Swal.fire({ icon: "error", title: "Error", text: "An account with this email already exists." });
        return;
      }
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userName", formData.name);
      Swal.fire({ icon: "success", title: "Account Created!", showConfirmButton: false, timer: 1500 });
      setLoading(false);
      navigate("/quiz");
    } catch (error) {
      setLoading(false);
      Swal.fire({ icon: "error", title: "Error", text: "Something went wrong. Try again." });
    }
  };

  return (
    <div className="min-h-screen bg-[#050510] text-white flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-6 pt-24 pb-12">
        <div className="w-full max-w-md">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
            <div className="text-center mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚀</span>
              </div>
              <h2 className="text-2xl font-bold">Create Your Account</h2>
              <p className="text-gray-400 mt-1">Start your career discovery journey</p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {[
                { id: "name", label: "Full Name", type: "text", placeholder: "John Doe" },
                { id: "age", label: "Age", type: "number", placeholder: "22" },
                { id: "email", label: "Email", type: "email", placeholder: "you@email.com" },
                { id: "password", label: "Password", type: "password", placeholder: "••••••••" },
              ].map((field) => (
                <div key={field.id}>
                  <label className="text-sm text-gray-400 mb-1 block">{field.label}</label>
                  <input
                    type={field.type} id={field.id} placeholder={field.placeholder}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-violet-500 transition-colors"
                  />
                </div>
              ))}

              <button
                type="submit" disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-xl font-semibold hover:from-violet-700 hover:to-indigo-700 transition-all disabled:opacity-50 mt-2"
              >
                {loading ? "Creating Account..." : "Create Account →"}
              </button>
            </form>

            <p className="text-center text-gray-400 text-sm mt-6">
              Already have an account?{" "}
              <Link to="/signin" className="text-violet-400 hover:text-violet-300 font-medium">Sign In</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
