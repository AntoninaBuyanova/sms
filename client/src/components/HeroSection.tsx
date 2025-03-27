import React from 'react';
import { Shield } from 'lucide-react';

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
          <h1 className="text-5xl md:text-6xl font-serif mb-6">
            Grade and <em className="not-italic">Enhance</em><br />
            Paper in Minutes
          </h1>
          <p className="text-gray-600 text-xl mb-8">
            Instant academic feedback and clear suggestions to boost your writing
          </p>
          <button className="px-8 py-4 bg-black text-white rounded-full text-lg font-medium mb-16">
            Enhance my paper
          </button>

          {/* Demo area */}
          <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">
            <div className="grid grid-cols-3 gap-8 mb-8">
              {/* AI Content Score */}
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 relative">
                <div className="absolute -rotate-12 top-4 right-4">
                  <div className="w-6 h-6 rounded-full border-4 border-pink-200 border-t-pink-500 animate-spin"></div>
                </div>
                <h3 className="text-sm font-medium text-gray-600">AI Content</h3>
                <div className="text-3xl font-bold mt-1">70%</div>
                <p className="text-sm text-gray-500 mt-1">High AI probability</p>
              </div>

              {/* Introduction Section */}
              <div className="col-span-1 bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <h3 className="text-lg font-medium mb-2">Introduction</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Plastic pollution has become a critical environmental issue affecting marine ecosystems globally...
                </p>
              </div>

              {/* Plagiarism Score */}
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <Shield className="w-6 h-6 text-blue-500 mb-2" />
                <h3 className="text-sm font-medium text-gray-600">Plagiarism</h3>
                <div className="text-3xl font-bold mt-1">60%</div>
                <p className="text-sm text-gray-500 mt-1">High risk of plagiarism</p>
              </div>
            </div>

            {/* Bottom metrics */}
            <div className="grid grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <h3 className="text-sm font-medium text-gray-600">Evidence quality</h3>
                <div className="h-2 bg-yellow-200 rounded-full w-1/3 mt-2"></div>
                <p className="text-sm text-gray-500 mt-2">Weak supporting evidence</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <h3 className="text-sm font-medium text-gray-600">Critical thinking</h3>
                <div className="text-lg font-bold text-gray-700">9%</div>
                <p className="text-sm text-gray-500">Limited critical analysis</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
