import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles

import HomePage from "./pages/HomePage"; 
import SearchSection from "./pages/SearchSection";  
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import DisplaySection from "./pages/DisplaySection";
import LogIn from "./pages/Login";
import { AuthProvider } from "./context/AuthContext";
import Signup from "./pages/Signup";
import DetailInfo from "./pages/DetailInfo";
import AboutUsPage from "./pages/About";
import ContactUsPage from "./pages/Contact";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchSection />} />
          <Route path="/schemes/:id" element={<DisplaySection />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<SearchSection />} />
          <Route path="/detail-info/:id" element={<DetailInfo />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/contact" element={<ContactUsPage />} />
        </Routes>
        <Footer />
        <ToastContainer /> 
      </Router>
    </AuthProvider>
  );
};

export default App;
