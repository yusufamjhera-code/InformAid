import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { useAuth } from "../context/AuthContext";
import img from "../images/InformAid_Transparent.png";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOTP] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState("login");

  const navigate = useNavigate();
  const { login } = useAuth();

  // Show login toast if redirected from protected page
  useEffect(() => {
    if (sessionStorage.getItem('showLoginToast')) {
      toast.warn('Please log in first', { position: "top-center", autoClose: 3000 });
      sessionStorage.removeItem('showLoginToast');
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await api.post("/api/login", {
        email,
        password,
      });

      if (response.data.token) {
        login(response.data.token);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        toast.success("Logged in successfully!");
        const redirectPath = sessionStorage.getItem('postLoginRedirect');
        console.log('Redirecting after login to:', redirectPath);
        if (redirectPath && redirectPath !== "/login") {
          sessionStorage.removeItem('postLoginRedirect');
          setTimeout(() => {
            navigate(redirectPath, { replace: true });
          }, 0);
        } else {
          setTimeout(() => {
            navigate("/", { replace: true });
          }, 0);
        }
      } else {
        throw new Error("No token received");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      toast.error(err.response?.data?.message || "Failed to log in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    setError("");
    setLoading(true);
    try {
      await api.post("/api/forgot-password", { email });
      setStep("otp");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send OTP");
      toast.error("Failed to send OTP. Please try again."); // Error toast on failure
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    setError("");
    setLoading(true);
    try {
      await api.post("/api/verify-otp", {
        email,
        otp,
      });
      setStep("reset");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP");
      toast.error("Invalid OTP. Please check and try again."); // Error toast for invalid OTP
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (newPassword !== confirmNewPassword) {
      return setError("Passwords do not match");
    }
    setError("");
    setLoading(true);
    try {
      await api.post("/api/reset-password", {
        email,
        newPassword,
      });
      setStep("login");
      toast.success("Password changed successfully!"); // Success toast on password reset
      alert("Password changed successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to reset password");
      toast.error("Failed to change password. Please try again."); // Error toast on failure
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex bg-gradient-to-br from-teal-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 dark:text-gray-100">
      <div className="w-full md:w-1/2 bg-white dark:bg-gray-900 flex items-center justify-center p-8">
        <div className="max-w-md w-full bg-white dark:bg-gray-900 rounded-xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-cyan-900 dark:text-cyan-200 text-center mb-6">
            {step === "login"
              ? "Login"
              : step === "email"
                ? "Reset Password"
                : step === "otp"
                  ? "Verify OTP"
                  : "Set New Password"}
          </h2>

          {error && (
            <div className="bg-red-100 text-red-700 p-3 mb-4 rounded text-center">
              {error}
            </div>
          )}

          {step === "login" && (
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-6 py-4 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-600 text-gray-800"
                  placeholder="Enter your email"
                />
              </div>
              <div className="mb-6">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-6 py-4 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-600 text-gray-800"
                  placeholder="Enter your password"
                />
              </div>
              <button
                type="submit"
                className="w-full py-4 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-lg transition duration-300"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
              <div className="flex justify-between items-center mt-6">
                <button
                  type="button"
                  onClick={() => setStep("email")}
                  className="text-teal-600 hover:text-teal-700 text-sm"
                >
                  Forgot Password?
                </button>
                <a
                  href="/signup"
                  className="text-teal-600 hover:text-teal-700 text-sm"
                >
                  Don't have an account? Register
                </a>
              </div>
            </form>
          )}

          {step === "email" && (
            <>
              <input
                type="email"
                placeholder="Enter registered email"
                className="w-full px-6 py-4 border border-teal-300 rounded-lg mb-4"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                className="w-full py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700"
                onClick={handleForgotPassword}
                disabled={loading}
              >
                {loading ? "Sending OTP..." : "Send OTP"}
              </button>
            </>
          )}

          {step === "otp" && (
            <>
              <input
                type="text"
                placeholder="Enter OTP"
                className="w-full px-6 py-4 border border-teal-300 rounded-lg mb-4"
                value={otp}
                onChange={(e) => setOTP(e.target.value)}
              />
              <button
                className="w-full py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700"
                onClick={handleVerifyOTP}
                disabled={loading}
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
            </>
          )}

          {step === "reset" && (
            <>
              <input
                type="password"
                placeholder="New Password"
                className="w-full px-6 py-4 border border-teal-300 rounded-lg mb-4"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <input
                type="password"
                placeholder="Confirm New Password"
                className="w-full px-6 py-4 border border-teal-300 rounded-lg mb-4"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
              />
              <button
                className="w-full py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700"
                onClick={handleResetPassword}
                disabled={loading}
              >
                {loading ? "Resetting..." : "Reset Password"}
              </button>
            </>
          )}
        </div>
      </div>

      <div className="w-1/2 hidden md:block bg-transparent">
        <img
          src={img}
          alt="InformAid Logo"
          className="w-full h-full object-contain animate-pulse drop-shadow-lg"
          style={{ animationDuration: '2s' }}
        />
      </div>

    </section>
  );
};

export default LoginPage;
