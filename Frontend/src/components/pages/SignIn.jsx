import React, { useState } from "react";
import { motion } from "framer-motion";
import { styles } from "../../styles";
import { EarthCanvas } from "../canvas";
import { slideIn } from "../../utils/motion";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "regenerator-runtime/runtime";

const SignIn = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetStep, setResetStep] = useState(1); // 1=email, 2=new password
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
        Swal.fire({ icon: "error", title: "Oops...", text: "Invalid Credentials!" });
        return;
      }
      setLoading(false);
      navigate("/quiz");
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleForgotPassword = async () => {
    if (resetStep === 1) {
      if (!resetEmail) {
        Swal.fire({ icon: "error", title: "Error", text: "Please enter your email." });
        return;
      }
      // Check if email exists
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/check-email/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: resetEmail }),
      });
      const data = await res.json();
      if (!data.exists) {
        Swal.fire({ icon: "error", title: "Not found", text: "No account found with that email." });
        return;
      }
      setResetStep(2);
    } else {
      if (!newPassword || !confirmPassword) {
        Swal.fire({ icon: "error", title: "Error", text: "Please fill in both password fields." });
        return;
      }
      if (newPassword !== confirmPassword) {
        Swal.fire({ icon: "error", title: "Error", text: "Passwords do not match." });
        return;
      }
      if (newPassword.length < 6) {
        Swal.fire({ icon: "error", title: "Error", text: "Password must be at least 6 characters." });
        return;
      }
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/reset-password/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: resetEmail, new_password: newPassword }),
      });
      const data = await res.json();
      if (data.success) {
        Swal.fire({ icon: "success", title: "Password Reset!", text: "You can now log in with your new password." });
        setShowForgot(false);
        setResetStep(1);
        setResetEmail("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        Swal.fire({ icon: "error", title: "Error", text: "Something went wrong. Try again." });
      }
    }
  };

  return (
    <div className="xl:mt-0 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden min-h-screen">
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="flex-[0.75] p-8 rounded-2xl"
      >
        <h3 className={styles.sectionHeadText}>Sign in</h3>

        <form className="mt-12 flex flex-col gap-8">
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your email</span>
            <input
              type="email"
              id="email"
              placeholder="What's your email?"
              className="bg-transparent py-4 px-6 placeholder:text-secondary text-white rounded border font-medium"
              onChange={handleChange}
            />
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Password</span>
            <input
              type="password"
              id="password"
              placeholder="Your Password?"
              className="bg-transparent py-4 px-6 placeholder:text-secondary text-white rounded border font-medium"
              onChange={handleChange}
            />
          </label>

          {/* Forgot Password link */}
          <p
            className="text-red-400 cursor-pointer hover:underline text-sm -mt-4"
            onClick={() => setShowForgot(true)}
          >
            Forgot Password?
          </p>

          <button
            type="submit"
            className="py-3 px-8 rounded-xl bg-red-600 w-fit text-black font-bold shadow-md shadow-primary hover:bg-red-400"
            onClick={handleSubmit}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

          <div className="flex gap-10 items-center">
            <p>Don't have an Account?</p>
            <Link
              to="/signup"
              className="py-3 px-8 rounded-xl bg-red-600 w-fit text-black font-bold shadow-md shadow-primary hover:bg-red-400"
            >
              Sign Up
            </Link>
          </div>
        </form>

        {/* Forgot Password Modal */}
        {showForgot && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <div className="bg-gray-900 p-8 rounded-2xl w-96 flex flex-col gap-4">
              <h3 className="text-white text-xl font-bold">Reset Password</h3>

              {resetStep === 1 ? (
                <>
                  <p className="text-gray-400 text-sm">Enter your registered email address.</p>
                  <input
                    type="email"
                    placeholder="Your email"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    className="bg-transparent py-3 px-4 text-white rounded border border-gray-600 font-medium"
                  />
                </>
              ) : (
                <>
                  <p className="text-gray-400 text-sm">Enter your new password for <span className="text-white">{resetEmail}</span></p>
                  <input
                    type="password"
                    placeholder="New password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="bg-transparent py-3 px-4 text-white rounded border border-gray-600 font-medium"
                  />
                  <input
                    type="password"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="bg-transparent py-3 px-4 text-white rounded border border-gray-600 font-medium"
                  />
                </>
              )}

              <div className="flex gap-4 mt-2">
                <button
                  onClick={handleForgotPassword}
                  className="py-2 px-6 rounded-xl bg-red-600 text-black font-bold hover:bg-red-400"
                >
                  {resetStep === 1 ? "Next" : "Reset Password"}
                </button>
                <button
                  onClick={() => { setShowForgot(false); setResetStep(1); }}
                  className="py-2 px-6 rounded-xl bg-gray-600 text-white font-bold hover:bg-gray-500"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]"
      >
        <EarthCanvas />
      </motion.div>
    </div>
  );
};

export default SignIn;
