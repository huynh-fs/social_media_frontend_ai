import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, className, ...rest }) => {
  return (
    <div className={className}>
      {label && (
        <label className="block mb-1 text-sm font-medium text-gray-700">{label}</label>
      )}
      <input
        className={`w-full h-[40px] border-0 rounded-md focus:outline-none border-gray-300 ${
          error ? 'border-red-500 focus:ring-red-500 focus:border-transparent' : 'focus:ring-0 focus:border-transparent'
        } ${className}`}  // 👉 merge className truyền vào
        {...rest}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};
