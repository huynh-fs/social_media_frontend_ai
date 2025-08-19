import React from 'react';

export interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
}

const sizeMap = {
  sm: 'w-4 h-4',
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
};

export const Spinner: React.FC<SpinnerProps> = ({ size = 'md' }) => {
  return (
    <div
      className={`inline-block ${sizeMap[size]} border-4 border-blue-600 border-t-transparent rounded-full animate-spin`}
      role="status"
      aria-label="loading"
    />
  );
};
