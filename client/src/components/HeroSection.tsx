import React from 'react';
import { Shield } from 'lucide-react';
import { AIIcon } from './icons/Logo';

const HeroSection: React.FC = () => {
  return (
    <section className="pt-6 pb-6 md:pt-20 md:pb-0 overflow-hidden bg-[#FFFFFF] mb-0 lg:-mb-[40px]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mx-auto">
          {/* User count banner */}
          <div className="inline-flex items-center gap-2 mb-6 md:mb-8 border border-[#E8E8E5] rounded-full px-4 py-2">
            <img src="/users.png" alt="User avatars" className="h-6 md:h-8 w-auto" />
            <div className="text-sm md:text-base text-[#232323] font-aeonik">
              <span className="font-normal">Loved by </span>
              <span className="font-medium">500k+ users</span>
            </div>
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
