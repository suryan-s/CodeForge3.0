'use client';

import { useEffect, useState } from 'react';
import FloatingDockDemo from '@/ui/floating-demo';

export default function UHackathonLanding() {
  const [timeLeft, setTimeLeft] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
  });

  useEffect(() => {
    // Replace this with actual countdown logic if needed
    const interval = setInterval(() => {
      setTimeLeft({
        days: '00',
        hours: '00',
        minutes: '00',
        seconds: '00',
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <FloatingDockDemo />
      <div className="relative w-full min-h-screen flex flex-col items-center justify-center px-4 md:px-6 text-white pb-20 md:pb-6 pt-20 md:pt-24">
        
        {/* Floating geometric shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Animated circles */}
          <div className="absolute top-20 left-10 w-32 h-32 border border-purple-500/30 rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-20 w-20 h-20 border border-purple-400/40 rounded-full animate-ping"></div>
          <div className="absolute bottom-40 left-20 w-16 h-16 bg-purple-600/20 rounded-full animate-bounce"></div>
          
          {/* Floating hexagons */}
          <div className="absolute top-60 right-10 w-24 h-24 border border-purple-300/30 transform rotate-45 animate-spin" style={{animationDuration: '20s'}}></div>
          <div className="absolute bottom-60 right-40 w-12 h-12 border border-purple-500/40 transform rotate-12 animate-pulse"></div>
        </div>

        {/* Main Content Container */}
        <div className="max-w-7xl w-full flex flex-col lg:flex-row items-center justify-between z-10 gap-6 lg:gap-16">
          
          {/* Left Content - Enhanced */}
          <div className="text-center lg:text-left max-w-2xl relative">
            
            {/* Glitch effect background text */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-purple-400 animate-pulse">
                CODEFORGE 3.0
              </h1>
            </div>
            
            {/* IEEE Badge */}
            <div className="inline-flex items-center gap-2 bg-purple-900/30 backdrop-blur-sm border border-purple-500/30 rounded-full px-4 py-2 mb-6">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
              <p className="uppercase text-xs tracking-widest text-purple-200">IEEE Student Branch UCEK</p>
            </div>
            
            {/* Main Title with enhanced styling */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
              <span className="relative">
                CodeForge 3.0
                <span className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-purple-400 blur opacity-30 animate-pulse"></span>
              </span>
              <br />
              <span className="text-purple-100 text-3xl md:text-4xl lg:text-5xl">Hackathon</span>
            </h1>
            
            {/* Enhanced description */}
            <p className="mt-6 text-lg md:text-xl text-purple-100 leading-relaxed">
              Join us for the ultimate 
              <span className="text-purple-300 font-semibold"> coding competition </span>
              where innovation meets creativity. 
              <br className="hidden md:block" />
              Build, compete, and win amazing prizes!
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <button className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold rounded-lg shadow-lg transition-all transform hover:scale-105 hover:shadow-purple-500/25 hover:shadow-2xl">
                <span className="relative z-10">Register Now</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-purple-500 rounded-lg blur opacity-0 group-hover:opacity-30 transition-opacity"></div>
              </button>
              
              <button className="px-8 py-4 border-2 border-purple-500 text-purple-300 hover:bg-purple-500/10 font-semibold rounded-lg transition-all transform hover:scale-105">
                Learn More
              </button>
            </div>
            
          </div>
          {/* Right: Compact Timer - Mobile Optimized */}
          <div className="relative w-full max-w-sm lg:max-w-md">
            {/* Glowing background effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-purple-400/20 rounded-2xl blur-lg"></div>
            
            <div className="relative bg-black/60 backdrop-blur-xl rounded-2xl p-4 md:p-6 shadow-2xl border border-purple-500/30 hover:border-purple-400/50 transition-all">
              
              {/* Header */}
              <div className="text-center mb-4">
                <h3 className="text-purple-200 text-xs md:text-sm uppercase tracking-wide mb-2">Event Starts In</h3>
                <div className="h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
              </div>
              
              {/* Compact Timer Grid */}
              <div className="flex justify-center gap-2 md:gap-3 mb-4">
                {[
                  { label: 'Days', value: timeLeft.days },
                  { label: 'Hours', value: timeLeft.hours },
                  { label: 'Minutes', value: timeLeft.minutes },
                  { label: 'Seconds', value: timeLeft.seconds }
                ].map((unit, index) => (
                  <div key={unit.label} className="text-center flex-1 max-w-16 md:max-w-20">
                    <div className="bg-gradient-to-br from-purple-900/50 to-purple-800/30 rounded-lg p-2 md:p-3 border border-purple-400/30 hover:border-purple-300/50 transition-all group">
                      <div className="text-lg md:text-2xl lg:text-3xl font-mono font-bold text-purple-100 group-hover:text-white transition-colors leading-none">
                        {unit.value}
                      </div>
                      <div className="text-xs uppercase text-purple-300 mt-1 tracking-wide">
                        {unit.label}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Status indicator */}
              <div className="flex items-center justify-center gap-2 text-purple-300">
                <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse"></div>
                <span className="text-xs font-mono">LIVE</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom decorative elements */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex items-center gap-2 text-purple-400/60">
          <div className="w-8 h-px bg-purple-500/50"></div>
          <div className="w-2 h-2 border border-purple-500/50 rounded-full animate-pulse"></div>
          <div className="w-8 h-px bg-purple-500/50"></div>
        </div>
      </div>
    </>
  );
}
