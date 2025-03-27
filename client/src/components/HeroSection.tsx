import React from 'react';
import { Star } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-24 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center">
          <div className="lg:w-1/2 lg:pr-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight mb-6">
              Write with style and <span className="text-purple-600">confidence</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-2xl">
              myStylus helps you craft perfect content by analyzing your text and providing real-time suggestions to enhance your writing style, clarity, and impact.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
              <a href="#" className="px-8 py-4 rounded-lg bg-purple-600 text-white text-lg font-semibold hover:bg-purple-700 transition-colors text-center">
                Start writing for free
              </a>
              <a href="#" className="px-8 py-4 rounded-lg border border-slate-300 text-slate-700 text-lg font-semibold hover:border-purple-600 hover:text-purple-600 transition-colors text-center">
                View demo
              </a>
            </div>
            <div className="flex items-center space-x-6">
              <div className="flex -space-x-2">
                <img className="w-10 h-10 rounded-full border-2 border-white" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80" alt="User avatar" />
                <img className="w-10 h-10 rounded-full border-2 border-white" src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80" alt="User avatar" />
                <img className="w-10 h-10 rounded-full border-2 border-white" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80" alt="User avatar" />
              </div>
              <div>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-slate-600">Trusted by over <span className="font-semibold">10,000+</span> writers</p>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 mt-12 lg:mt-0">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-indigo-500/30 rounded-3xl transform rotate-3"></div>
              <div className="relative bg-white p-6 rounded-2xl shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),_0_10px_10px_-5px_rgba(0,0,0,0.04)]">
                <div className="rounded-xl overflow-hidden border border-slate-200">
                  <div className="bg-slate-100 px-4 py-3 flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <div className="ml-2 text-sm text-slate-600">myStylus Editor</div>
                  </div>
                  <div className="p-5 bg-white">
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold text-slate-800 mb-2">Marketing Email Draft</h3>
                      <div className="relative">
                        <p className="text-slate-700 leading-relaxed">
                          We are excited to <span className="bg-yellow-100 px-1">announce</span> our new product line that will be <span className="bg-red-100 px-1">launching</span> next month. Our team has worked hard to create innovative solutions for your everyday needs.
                        </p>
                        <div className="absolute -right-2 -top-2 bg-purple-600 text-white text-xs px-2 py-1 rounded">Style Suggestion</div>
                      </div>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-lg mb-4">
                      <div className="flex items-start">
                        <div className="flex-shrink-0">
                          <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm text-purple-800">Consider using more engaging language. Try "We're thrilled to unveil" instead of "We are excited to announce"</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <div className="flex space-x-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Readability: 85%
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          Engagement: 72%
                        </span>
                      </div>
                      <button className="text-sm text-purple-600 font-medium hover:text-purple-800 transition-colors">Apply All Suggestions</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
