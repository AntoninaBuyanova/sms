import React from 'react';

const LoadingFallback: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen w-full bg-slate-50">
      <div className="animate-pulse flex flex-col items-center">
        <div className="w-16 h-16 bg-gray-200 rounded-full mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-32"></div>
      </div>
    </div>
  );
};

export default LoadingFallback; 