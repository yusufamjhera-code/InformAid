import React from "react";
import { useNavigate } from "react-router-dom";
import img from "../images/InformAid_Transparent.png"
import FAQSection from "../components/FAQSection";

const HomePage = () => {
  const navigate = useNavigate();

  const handleViewSchemesClick = () => {
    navigate("/search");
  };

  return (
    <section className="bg-gradient-to-br from-teal-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 dark:text-gray-100 min-h-screen flex flex-col items-center text-center px-4">
      <div className="mt-24 flex flex-col items-center text-center px-4">
        <h2 className="text-lg md:text-5xl font-bold text-cyan-900 dark:text-cyan-200 mb-6 leading-tight">
            Empowering Lives Through Government Support
        </h2>
        <p className="text-lg md:text-2xl text-cyan-800 dark:text-cyan-300 mb-10 max-w-2xl">
            Explore all the schemes and assistance programs available for individuals with visual, hearing, intellectual, and physical disabilities.
        </p>
        <button
          className="bg-cyan-600 dark:bg-cyan-500 text-white px-6 py-3 rounded-2xl text-lg font-medium hover:bg-cyan-700 dark:hover:bg-cyan-600 transition duration-300 shadow-md"
          onClick={handleViewSchemesClick} 
        >
            View Schemes
        </button>
      </div>

      <div className="mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-6xl px-4">
        {[{
          icon: "👁️", title: "Visual Impairment", desc: "Schemes for individuals with partial or complete vision loss."
        },{
          icon: "🦻", title: "Hearing Impairment", desc: "Programs for hearing aids, education and support."
        },{
          icon: "🧠", title: "Intellectual Disability", desc: "Cognitive and developmental aid schemes."
        },{
          icon: "♿", title: "Physical Disability", desc: "Schemes supporting mobility and medical equipment."
        }].map((item, idx) => (
          <div
            key={idx}
            className="bg-white shadow-lg rounded-2xl p-6 text-center hover:scale-105 transition-transform duration-300"
          >
            <div className="text-5xl mb-4">{item.icon}</div>
            <h3 className="text-xl font-semibold text-blue-800 mb-2">{item.title}</h3>
            <p className="text-gray-600">{item.desc}</p>
          </div>
        ))}
      </div>
      <FAQSection/>
    </section>
  );
};

export default HomePage;

