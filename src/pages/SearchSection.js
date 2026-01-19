import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Eye, Ear, Brain, Activity } from "lucide-react";
import img from '../images/InformAid_Transparent.png';
import { motion, useAnimation } from 'framer-motion';
import Trie from '../utils/Trie';

const categoryToId = {
  "Visual Disabled": 1,
  "visual disabled": 1,
  "Hearing Impairment": 2,
  "hearing impairment": 2,
  "Intellectual Disability": 3,
  "intellectual disability": 3,
  "Physical Disability": 4,
  "physical disability": 4,
};

const iconPaths = [
  // Eye
  "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0-10c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2z",
  // Ear
  "M16.5 12c.83 0 1.5-.67 1.5-1.5S17.33 9 16.5 9s-1.5.67-1.5 1.5S15.67 12 16.5 12zm-4.5 8c-4.41 0-8-3.59-8-8 0-4.41 3.59-8 8-8s8 3.59 8 8c0 2.21-.9 4.21-2.36 5.64l-1.42-1.42C17.07 15.07 18 13.62 18 12c0-3.31-2.69-6-6-6s-6 2.69-6 6 2.69 6 6 6c1.62 0 3.07-.93 3.78-2.36l1.42 1.42C16.21 19.1 14.21 20 12 20z",
  // Brain
  "M12 2C6.48 2 2 6.48 2 12c0 4.41 3.59 8 8 8s8-3.59 8-8c0-5.52-4.48-10-10-10zm0 18c-4.41 0-8-3.59-8-8 0-4.41 3.59-8 8-8s8 3.59 8 8c0 4.41-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z",
  // Wheelchair
  "M12 2C6.48 2 2 6.48 2 12c0 4.41 3.59 8 8 8s8-3.59 8-8c0-5.52-4.48-10-10-10zm0 18c-4.41 0-8-3.59-8-8 0-4.41 3.59-8 8-8s8 3.59 8 8c0 4.41-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"
];

