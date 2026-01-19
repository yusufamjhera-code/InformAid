import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-blue-50 dark:bg-gray-900 text-black dark:text-gray-200 py-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        <div>
          <h3 className="text-2xl font-bold mb-2">InformAid</h3>
          <p className="text-sm text-black dark:text-gray-300">
            Empowering every individual by bridging accessibility with opportunity.
          </p>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm text-black dark:text-gray-300">
            <li><Link to="/" className="hover:text-purple-500 dark:hover:text-cyan-400 transition">Home</Link></li>
            <li><Link to="/search" className="hover:text-purple-500 dark:hover:text-cyan-400 transition">Schemes</Link></li>
            <li><Link to="/about" className="hover:text-purple-500 dark:hover:text-cyan-400 transition">About</Link></li>
            <li><Link to="/contact" className="hover:text-purple-500 dark:hover:text-cyan-400 transition">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-3">Contact</h4>
          <p className="text-sm text-black dark:text-gray-300">Email: <a href="mailto:informaidservice@gmail.com" className="text-blue-600 dark:text-cyan-400 underline hover:text-blue-800 dark:hover:text-cyan-300">informaidservice@gmail.com</a></p>
          <p className="text-sm text-black dark:text-gray-300">Phone: +91-7725818894</p>
        </div>
      </div>
      <div className="border-t border-blue-800 dark:border-gray-700 mt-8 pt-4 text-center text-sm text-black dark:text-gray-400">
        © {new Date().getFullYear()} InformAid. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

