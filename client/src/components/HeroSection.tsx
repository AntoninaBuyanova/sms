import React from 'react';
import { Shield } from 'lucide-react';
import { AIIcon } from './icons/Logo';

const HeroSection: React.FC = () => {
  return (
    <section className="pt-6 pb-6 md:pt-20 md:pb-20 overflow-hidden bg-[#FFFFFF]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
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
          <button className="px-6 md:px-[3.75rem] py-3 md:py-[1.125rem] bg-black text-white rounded-full text-base md:text-[20px] font-aeonik font-medium mb-0 md:mb-16">
            Enhance my paper
          </button>

          {/* Demo image with floating cards */}
          <div className="hidden sm:block max-w-3xl mx-auto relative">
            {/* Main image */}
            <img 
              src="/Frame2.png" 
              alt="Paper analysis demo" 
              className="w-[517px] h-auto mx-auto relative z-20"
            />

            {/* AI Content - Top Left */}
            <div className="absolute top-12 -left-20 bg-white rounded-xl p-4 shadow-sm border border-gray-100 w-[200px] transform -rotate-12 z-30">
              <div className="flex justify-between items-start">
                <h3 className="text-sm font-aeonik font-medium text-gray-600">AI Content</h3>
                <div className="bg-pink-50 rounded-lg p-2">
                  <AIIcon className="w-[24px] h-[24px]" />
                </div>
              </div>
              <div className="text-[2rem] font-bold mt-2 leading-none">70%</div>
              <p className="text-sm text-gray-500 mt-2">High AI probability</p>
            </div>

            {/* Plagiarism - Top Right */}
            <div className="absolute -top-8 -right-24 bg-white rounded-xl p-4 shadow-sm border border-gray-100 w-[200px] transform rotate-12 z-30">
              <div className="flex justify-between items-start">
                <h3 className="text-sm font-aeonik font-medium text-gray-600">Plagiarism</h3>
                <div className="bg-blue-50 rounded-lg p-2">
                  <Shield className="w-5 h-5 text-blue-500" />
                </div>
              </div>
              <div className="text-[2rem] font-bold mt-2 leading-none">60%</div>
              <p className="text-sm text-gray-500 mt-2">High risk of plagiarism</p>
            </div>

            {/* Evidence quality - Bottom Left */}
            <div className="absolute bottom-32 left-12 bg-white rounded-[17.214px] border-[0.861px] border-[#E8E8E5] flex w-[216.902px] transform rotate-[-4.906deg] p-6 z-10 shadow-[0px_17.214px_51.643px_0px_rgba(203,203,203,0.30)]">
              <div className="w-full">
                <h3 className="text-sm font-aeonik font-medium text-gray-600 text-left">Evidence quality</h3>
                <div className="h-2 bg-yellow-200 rounded-full w-1/3 mt-2"></div>
                <p className="text-sm text-gray-500 mt-2 text-left">Weak supporting evidence</p>
              </div>
            </div>

            {/* Critical thinking - Bottom Right */}
            <div className="absolute -bottom-12 -right-20 bg-white rounded-xl p-4 shadow-sm border border-gray-100 w-[200px] transform -rotate-12 z-30">
              <h3 className="text-sm font-aeonik font-medium text-gray-600">Critical thinking</h3>
              <div className="flex items-center gap-2 mt-2">
                <div className="h-1 bg-pink-500 rounded-full w-8"></div>
                <span className="text-lg font-bold text-gray-700">9%</span>
              </div>
              <p className="text-sm text-gray-500 mt-2">Limited critical analysis</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