const SearchSection = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestionsVisible, setSuggestionsVisible] = useState(false);
  const [schemes, setSchemes] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [loadingCategory, setLoadingCategory] = useState(false);
  const [morphIndex, setMorphIndex] = useState(0);
  const controls = useAnimation();
  const trieRef = useRef(new Trie()); // Use ref to persist Trie across renders

  useEffect(() => {
    // Fetch all schemes from all categories
    const fetchAllSchemes = async () => {
      try {
        let allSchemes = [];
        for (let id = 1; id <= 4; id++) {
          const res = await fetch(`/api/schemes/${id}`);
          const data = await res.json();
          if (Array.isArray(data)) {
            allSchemes = allSchemes.concat(data);
          }
        }
        setSchemes(allSchemes);
        // Build Trie from schemes for fast autocomplete
        trieRef.current.buildFromSchemes(allSchemes);
        console.log('Trie built with', allSchemes.length, 'schemes');
        console.log('Trie stats:', trieRef.current.getStats());
      } catch (err) {
        setSchemes([]);
        console.error('Error fetching schemes:', err);
      }
    };
    fetchAllSchemes();
  }, []);

  useEffect(() => {
    if (!loadingCategory) return;
    const interval = setInterval(() => {
      setMorphIndex((prev) => (prev + 1) % iconPaths.length);
    }, 900);
    return () => clearInterval(interval);
  }, [loadingCategory]);

  useEffect(() => {
    controls.start({ d: iconPaths[morphIndex] });
  }, [morphIndex, controls]);

  const handleSearch = () => {
    const trimmed = searchTerm.trim();
    if (!trimmed) return;
    
    // Use Trie for fast search
    const results = trieRef.current.search(trimmed, 1);
    if (results.length > 0) {
      navigate(`/detail-info/${results[0]._id}`);
    } else {
      // Fallback: try exact match
      const found = schemes.find(s => s.name.toLowerCase() === trimmed.toLowerCase());
      if (found) {
        navigate(`/detail-info/${found._id}`);
      } else {
        alert("No matching scheme found. Please try again.");
      }
    }
  };

  const handleSuggestionClick = (scheme) => {
    setSearchTerm(scheme.name);
    setSuggestionsVisible(false);
    navigate(`/detail-info/${scheme._id}`);
  };

  const handleCategoryClick = (category) => {
    setLoadingCategory(true);
    setTimeout(() => {
      setLoadingCategory(false);
    navigate(`/schemes/${categoryToId[category]}`);
    }, 1000);
  };

  // Update suggestions using Trie when search term changes
  useEffect(() => {
    if (!searchTerm.trim()) {
      setSuggestions([]);
      return;
    }

    // Use Trie for instant prefix matching (O(m) complexity)
    const results = trieRef.current.search(searchTerm.trim(), 10);
    setSuggestions(results);
  }, [searchTerm]);

  return (
    <section className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 dark:text-gray-100 py-16 px-6 flex flex-col items-center">
      {loadingCategory && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
          <div className="flex space-x-6 text-5xl">
            <span className="animate-bounce" style={{ animationDelay: '0ms' }}>👁️</span>
            <span className="animate-bounce" style={{ animationDelay: '150ms' }}>🦻</span>
            <span className="animate-bounce" style={{ animationDelay: '300ms' }}>🧠</span>
            <span className="animate-bounce" style={{ animationDelay: '450ms' }}>♿</span>
          </div>
        </div>
      )}
      <h2 className="text-4xl md:text-5xl font-extrabold text-cyan-900 dark:text-cyan-200 text-center mb-4">
        Discover Government Schemes
      </h2>
      <p className="text-lg md:text-xl text-cyan-800 dark:text-cyan-300 text-center max-w-3xl mb-10">
        Easily search and explore a wide range of government support programs tailored to different types of disabilities—visual, hearing, intellectual, and physical.
      </p>

      <div className="relative w-full max-w-3xl mb-8">
        <div className="flex items-center bg-white dark:bg-gray-800 rounded-full shadow-lg border border-teal-300 dark:border-gray-700 overflow-hidden">
          <input
            type="text"
            placeholder="Search schemes by name..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setSuggestionsVisible(e.target.value.trim().length > 0);
            }}
            onFocus={() => {
              if (searchTerm.trim().length > 0) {
                setSuggestionsVisible(true);
              }
            }}
            onBlur={() => {
              // Delay hiding to allow click on suggestions
              setTimeout(() => setSuggestionsVisible(false), 200);
            }}
            className="w-full px-6 py-4 text-gray-800 dark:text-gray-100 dark:bg-gray-800 focus:outline-none rounded-l-full"
          />
          <button
            onClick={handleSearch}
            className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-4 rounded-r-full transition duration-300 flex items-center gap-2"
          >
            <Search size={20} />
            Search
          </button>
        </div>
        {suggestionsVisible && searchTerm && (
          <ul className="absolute left-0 right-0 bg-white dark:bg-gray-800 border border-teal-200 dark:border-gray-700 rounded-b-lg shadow-md z-10 max-h-72 overflow-y-auto">
            {suggestions.length > 0 ? (
              suggestions.map((scheme) => (
                <li
                  key={scheme._id}
                  onClick={() => handleSuggestionClick(scheme)}
                  className="px-6 py-3 hover:bg-teal-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                >
                  <div className="font-medium text-gray-800 dark:text-gray-200">{scheme.name}</div>
                  {scheme.short_description && (
                    <div className="text-sm text-gray-500 dark:text-gray-400 mt-1 truncate">
                      {scheme.short_description}
                    </div>
                  )}
                </li>
              ))
            ) : (
              <li className="px-6 py-3 text-gray-400 dark:text-gray-500">No schemes found</li>
            )}
          </ul>
        )}
      </div>

      <div className="flex flex-wrap justify-center gap-6">
        <CategoryButton
          icon={<Eye size={18} />}
          label="Visual Disabled"
          onClick={handleCategoryClick}
        />
        <CategoryButton
          icon={<Ear size={18} />}
          label="Hearing Impairment"
          onClick={handleCategoryClick}
        />
        <CategoryButton
          icon={<Brain size={18} />}
          label="Intellectual Disability"
          onClick={handleCategoryClick}
        />
        <CategoryButton
          icon={<Activity size={18} />}
          label="Physical Disability"
          onClick={handleCategoryClick}
        />
      </div>
    </section>
  );
};

const CategoryButton = ({ icon, label, onClick }) => {
  return (
    <button
      onClick={() => onClick(label)}
      className="flex items-center gap-2 bg-white border border-cyan-400 text-cyan-800 px-6 py-3 rounded-full font-medium hover:bg-cyan-600 hover:text-white transition-all duration-300 shadow-md"
    >
      {icon}
      {label}
    </button>
  );
};

export default SearchSection;
