import React from 'react';
import Logo from './icons/Logo';

const Header: React.FC = () => {
  return (
    <header className="w-full bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Logo />
          
          {/* Get Started Button */}
          <a 
            href="#" 
            className="px-6 py-3 rounded-full bg-[#E8FF81] text-black font-medium hover:bg-[#dff566] transition-colors"
          >
            Get Started
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
