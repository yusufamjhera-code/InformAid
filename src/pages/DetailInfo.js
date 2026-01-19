import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaCheckCircle, FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";
import api from "../api";

const DetailInfo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [scheme, setScheme] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loadingRecommendations, setLoadingRecommendations] = useState(false);

  // Login check
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      if (window.location.pathname !== "/login") {
        sessionStorage.setItem('postLoginRedirect', window.location.pathname);
      }
      sessionStorage.setItem('showLoginToast', 'true');
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    const fetchScheme = async () => {
      try {
        const response = await api.get(`/api/scheme/${id}`);
        if (response.data && response.data._id) {
          setScheme(response.data);
        } else {
          setError("No scheme found.");
        }
      } catch (err) {
        setError("Failed to fetch scheme details.");
      } finally {
        setLoading(false);
      }
    };

    fetchScheme();
  }, [id]);

  // Fetch recommendations when scheme is loaded
  useEffect(() => {
    const fetchRecommendations = async () => {
      if (!scheme || !scheme._id) return;

      setLoadingRecommendations(true);
      try {
        const response = await api.get(
          `/api/scheme/${scheme._id}/recommendations?method=bfs&limit=5`
        );
        if (Array.isArray(response.data)) {
          setRecommendations(response.data);
        }
      } catch (err) {
        console.error('Error fetching recommendations:', err);
      } finally {
        setLoadingRecommendations(false);
      }
    };

    fetchRecommendations();
  }, [scheme]);

  if (loading) return <div className="text-center mt-10 text-lg">Loading...</div>;
  if (error) return <div className="text-center text-red-500 mt-10">{error}</div>;
  if (!scheme) return <div className="text-center mt-10">No scheme found.</div>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="mx-auto bg-gradient-to-br from-teal-100 to-blue-200 dark:from-gray-900 dark:to-gray-800 dark:text-gray-100 p-10"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="max-w-5xl mx-auto bg-gradient-to-br from-teal-50 to-blue-100 dark:from-gray-800 dark:to-gray-900 p-6 sm:p-10 rounded-3xl shadow-xl"
      >
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="bg-gradient-to-r from-cyan-600 to-blue-500 dark:from-cyan-800 dark:to-blue-900 text-white p-6 rounded-2xl shadow mb-6"
        >
          <h2 className="text-4xl font-bold text-white">{scheme.name}</h2>
          <p className="mt-2 text-white/90 italic">{scheme.short_description}</p>
        </motion.div>

        {/* Details Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="space-y-4 text-gray-800 dark:text-gray-100"
        >
          <p>
            <span className="font-semibold text-cyan-800 dark:text-cyan-300">Description:</span> {scheme.full_description || 'N/A'}
          </p>
          <div>
            <span className="font-semibold text-cyan-800 dark:text-cyan-300">Benefits:</span>
            <ul className="list-disc list-inside ml-4">
              {scheme.benefits && scheme.benefits.length > 0 ? scheme.benefits.map((b, i) => <li key={i}>{b}</li>) : <li>N/A</li>}
            </ul>
          </div>
          <div>
            <span className="font-semibold text-cyan-800 dark:text-cyan-300">Eligibility Criteria:</span>
            <ul className="list-disc list-inside ml-4">
              {scheme.eligibility && scheme.eligibility.length > 0 ? scheme.eligibility.map((e, i) => <li key={i}>{e}</li>) : <li>N/A</li>}
            </ul>
          </div>
          <p>
            <span className="font-semibold text-cyan-800 dark:text-cyan-300">Exclusions:</span> N/A
          </p>

          {/* Steps to Apply - Styled Creatively */}
          <div>
            <h3 className="text-2xl font-semibold text-cyan-800 dark:text-cyan-300 mb-2">Steps to Apply</h3>
            <div className="space-y-4">
              {scheme.application_process && scheme.application_process.length > 0 ? scheme.application_process.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                  className="flex items-start gap-3 bg-teal-50 dark:bg-gray-800 border-l-4 border-cyan-600 dark:border-cyan-400 shadow-sm p-4 rounded-lg"
                >
                  <div className="mt-1 text-cyan-600 dark:text-cyan-400">
                    <FaCheckCircle size={20} />
                  </div>
                  <div>
                    <span className="font-medium text-cyan-800 dark:text-cyan-300">Step {index + 1}:</span> {step}
                  </div>
                </motion.div>
              )) : <div className="ml-4">N/A</div>}
            </div>
          </div>

          {/* Documents Required */}
          <div className="mt-6">
            <h3 className="text-2xl font-semibold text-teal-700 dark:text-cyan-300 mb-2">Documents Required</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-200 pl-2">
              {scheme.documents_required && scheme.documents_required.length > 0 ? scheme.documents_required.map((doc, index) => (
                <motion.li
                  key={index}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                >
                  {doc}
                </motion.li>
              )) : <li>N/A</li>}
            </ul>
          </div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            {/* Apply Now Button */}
            {scheme.official_link ? (
              <a
                href={scheme.official_link}
                className="inline-block bg-cyan-800 dark:bg-cyan-600 text-white py-2 px-6 rounded-lg text-center hover:bg-cyan-700 dark:hover:bg-cyan-700 transition duration-300 ease-in-out"
                target="_blank"
                rel="noopener noreferrer"
              >
                Apply Now
              </a>
            ) : (
              <button
                className="inline-block bg-gray-400 dark:bg-gray-700 text-white py-2 px-6 rounded-lg text-center cursor-not-allowed"
                disabled
                title="No official link available"
              >
                Apply Now
              </button>
            )}
          </motion.div>
        </motion.div>

        {/* Recommended Schemes Section */}
        {recommendations.length > 0 && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="mt-8 pt-8 border-t-2 border-cyan-300 dark:border-cyan-700"
          >
            <h3 className="text-3xl font-bold text-cyan-800 dark:text-cyan-300 mb-6">
              Related Schemes You Might Like
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Based on similar disability types, benefits, and eligibility criteria
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recommendations.map((recScheme, index) => (
                <motion.div
                  key={recScheme._id}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.9 + index * 0.1, duration: 0.5 }}
                  onClick={() => navigate(`/detail-info/${recScheme._id}`)}
                  className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-xl cursor-pointer transition-all duration-300 border border-cyan-200 dark:border-cyan-800 hover:border-cyan-400 dark:hover:border-cyan-600"
                >
                  <h4 className="text-lg font-semibold text-cyan-800 dark:text-cyan-300 mb-2">
                    {recScheme.name}
                  </h4>
                  {recScheme.short_description && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
                      {recScheme.short_description}
                    </p>
                  )}
                  <div className="flex items-center text-cyan-600 dark:text-cyan-400 text-sm font-medium">
                    View Details <FaArrowRight className="ml-2" size={12} />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {loadingRecommendations && (
          <div className="mt-8 text-center text-gray-500 dark:text-gray-400">
            Loading recommendations...
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default DetailInfo;
