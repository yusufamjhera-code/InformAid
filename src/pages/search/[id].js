import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

const DisplaySection = () => {
  const router = useRouter();
  const { id } = router.query;
  const [schemes, setSchemes] = useState([]);

  const idToNameMap = {
    '1': 'Visual Impairment Schemes',
    '2': 'Hearing Impairment Schemes',
    '3': 'Intellectual Disability Schemes',
    '4': 'Physical Disability Schemes',
  };

  const sectionName = idToNameMap[id] || 'Government Schemes';

  useEffect(() => {
    const fetchSchemes = async () => {
      if (!id) return; // Wait for id to be available
      try {
        const response = await fetch(`/api/schemes/${id}`);
        const data = await response.json();
        if (Array.isArray(data)) {
          setSchemes(data);
        } else {
          setSchemes([]);
          console.error('Unexpected response:', data);
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
      router.push(`/detail-info/${schemeId}`);
    } else {
      toast.warn('Please log in first', { position: "top-center", autoClose: 3000 }); // Show a warning toast
      router.push('/login');
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 py-16 px-6 flex flex-col items-center">
      <h2 className="text-4xl md:text-5xl font-bold text-cyan-800 text-center mb-8">
        {sectionName}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {schemes.map((scheme, index) => (
          <div
            key={scheme._id || index}
            className="bg-white shadow-lg rounded-3xl p-8 transition-transform transform hover:scale-105 hover:shadow-2xl"
          >
            <h3 className="text-2xl font-semibold text-cyan-800 hover:text-cyan-600 mb-4">
              {scheme.name}
            </h3>
            <p className="text-gray-700 mb-4">{scheme.short_description}</p>
            <button
              onClick={() => handleLearnMore(scheme._id)}
              className="bg-cyan-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transform transition duration-300 ease-in-out hover:bg-cyan-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 active:bg-purple-800"
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
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

const DisplaySection = () => {
  const router = useRouter();
  const { id } = router.query;
  const [schemes, setSchemes] = useState([]);

  const idToNameMap = {
    '1': 'Visual Impairment Schemes',
    '2': 'Hearing Impairment Schemes',
    '3': 'Intellectual Disability Schemes',
    '4': 'Physical Disability Schemes',
  };

  const sectionName = idToNameMap[id] || 'Government Schemes';

  useEffect(() => {
    const fetchSchemes = async () => {
      if (!id) return; // Wait for id to be available
      try {
        const response = await fetch(`/api/schemes/${id}`);
        const data = await response.json();
        if (Array.isArray(data)) {
          setSchemes(data);
        } else {
          setSchemes([]);
          console.error('Unexpected response:', data);
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
      router.push(`/detail-info/${schemeId}`);
    } else {
      toast.warn('Please log in first', { position: "top-center", autoClose: 3000 }); // Show a warning toast
      router.push('/login');
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 py-16 px-6 flex flex-col items-center">
      <h2 className="text-4xl md:text-5xl font-bold text-cyan-800 text-center mb-8">
        {sectionName}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {schemes.map((scheme, index) => (
          <div
            key={scheme._id || index}
            className="bg-white shadow-lg rounded-3xl p-8 transition-transform transform hover:scale-105 hover:shadow-2xl"
          >
            <h3 className="text-2xl font-semibold text-cyan-800 hover:text-cyan-600 mb-4">
              {scheme.name}
            </h3>
            <p className="text-gray-700 mb-4">{scheme.short_description}</p>
            <button
              onClick={() => handleLearnMore(scheme._id)}
              className="bg-cyan-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transform transition duration-300 ease-in-out hover:bg-cyan-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 active:bg-purple-800"
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