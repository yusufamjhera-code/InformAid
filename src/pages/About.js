import React from "react";
import TeamImg from "../images/team.png"
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

const AboutUsPage = () => {
  return (
    <section className="bg-gradient-to-br from-teal-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 dark:text-gray-100 py-16">
      <div className="text-center">
        <h1 className="text-5xl font-extrabold text-cyan-900 dark:text-cyan-200 mb-4">
          About Us
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
          We are a dedicated team, committed to making a positive impact in the community with innovative solutions.
        </p>
        <div className="flex justify-center items-center gap-8 my-8 text-6xl">
          <span className="text-cyan-600 animate-bounce" style={{ animationDelay: '0ms' }}>👁️</span>
          <span className="text-cyan-500 animate-bounce" style={{ animationDelay: '150ms' }}>🦻</span>
          <span className="text-cyan-400 animate-bounce" style={{ animationDelay: '300ms' }}>🧠</span>
          <span className="text-cyan-300 animate-bounce" style={{ animationDelay: '450ms' }}>♿</span>
        </div>
        <p className="text-xl md:text-2xl text-cyan-800 dark:text-cyan-200 font-semibold mb-8 text-center">
          A Platform for Disabled Individuals to Access Government Schemes and Support Services
        </p>
      </div>

      <div className="max-w-4xl mx-auto text-center py-12">
        <h2 className="text-3xl font-semibold text-cyan-700 dark:text-cyan-300 mb-4">Our Mission</h2>
        <p className="text-lg text-gray-800 dark:text-gray-200 leading-relaxed">
          Our mission is to empower individuals with disabilities by providing them access to essential government schemes, 
          services, and resources that can improve their quality of life. We are committed to transparency, innovation, and accessibility.
        </p>
      </div>

      <div className="bg-teal-100 dark:bg-gray-900 py-16">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-semibold text-cyan-700 dark:text-cyan-300 mb-8">Why Choose Us</h2>
          <div className="space-y-6">
            <p className="text-lg text-gray-700 dark:text-gray-300">
              We provide reliable, up-to-date information on government schemes, 
              ensuring that you get the best services for individuals with disabilities.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Our platform is easy to use, and we offer personalized support to help you navigate through the application process.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              We value transparency and are committed to helping you every step of the way.
            </p>
          </div>
        </div>
      </div>

      <div className="py-12 text-center">
        <h2 className="text-3xl font-semibold text-cyan-700 dark:text-cyan-300 mb-6">Get In Touch</h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
          Have any questions or need assistance? Feel free to contact us at any time.
        </p>
        <a
          href="/contact"
          className="py-3 px-6 bg-cyan-600 dark:bg-cyan-500 text-white rounded-lg hover:bg-cyan-700 dark:hover:bg-cyan-600 transition duration-300"
        >
          Contact Us
        </a>
      </div>
    </section>
  );
};

export default AboutUsPage;

