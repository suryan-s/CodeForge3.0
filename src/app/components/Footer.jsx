'use client';

import React from "react";
import { FaInstagram, FaGithub, FaXTwitter, FaLinkedin, FaPhone, FaEnvelope } from "react-icons/fa6";
import { motion, useReducedMotion } from "framer-motion";

const Footer = () => {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.1 : 0.6,
        staggerChildren: shouldReduceMotion ? 0 : 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.1 : 0.4,
        ease: "easeOut"
      }
    }
  };

  const iconHoverVariants = {
    hover: shouldReduceMotion ? {} : {
      scale: 1.1,
      filter: "drop-shadow(0 0 8px rgba(168, 85, 247, 0.6))",
      transition: { duration: 0.2, ease: "easeOut" }
    },
    tap: shouldReduceMotion ? {} : { scale: 0.95 }
  };

  return (
    <motion.footer
      className="bg-gradient-to-br  via-purple-950/40  text-white border-t border-purple-500/20 backdrop-blur-xl"
      initial="hidden"
      whileInView="visible"
      variants={containerVariants}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="flex flex-col pb-32 md:flex-row py-12 w-full justify-around items-center gap-8 md:gap-0">

        {/* Left: Social Media */}
        <motion.div className="space-y-4" variants={itemVariants}>
          <h3 className="text-xl text-center font-bold bg-gradient-to-r from-purple-400 to-purple-300 bg-clip-text text-transparent">
            Social media
          </h3>
          <div className="flex justify-center md:justify-start gap-5">
            {[FaInstagram, FaGithub, FaXTwitter, FaLinkedin].map((Icon, idx) => (
              <motion.a
                key={idx}
                href="#"
                className="text-purple-300 hover:text-purple-200"
                variants={iconHoverVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Icon size={24} />
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Center: Logo and Credits */}
        <motion.div className="flex flex-col gap-4 items-center " variants={itemVariants}>
          <div className="flex justify-center gap-6">
            <div className="w-12 h-12 bg-white rounded-full" /> {/* placeholder for logo */}
             <div className="w-12 h-12 bg-white rounded-full" /> {/* placeholder for logo */}
          </div>
          <h1 className="text-lg font-semibold bg-gradient-to-r from-purple-400 to-purple-300 bg-clip-text text-transparent">
            IEEE SB UCEK X IEEE RAS SB UCEK
          </h1>
          <p className="text-sm text-purple-300">
            Made by IEEE SB UCEK Tech Team
          </p>
          
        </motion.div>

        {/* Right: Contact Info */}
        <motion.div className="space-y-4 hidden md:block" variants={itemVariants}>
          <h3 className="text-xl text center font-bold bg-gradient-to-r from-purple-400 to-purple-300 bg-clip-text text-transparent">
            Contact Us
          </h3>
          <ul className="space-y-2 text-sm text-purple-200">
            <li className="flex justify-center md:justify-start items-center gap-2">
              <FaEnvelope size={16} />
              <a href="mailto:ieeesbucek@gmail.com" className="hover:text-purple-100 transition">
                ieeesbucek@gmail.com
              </a>
            </li>
            <li className="flex justify-center md:justify-start items-center gap-2">
              <FaPhone size={16} />
              <a href="tel:+917907977205" className="hover:text-purple-100 transition">
                7907977205
              </a>
            </li>
          </ul>
        </motion.div>

      </div>
    </motion.footer>
  );
};

export default Footer;
