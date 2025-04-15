import React from 'react';

const LoadingSpinner = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4',
  };

  return (
    <div className="flex items-center justify-center space-x-2 animate-pulse">
      <div className={`${sizeClasses[size]} bg-primary-500 rounded-full`}></div>
      <div className={`${sizeClasses[size]} bg-primary-500 rounded-full`}></div>
      <div className={`${sizeClasses[size]} bg-primary-500 rounded-full`}></div>
    </div>
  );
};

export default LoadingSpinner; 