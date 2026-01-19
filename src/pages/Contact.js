import React from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

const ContactUsPage = () => {
    const handelclick =()=>{
        alert("Thankyou")
    }
  return (
    <section className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 dark:text-gray-100 py-16 flex flex-col items-center">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-cyan-900 dark:text-cyan-200 mb-4">Contact Us</h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
          We're here to assist you with any questions or concerns. Reach out to us, and we'll get back to you as soon as possible.
        </p>
      </div>
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-semibold text-cyan-700 dark:text-cyan-300 text-center mb-8">Send Us a Message</h2>
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="text-lg text-gray-700 dark:text-gray-300 mb-2 block">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Your Name"
                className="w-full p-4 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-600 text-gray-800 dark:text-gray-100 dark:bg-gray-800"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="text-lg text-gray-700 dark:text-gray-300 mb-2 block">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Your Email"
                className="w-full p-4 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-600 text-gray-800 dark:text-gray-100 dark:bg-gray-800"
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="message" className="text-lg text-gray-700 dark:text-gray-300 mb-2 block">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="5"
              placeholder="Your Message"
              className="w-full p-4 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-600 text-gray-800 dark:text-gray-100 dark:bg-gray-800"
              required
            ></textarea>
          </div>
          <div className="text-center">
            <button
              type="submit"
              onClick={handelclick}
              className="py-3 px-6 bg-cyan-600 dark:bg-cyan-500 text-white rounded-lg hover:bg-cyan-700 dark:hover:bg-cyan-600 transition duration-300"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
      <div className="max-w-4xl mx-auto text-center py-16">
        <h2 className="text-3xl font-semibold text-cyan-700 dark:text-cyan-300 mb-6">Our Contact Details</h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
          Have any questions or need immediate assistance? You can contact us via email, phone, or visit our office.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold text-cyan-700 dark:text-cyan-300 mb-2">Email</h3>
            <p className="text-lg text-gray-700 dark:text-gray-300">informaidservice@gmail.com</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-cyan-700 dark:text-cyan-300 mb-2">Phone</h3>
            <p className="text-lg text-gray-700 dark:text-gray-300">+91-7725818894</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-cyan-700 dark:text-cyan-300 mb-2">Office Address</h3>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              InformAid Office, Indore (452001)
            </p>
          </div>
        </div>
      </div>
      <div className="bg-teal-100 dark:bg-gray-900 py-12 text-center">
        <h2 className="text-3xl font-semibold text-cyan-700 dark:text-cyan-300 mb-6">Follow Us</h2>
        <div className="flex justify-center space-x-6">
          <a href="https://facebook.com" className="text-cyan-600 dark:text-cyan-400 text-3xl hover:text-cyan-700 dark:hover:text-cyan-300">
            <FaFacebook />
          </a>
          <a href="https://twitter.com" className="text-cyan-600 dark:text-cyan-400 text-3xl hover:text-cyan-700 dark:hover:text-cyan-300">
            <FaTwitter />
          </a>
          <a href="https://linkedin.com" className="text-cyan-600 dark:text-cyan-400 text-3xl hover:text-cyan-700 dark:hover:text-cyan-300">
            <FaLinkedin />
          </a>
          <a href="https://instagram.com" className="text-cyan-600 dark:text-cyan-400 text-3xl hover:text-cyan-700 dark:hover:text-cyan-300">
            <FaInstagram />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactUsPage;
