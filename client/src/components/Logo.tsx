import React from 'react';

interface LogoProps {
  textColor?: string;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ textColor = "text-slate-800", className = "" }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <svg className="h-8 w-auto text-purple-600" viewBox="0 0 40 40" fill="currentColor">
        <path d="M34 20C34 27.732 27.732 34 20 34C12.268 34 6 27.732 6 20C6 12.268 12.268 6 20 6C27.732 6 34 12.268 34 20Z" fill="#7C3AED" />
        <path d="M24 15C24 16.657 22.657 18 21 18C19.343 18 18 16.657 18 15C18 13.343 19.343 12 21 12C22.657 12 24 13.343 24 15Z" fill="white" />
        <path d="M22 21C22 21.552 21.552 22 21 22C20.448 22 20 21.552 20 21C20 20.448 20.448 20 21 20C21.552 20 22 20.448 22 21Z" fill="white" />
        <path d="M26 25C26 26.657 24.657 28 23 28C21.343 28 20 26.657 20 25C20 23.343 21.343 22 23 22C24.657 22 26 23.343 26 25Z" fill="white" />
      </svg>
      <span className={`ml-2 text-xl font-bold ${textColor}`}>myStylus</span>
    </div>
  );
};

export default Logo;
