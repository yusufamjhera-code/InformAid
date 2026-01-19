import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What is informAid?",
    answer: "informAid is a platform that provides detailed information about government schemes available for individuals with four specific disabilities: visual impairment, hearing impairment, intellectual disability, and physical disability. Our goal is to help users find relevant schemes and their benefits easily."
  },
  {
    question: "Who can use informAid?",
    answer: "informAid is designed for individuals who have visual impairments, hearing impairments, intellectual disabilities, or physical disabilities. It is also useful for caregivers, healthcare providers, and anyone interested in learning more about government schemes for these disabilities."
  },
  {
    question: "How do I search for government schemes?",
    answer: "You can search for government schemes by selecting the type of disability you or the person you are looking for support with. You can then browse through the available schemes and find details such as eligibility, benefits, application steps, and required documents."
  },
  {
    question: "Are all the government schemes listed in informAid?",
    answer: "informAid includes a comprehensive list of government schemes, but there may be updates or new schemes introduced over time. We strive to keep the information as accurate and up-to-date as possible."
  },
  {
    question: "How do I apply for a government scheme?",
    answer: "Each scheme listed on informAid includes detailed steps to apply. This typically includes eligibility criteria, required documents, and the official application process. Links to official application portals are also provided where applicable."
  },
];
export default function FAQSection() {
  const [shuffledFaqs, setShuffledFaqs] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    const shuffled = [...faqs].sort(() => 0.5 - Math.random());
    setShuffledFaqs(shuffled);
  }, []);

  const toggleIndex = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="w-full px-4 py-10">
      <h2 className="text-5xl font-bold text-center mb-12 text-cyan-900 drop-shadow-lg">Frequently Asked Questions</h2>
      <div className="flex flex-col gap-6 w-full">
        {shuffledFaqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="bg-gradient-to-r from-purple-100 via-blue-50 to-yellow-50 rounded-3xl shadow-xl overflow-hidden w-full"
          >
            <button
              onClick={() => toggleIndex(index)}
              className="flex justify-between items-center w-full p-6 text-left hover:bg-purple-50 transition-colors"
            >
              <span className="text-xl font-bold text-cyan-800">{faq.question}</span>
              <ChevronDown
                className={`w-7 h-7 text-cyan-600 transition-transform duration-300 ${
                  activeIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>
            <AnimatePresence>
              {activeIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="px-6 pb-6 text-gray-700"
                >
                  <p className="leading-relaxed">{faq.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
