import React from 'react';
import { Shield } from 'lucide-react';
import { AIIcon } from './icons/Logo';

const HeroSection: React.FC = () => {
  return (
    <section className="pt-6 pb-6 md:pt-20 md:pb-0 overflow-hidden bg-[#FFFFFF] mb-0 lg:-mb-[40px]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mx-auto">
          {/* User count banner */}
          <div className="flex items-center justify-center gap-2 mb-6 md:mb-8">
            <div className="flex -space-x-2">
              <img className="w-6 h-6 md:w-8 md:h-8 rounded-full border-2 border-white" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80" alt="User avatar" />
              <img className="w-6 h-6 md:w-8 md:h-8 rounded-full border-2 border-white" src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80" alt="User avatar" />
              <img className="w-6 h-6 md:w-8 md:h-8 rounded-full border-2 border-white" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80" alt="User avatar" />
            </div>
            <span className="text-sm md:text-base text-gray-600">Loved by 500k+ users</span>
          </div>

          {/* Main heading */}
          <h1 className="text-[2rem] sm:text-[3rem] md:text-[3.5rem] lg:text-[5rem] leading-[1.1] sm:leading-[1.2] md:leading-[1.2] font-orbikular mb-4 md:mb-8 text-[#232323]">
            <em>Grade</em> and <em>Enhance</em><br />
            Paper in Minutes
          </h1>
          <p className="text-base sm:text-lg md:text-xl mb-6 md:mb-12 font-aeonik text-gray-600">
            Instant academic feedback and clear suggestions to boost your writing
          </p>
          <button className="px-6 md:px-[3.75rem] py-3 md:py-[1.125rem] bg-black text-white rounded-full text-base md:text-[20px] font-aeonik font-medium">
            Enhance my paper
          </button>

          {/* Demo image */}
          <div className="hidden sm:block max-w-[1250px] mx-auto">
            <img 
              src="/frame5.png" 
              alt="Paper analysis demo" 
              className="w-full h-auto mx-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
