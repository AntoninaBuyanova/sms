import React from 'react';
import { Shield } from 'lucide-react';
import { AIIcon } from './icons/Logo';

const HeroSection: React.FC = () => {
  return (
    <section className="pt-20 pb-20 overflow-hidden bg-[#FFFFFF]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* User count banner */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="flex -space-x-2">
              <img className="w-8 h-8 rounded-full border-2 border-white" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80" alt="User avatar" />
              <img className="w-8 h-8 rounded-full border-2 border-white" src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80" alt="User avatar" />
              <img className="w-8 h-8 rounded-full border-2 border-white" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80" alt="User avatar" />
            </div>
            <span className="text-gray-600">Loved by 500k+ users</span>
          </div>

          {/* Main heading */}
          <h1 className="text-[2.5rem] sm:text-[3rem] md:text-[3.5rem] lg:text-[5rem] leading-[1.1] sm:leading-[1.2] md:leading-[1.2] font-orbikular mb-8 text-[#232323]">
            <em>Grade</em> and <em>Enhance</em><br />
            Paper in Minutes
          </h1>
          <p className="text-base sm:text-lg md:text-xl mb-12 font-aeonik text-gray-600">
            Instant academic feedback and clear suggestions to boost your writing
          </p>
          <button className="px-[3.75rem] py-[1.125rem] bg-black text-white rounded-full text-[20px] font-aeonik font-medium mb-16">
            Enhance my paper
          </button>

          {/* Demo area */}
          <div className="hidden sm:block max-w-3xl mx-auto relative">
            {/* Introduction Section - Center */}
            <div className="relative z-10 bg-white rounded-t-[1.5rem] pt-6 sm:pt-16 px-4 sm:px-20 pb-6 sm:pb-8 shadow-sm border border-gray-100 max-w-2xl mx-auto">
              <h3 className="text-base sm:text-lg font-aeonik font-medium mb-3 sm:mb-4">Introduction</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Plastic pollution has become a critical environmental issue affecting marine ecosystems globally. This paper explores the extent and impact of plastic waste on marine life, highlighting how both macroplastics and microplastics contribute to the degradation of oceanic environments. Through an analysis of recent studies, we examine the sources of plastic pollution, including land-based activities and maritime industries, and their pathways into the marine ecosystem. The effects on marine organisms are profound, ranging from physical harm due to ingestion and entanglement to chemical toxicity affecting reproductive and growth processes. The disruption of food chains and habitats not only threatens biodiversity but also has significant socio-economic repercussions for communities reliant on marine resources. This study underscores the urgency for comprehensive strategies involving policy changes, waste management improvements, and international cooperation to
              </p>
            </div>

            {/* AI Content - Top Left */}
            <div className="hidden sm:block absolute top-12 -left-40 bg-white rounded-xl p-4 shadow-sm border border-gray-100 w-[252px] transform -rotate-12 text-left">
              <div className="absolute top-4 right-4">
                <AIIcon className="w-[62px] h-[62px]" />
              </div>
              <h3 className="text-sm font-aeonik font-medium text-gray-600">AI Content</h3>
              <div className="text-[2rem] font-bold mt-2 leading-none">70%</div>
              <p className="text-sm text-gray-500 mt-2">High AI probability</p>
            </div>

            {/* Plagiarism - Top Right */}
            <div className="hidden sm:block absolute -top-8 -right-24 bg-white rounded-xl p-4 shadow-sm border border-gray-100 w-64 transform rotate-12">
              <Shield className="w-6 h-6 text-blue-500 mb-2" />
              <h3 className="text-sm font-aeonik font-medium text-gray-600">Plagiarism</h3>
              <div className="text-3xl font-bold mt-1">60%</div>
              <p className="text-sm text-gray-500 mt-1">High risk of plagiarism</p>
            </div>

            {/* Evidence quality - Bottom Left */}
            <div className="hidden sm:block absolute -bottom-8 -left-20 bg-white rounded-xl p-4 shadow-sm border border-gray-100 w-64 transform rotate-12">
              <h3 className="text-sm font-aeonik font-medium text-gray-600">Evidence quality</h3>
              <div className="h-2 bg-yellow-200 rounded-full w-1/3 mt-2"></div>
              <p className="text-sm text-gray-500 mt-2">Weak supporting evidence</p>
            </div>

            {/* Critical thinking - Bottom Right */}
            <div className="hidden sm:block absolute -bottom-12 -right-20 bg-white rounded-xl p-4 shadow-sm border border-gray-100 w-64 transform -rotate-12">
              <h3 className="text-sm font-aeonik font-medium text-gray-600">Critical thinking</h3>
              <div className="text-lg font-bold text-gray-700">9%</div>
              <p className="text-sm text-gray-500">Limited critical analysis</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
