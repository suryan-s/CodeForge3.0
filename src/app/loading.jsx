import React from 'react';

const Loading = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 backdrop-blur-sm">
      <div className="flex flex-col items-center space-y-6">
        {/* Animated spinner */}
        <div className="relative">
          <div className="w-16 h-16 border-4 border-blue-200 rounded-full animate-spin">
            <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-blue-500 rounded-full animate-spin"></div>
          </div>
          <div className="absolute inset-2 w-12 h-12 border-4 border-blue-100 rounded-full animate-ping"></div>
        </div>
        
        {/* Loading text with animated dots */}
        <div className="flex items-center space-x-2">
          <span className="text-lg font-medium text-blue-700">Loading</span>
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="w-64 h-2 bg-blue-200 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;


