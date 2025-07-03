'use client';

import { useRef, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import gsap from 'gsap';

const scheduleData = [
  {
    title: 'Registration Opens',
    date: 'July 10, 2025',
    description: 'Kick off your CodeForge 3.0 journey! Registration opens for all participants.',
    icon: '📝',
  },
  {
    title: 'Registration Closes',
    date: 'July 20, 2025',
    description: 'Last day to register. Don’t miss your chance to compete!',
    icon: '⏰',
  },
  {
    title: 'Shortlisting',
    date: 'July 22, 2025',
    description: 'Teams are shortlisted based on their profiles and ideas.',
    icon: '🔎',
  },
  {
    title: 'Hackathon Kickoff',
    date: 'July 25, 2025',
    description: 'The hackathon begins! Start building your innovative solutions.',
    icon: '🚀',
  },
  {
    title: 'Hackathon Ends',
    date: 'July 27, 2025',
    description: 'Submit your projects before the deadline.',
    icon: '🏁',
  },
  {
    title: 'Results & Awards',
    date: 'July 30, 2025',
    description: 'Winners are announced and prizes awarded in a live ceremony.',
    icon: '🏆',
  },
];

export default function ScheduleTimeline() {
  const timelineRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  // Removed GSAP glow animation as requested

  return (    <section className="w-full max-w-6xl mx-auto py-16 px-2 md:px-6">
      <motion.h2
        className="text-center text-4xl md:text-5xl font-bold mb-18 bg-gradient-to-r from-purple-400 via-purple-300 to-purple-500 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        Schedule Timeline
      </motion.h2>
      
      <div ref={timelineRef} className="relative">        {/* Mobile: Enhanced Vertical timeline */}
        <div className="block md:hidden">
          <div className="relative py-8 px-4">
            {/* Vertical line for mobile */}
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 via-purple-700 to-purple-900 rounded-full shadow-lg" />
            
            <div className="space-y-16">
              {scheduleData.map((item, idx) => (
                <motion.div
                  key={item.title}
                  className="relative flex items-start"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: idx * 0.15, ease: "easeOut" }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  {/* Timeline dot */}
                  <motion.div
                    className="absolute left-8 -translate-x-1/2 flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-purple-600 via-purple-500 to-purple-400 shadow-xl border-4 border-purple-200/60 text-xl z-20"
                    initial={{ scale: 0, rotate: -90 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.6, delay: idx * 0.15, type: "spring", stiffness: 200 }}
                    viewport={{ once: true }}
                  >
                    {item.icon}
                    <motion.div
                      className="absolute inset-0 rounded-full bg-purple-400/40 blur-lg"
                      initial={{ opacity: 0, scale: 0.6 }}
                      whileInView={{ opacity: 1, scale: 1.3 }}
                      transition={{ duration: 0.8, delay: 0.2 + idx * 0.15 }}
                    />
                  </motion.div>

                  {/* Connector line from dot to card */}
                  <motion.div
                    className="absolute left-16 top-7 w-6 h-0.5 bg-gradient-to-r from-purple-500 to-transparent"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 + idx * 0.15 }}
                    style={{ transformOrigin: "left" }}
                  />

                  {/* Enhanced card for mobile */}
                  <motion.div
                    className="ml-24 w-full max-w-sm bg-gradient-to-br from-purple-900/85 to-purple-800/65 border border-purple-500/50 rounded-2xl shadow-2xl p-6 backdrop-blur-xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1"
                    initial={{ opacity: 0, x: 30, scale: 0.95 }}
                    whileInView={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 + idx * 0.15, ease: "easeOut" }}
                    viewport={{ once: true }}
                  >
                    {/* Card header with enhanced styling */}
                    <div className="flex flex-col gap-3 mb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-purple-400 shadow-lg" />
                        <span className="text-purple-200 text-lg font-bold leading-tight">{item.title}</span>
                      </div>
                      <span className="text-purple-400 text-sm font-mono opacity-90 pl-4 border-l-2 border-purple-500/30">
                        {item.date}
                      </span>
                    </div>
                    
                    <p className="text-purple-100 text-sm leading-relaxed opacity-95 pl-4">
                      {item.description}
                    </p>

                    {/* Subtle gradient overlay */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-400/5 to-transparent pointer-events-none" />
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>{/* Desktop: Horizontal timeline with proper spacing */}
        <div className="hidden md:block">
          <div className="relative py-24">
            {/* Horizontal line */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-1 bg-gradient-to-r from-purple-500 via-purple-700 to-purple-900 rounded-full z-10" />
            
            {/* Timeline items */}
            <div className="flex justify-between items-center relative">
              {scheduleData.map((item, idx) => (
                <div key={item.title} className="flex flex-col items-center relative" style={{ width: `${100 / scheduleData.length}%` }}>
                  {/* Card positioned above or below the line */}
                  <motion.div
                    className={`absolute ${
                      idx % 2 === 0 
                        ? 'bottom-16 mb-4' // Cards above the line (even indexes)
                        : 'top-16 mt-4'    // Cards below the line (odd indexes)
                    } w-56 max-w-xs bg-gradient-to-br from-purple-900/80 to-purple-800/60 border border-purple-500/40 rounded-2xl shadow-2xl p-5 backdrop-blur-xl hover:shadow-purple-500/40 transition-all duration-300 hover:scale-105 z-20`}
                    initial={{ opacity: 0, y: idx % 2 === 0 ? -50 : 50, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.8, delay: idx * 0.2, ease: "easeOut" }}
                    viewport={{ once: true, amount: 0.3 }}
                  >
                    <div className="flex flex-col gap-2 mb-3">
                      <span className="text-purple-200 text-sm font-bold leading-tight">{item.title}</span>
                      <span className="text-purple-400 text-xs font-mono opacity-80">{item.date}</span>
                    </div>
                    <p className="text-purple-100 text-xs leading-relaxed opacity-90">
                      {item.description}
                    </p>
                    
                    {/* Connector line to dot */}
                    <div className={`absolute ${
                      idx % 2 === 0 
                        ? 'top-full left-1/2 -translate-x-1/2 h-4 w-0.5 bg-gradient-to-b from-purple-500 to-transparent'
                        : 'bottom-full left-1/2 -translate-x-1/2 h-4 w-0.5 bg-gradient-to-t from-purple-500 to-transparent'
                    }`} />
                  </motion.div>

                  {/* Timeline dot */}
                  <motion.div
                    className="relative z-30 flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 via-purple-500 to-purple-400 shadow-xl border-4 border-purple-200/50 text-2xl"
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 + idx * 0.2, type: "spring", stiffness: 200 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.1 }}
                  >
                    {item.icon}
                    <motion.div
                      className="absolute inset-0 rounded-full bg-purple-400/30 blur-xl"
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1.4 }}
                      transition={{ duration: 0.8, delay: 0.3 + idx * 0.2 }}
                    />
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
