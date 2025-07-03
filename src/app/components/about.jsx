'use client';

import { motion, useReducedMotion } from 'framer-motion';
import InfiniteScroll from './InfiniteScroll';

const pastEvents = [
  {
    name: "TechFest 2024",
    description: "Annual technical festival featuring coding competitions, workshops, and tech talks.",
    date: "Mar 2024"
  },
  {
    name: "AI Workshop Series",
    description: "Comprehensive workshop series on Machine Learning and Artificial Intelligence.",
    date: "Jan 2024"
  },
  {
    name: "CodeForge 2.0",
    description: "Previous iteration of our flagship hackathon with 200+ participants.",
    date: "Nov 2023"
  },
  {
    name: "Robotics Championship",
    description: "Inter-college robotics competition with autonomous and manual categories.",
    date: "Sep 2023"
  },
  {
    name: "Web Dev Bootcamp",
    description: "Intensive 3-day bootcamp covering modern web development technologies.",
    date: "Jul 2023"
  },
  {
    name: "Cybersecurity Awareness Week",
    description: "Week-long event focusing on cybersecurity best practices and workshops.",
    date: "Jun 2023"
  },
];

const scrollItems = [...pastEvents, ...pastEvents].map((event, i) => ({
  content: (
    <div
      key={i}
      className="flex items-center space-x-4 p-3 bg-purple-900/20 rounded-xl border border-purple-500/20 hover:border-purple-400/40 transition-all"
    >
      <div className="flex-1">
        <h5 className="text-purple-200 font-semibold text-sm mb-1">{event.name}</h5>
        <p className="text-purple-300/80 text-xs leading-relaxed line-clamp-2">{event.description}</p>
        <span className="text-purple-400/60 text-xs font-mono">{event.date}</span>
      </div>
      <div className="w-16 h-12 bg-gradient-to-br from-purple-500/30 to-purple-400/20 rounded-lg border border-purple-400/30 flex items-center justify-center flex-shrink-0">
        <div className="w-8 h-8 bg-purple-400/40 rounded border border-purple-300/50"></div>
      </div>
    </div>
  )
}));

const About = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative min-h-screen bg-gradient-to-b via-purple-950/20 py-20 px-4 md:px-6 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-20 left-10 w-32 h-32 border border-purple-500/20 rounded-full"
          animate={shouldReduceMotion ? {} : { rotate: 360 }}
          transition={{ duration: shouldReduceMotion ? 0 : 20, repeat: shouldReduceMotion ? 0 : Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute bottom-40 right-20 w-16 h-16 border border-purple-400/30 rotate-45"
          animate={shouldReduceMotion ? {} : { rotate: [45, 405] }}
          transition={{ duration: shouldReduceMotion ? 0 : 15, repeat: shouldReduceMotion ? 0 : Infinity, ease: "linear" }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduceMotion ? 0.3 : 1, ease: "easeOut" }}
          viewport={{ once: true, margin: "-5%" }}
        >
          <motion.h2 
            className="text-5xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: shouldReduceMotion ? 0.3 : 1.2, delay: shouldReduceMotion ? 0 : 0.2 }}
            viewport={{ once: true, margin: "-5%" }}
          >
            <span className="bg-gradient-to-r from-purple-400 via-purple-300 to-purple-500 bg-clip-text text-transparent">About</span>{' '}
            <span className="text-white">CodeForge 3.0</span>
          </motion.h2>

          <motion.div 
            className="w-32 h-1 bg-gradient-to-r from-purple-500 to-purple-300 mx-auto rounded-full"
            initial={{ width: shouldReduceMotion ? 128 : 0 }}
            whileInView={{ width: 128 }}
            transition={{ duration: shouldReduceMotion ? 0.3 : 1, delay: shouldReduceMotion ? 0 : 0.5 }}
            viewport={{ once: true, margin: "-5%" }}
          />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: shouldReduceMotion ? 0.3 : 1, delay: shouldReduceMotion ? 0.1 : 0.3 }}
            viewport={{ once: true, margin: "-5%" }}
            className="space-y-8"
          >
            <motion.div
              className="relative p-8 bg-gradient-to-br from-purple-900/30 to-purple-800/20 backdrop-blur-xl rounded-3xl border border-purple-500/30"
              whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-2xl md:text-3xl font-bold text-purple-300 mb-4">
                The Ultimate Coding Challenge
              </h3>
              <p className="text-purple-100 text-lg leading-relaxed">
                CodeForge 3.0 is not just another hackathon – it's a revolutionary coding battlefield where innovation meets creativity. 
                Organized by IEEE Student Branch UCEK, this premier event brings together the brightest minds in technology to forge the future.
              </p>
            </motion.div>

            <motion.div
              className="relative p-8 bg-gradient-to-br from-purple-800/20 to-purple-900/30 backdrop-blur-xl rounded-3xl border border-purple-500/30"
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: shouldReduceMotion ? 0.3 : 0.8, delay: shouldReduceMotion ? 0.2 : 0.5 }}
              viewport={{ once: true, margin: "-5%" }}
              whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
            >
              <h4 className="text-xl font-bold text-purple-300 mb-3">Why CodeForge 3.0?</h4>
              <p className="text-purple-200">
                We believe in pushing boundaries, breaking limits, and creating solutions that matter. This hackathon is your gateway to innovation, networking with industry leaders, and showcasing your skills on a grand stage.
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative h-96 md:h-[500px]"
            initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: shouldReduceMotion ? 0.3 : 1, delay: shouldReduceMotion ? 0.2 : 0.4 }}
            viewport={{ once: true, margin: "-5%" }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-purple-400/10 rounded-3xl backdrop-blur-xl border border-purple-500/30 overflow-hidden p-6">
              <h4 className="text-xl font-bold text-purple-300 mb-4 text-center">IEEE SB UCEK Past Events</h4>
              <div className="relative h-[calc(100%-4rem)] flex justify-center">
                <InfiniteScroll
                  items={scrollItems}
                  width="100%"
                  itemMinHeight={100}
                  negativeMargin="-2em"
                  isTilted={false}
                  autoplay={true}
                  autoplaySpeed={0.3}
                  autoplayDirection="up"
                  pauseOnHover={true}
                
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
