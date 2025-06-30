'use client';

import { useState, useEffect } from 'react';
import LoadingUI from './loadingui';

const LoadingWrapper = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial app loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000); // 5 seconds

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingUI duration={5000} onComplete={() => setIsLoading(false)} />;
  }

  return <>{children}</>;
};

export default LoadingWrapper;
