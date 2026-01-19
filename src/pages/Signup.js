import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SignupImg from "../images/Signup.png";
import img from "../images/InformAid_Transparent.png"
import { toast } from "react-toastify";
const SignupPage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    dob: "",
    bloodGroup: "",
    contact: "",
    address: "",
    disabilityType: "",
  });
  const [otp, setOTP] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const { name, email, password, confirmPassword, gender, dob, bloodGroup, contact, address, disabilityType } = formData;

    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }

    try {
      setLoading(true);
      await axios.post("http://localhost:5000/api/signup", {
        name,
        email,
        password,
        confirmPassword,
        gender,
        dob,
        bloodGroup,
        contact,
        address,
        disabilityType,
      });
      setStep(2);
      toast.success("Account created successfully! Please verify OTP to complete registration.");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
      toast.error("Account creation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    setError("");
    try {
      setLoading(true);
      await axios.post("http://localhost:5000/api/signup/verify", {
        email: formData.email,
        otp,
      });
toast.success("OTP verified successfully! Account activated.");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "OTP verification failed");
      toast.error("OTP verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 dark:text-gray-100">
      <div className="w-full md:w-1/2 lg:w-1/3 bg-white dark:bg-gray-900 rounded-xl shadow-2xl dark:shadow-cyan-900/40 p-8">
        <div className="flex justify-center mb-6">
          <img src={img} alt="Signup Visual" className="w-24 h-24 object-cover rounded-full border-4 border-cyan-600" />
        </div>

        <h2 className="text-3xl font-bold text-cyan-900 dark:text-cyan-200 text-center mb-6">
          {step === 1 ? "Create an Account" : "Verify OTP"}
        </h2>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 mb-4 rounded text-center">{error}</div>
        )}

        {step === 1 ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="mb-4">
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-600 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
                />
              </div>
              <div className="mb-4">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Email"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-600 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
                />
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Password"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-600 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
                />
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  placeholder="Confirm Password"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-600 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
                />
              </div>
              <div className="mb-4">
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-600 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="mb-4">
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-600 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
                />
              </div>
              <div className="mb-4">
                <input
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleChange}
                  placeholder="Blood Group (e.g. A+)"
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-600 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
                />
              </div>
              <div className="mb-4">
                <input
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  placeholder="Contact Number"
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-600 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
                />
              </div>
              <div className="mb-4">
                <input
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Address"
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-600 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
                />
              </div>
              <div className="mb-6">
                <select
                  name="disabilityType"
                  value={formData.disabilityType}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-600 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
                >
                  <option value="">Select Disability Type</option>
                  <option value="Visual Impairment">Visual Impairment</option>
                  <option value="Hearing Impairment">Hearing Impairment</option>
                  <option value="Intellectual Disability">Intellectual Disability</option>
                  <option value="Physical Disability">Physical Disability</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-lg transition duration-300"
              disabled={loading}
            >
              {loading ? "Sending OTP..." : "Register"}
            </button>

            <div className="mt-4 text-center">
              <a href="/login" className="text-teal-600 hover:text-teal-700 text-sm">
                Already have an account? Login
              </a>
            </div>
          </form>
        ) : (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOTP(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-600 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 mb-6"
            />
            <button
              onClick={handleVerifyOTP}
              className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition duration-300"
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify & Complete Signup"}
            </button>
          </>
        )}
      </div>
    </section>
  );
};

export default SignupPage;
