'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

const faqData = [
  {
    question: "Who can participate in CodeForge 3.0?",
    answer: "CodeForge 3.0 is open to students, professionals, and coding enthusiasts of all skill levels. Whether you're a beginner or an expert, you're welcome to join and showcase your creativity!"
  },
  {
    question: "Do I need a team to participate?",
    answer: "While you can register individually, we encourage team participation (2-4 members). If you don't have a team, don't worry! We'll help you connect with other participants during the networking session."
  },
  {
    question: "What should I bring to the hackathon?",
    answer: "Bring your laptop, chargers, any hardware you might need, and lots of enthusiasm! We'll provide food, drinks, WiFi, and a collaborative workspace. Don't forget your student ID for verification."
  },
  {
    question: "Are there any themes or problem statements?",
    answer: "Yes! We'll announce specific themes and problem statements at the opening ceremony. These will focus on current tech trends like AI/ML, Web3, IoT, Sustainability, and Social Impact."
  },
  {
    question: "What are the prizes and rewards?",
    answer: "Winners will receive cash prizes, certificates, mentorship opportunities, and internship offers from our sponsor companies. All participants get certificates and exclusive CodeForge merchandise!"
  },
  {
    question: "Can I use external APIs and libraries?",
    answer: "Absolutely! You can use any open-source libraries, APIs, frameworks, and tools. However, the core innovation and problem-solving must be your original work created during the hackathon."
  },
  {
    question: "Is there any registration fee?",
    answer: "No, CodeForge 3.0 is completely free to participate! This includes access to all events, meals, networking sessions, workshops, and mentorship throughout the hackathon."
  },
  {
    question: "Will there be mentors available during the event?",
    answer: "Yes! We have industry experts and senior developers available throughout the hackathon to provide guidance, technical support, and feedback on your projects."
  }
];

export default function RulesAndFAQ() {
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const shouldReduceMotion = useReducedMotion();

  const toggleFAQ = (index) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  // Optimized animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: shouldReduceMotion ? 0.1 : 0.4,
        staggerChildren: shouldReduceMotion ? 0 : 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.1 : 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="w-full max-w-4xl mx-auto py-16 px-4 md:px-6">
      {/* Header */}
      <motion.div
        className="text-center mb-12"
        initial="hidden"
        whileInView="visible"
        variants={containerVariants}
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-purple-300 to-purple-500 bg-clip-text text-transparent"
          variants={itemVariants}
          style={{ willChange: 'transform, opacity' }}
        >
          Frequently Asked Questions
        </motion.h2>
        <motion.p
          className="text-purple-200 text-lg max-w-2xl mx-auto opacity-90"
          variants={itemVariants}
          style={{ willChange: 'transform, opacity' }}
        >
          Got questions? We've got answers!
        </motion.p>
      </motion.div>

      {/* FAQ Accordion */}
      <motion.div 
        className="space-y-4"
        initial="hidden"
        whileInView="visible"
        variants={containerVariants}
        viewport={{ once: true, amount: 0.1 }}
      >
        {faqData.map((faq, index) => (
          <motion.div
            key={index}
            className="bg-gradient-to-br from-purple-900/40 to-purple-800/30 border border-purple-500/30 rounded-2xl overflow-hidden backdrop-blur-xl hover:border-purple-400/50 transition-colors duration-200"
            variants={itemVariants}
            style={{ willChange: 'transform, opacity' }}
          >
            <motion.button
              onClick={() => toggleFAQ(index)}
              className="w-full p-6 text-left flex items-center justify-between hover:bg-purple-800/20 transition-colors duration-200 group"
              whileHover={shouldReduceMotion ? {} : { scale: 1.001 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.999 }}
              transition={{ duration: 0.1 }}
            >
              <div className="flex items-start gap-4 flex-1">
                <motion.div
                  className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-purple-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0 mt-1"
                  whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                  transition={{ duration: 0.15 }}
                  style={{ willChange: 'transform' }}
                >
                  Q
                </motion.div>
                <h3 className="text-lg font-semibold text-purple-200 leading-relaxed group-hover:text-purple-100 transition-colors duration-200">
                  {faq.question}
                </h3>
              </div>
              <motion.div
                animate={{ 
                  rotate: expandedFAQ === index ? 180 : 0,
                  transition: { duration: shouldReduceMotion ? 0.1 : 0.2 }
                }}
                className="text-purple-400 flex-shrink-0 ml-4 group-hover:text-purple-300 transition-colors duration-200"
                style={{ willChange: 'transform' }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </motion.div>
            </motion.button>

            <AnimatePresence initial={false}>
              {expandedFAQ === index && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ 
                    height: 'auto', 
                    opacity: 1,
                    transition: {
                      height: { duration: shouldReduceMotion ? 0.1 : 0.2, ease: "easeOut" },
                      opacity: { duration: shouldReduceMotion ? 0.1 : 0.15, delay: shouldReduceMotion ? 0 : 0.05 }
                    }
                  }}
                  exit={{ 
                    height: 0, 
                    opacity: 0,
                    transition: {
                      height: { duration: shouldReduceMotion ? 0.1 : 0.15, ease: "easeIn" },
                      opacity: { duration: shouldReduceMotion ? 0.05 : 0.1 }
                    }
                  }}
                  className="overflow-hidden"
                  style={{ willChange: 'height, opacity' }}
                >
                  <div className="px-6 pb-6">
                    <div className="bg-purple-900/20 rounded-xl p-5 ml-14 border-l-4 border-purple-500/50">
                      <motion.div
                        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 5 }}
                        animate={{ 
                          opacity: 1, 
                          y: 0,
                          transition: { duration: shouldReduceMotion ? 0.1 : 0.2, delay: shouldReduceMotion ? 0 : 0.1 }
                        }}
                        className="flex items-start gap-3"
                        style={{ willChange: 'transform, opacity' }}
                      >
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-purple-400 flex items-center justify-center text-white font-bold text-xs flex-shrink-0 mt-1">
                          A
                        </div>
                        <p className="text-purple-100 leading-relaxed text-sm md:text-base">{faq.answer}</p>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
