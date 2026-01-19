import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../api';
import { FaSearch, FaArrowLeft } from 'react-icons/fa';

const DisplaySection = () => {
  const { id } = useParams();
  const [schemes, setSchemes] = useState([]);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const idToNameMap = {
    '1': 'Visual Impairment Schemes',
    '2': 'Hearing Impairment Schemes',
    '3': 'Intellectual Disability Schemes',
    '4': 'Physical Disability Schemes',
  };

  const sectionName = idToNameMap[id] || 'Government Schemes';

  useEffect(() => {
    const fetchSchemes = async () => {
      try {
        const response = await api.get(`/api/schemes/${id}`);
        if (Array.isArray(response.data)) {
          setSchemes(response.data);
        } else {
          setSchemes([]);
          console.error('Unexpected response:', response.data);
        }
      } catch (error) {
        console.error('Error fetching schemes:', error);
        setSchemes([]);
      }
    };

    fetchSchemes();
  }, [id]);

  const handleLearnMore = (schemeId) => {
    const token = localStorage.getItem('token');

    if (token) {
      navigate(`/detail-info/${schemeId}`);
    } else {
      sessionStorage.setItem('postLoginRedirect', `/detail-info/${schemeId}`);
      sessionStorage.setItem('showLoginToast', 'true');
      navigate('/login');
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 dark:from-gray-900 dark:to-gray-800 dark:text-gray-100 py-16 px-6 flex flex-col items-center">
      <h2 className="text-4xl md:text-5xl font-bold text-cyan-800 dark:text-cyan-200 text-center mb-8">
        {sectionName}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {schemes.map((scheme, index) => (
          <div
            key={scheme._id || index}
            className="bg-white dark:bg-gray-800 shadow-lg rounded-3xl p-8 transition-transform transform hover:scale-105 hover:shadow-2xl"
          >
            <h3 className="text-2xl font-semibold text-cyan-800 dark:text-cyan-200 hover:text-cyan-600 dark:hover:text-cyan-400 mb-4">
              {scheme.name}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">{scheme.short_description}</p>
            <button
              onClick={() => handleLearnMore(scheme._id)}
              className="bg-cyan-600 dark:bg-cyan-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md transform transition duration-300 ease-in-out hover:bg-cyan-700 dark:hover:bg-cyan-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 active:bg-purple-800"
            >
              Learn More
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DisplaySection;
