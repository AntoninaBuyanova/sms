import React from 'react';
import { Star, Lightbulb, FileText, Sparkles } from 'lucide-react';

const TestimonialCard: React.FC<{
  quote: string;
  name: string;
  title: string;
  avatarUrl: string;
}> = ({ quote, name, title, avatarUrl }) => {
  return (
    <div className="bg-slate-800 p-6 rounded-xl">
      <div className="flex items-center mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="text-yellow-400 w-5 h-5 fill-current" />
        ))}
      </div>
      <blockquote className="mb-6">
        <p className="text-slate-300 italic">{quote}</p>
      </blockquote>
      <div className="flex items-center">
        <img className="w-10 h-10 rounded-full mr-4" src={avatarUrl} alt={`${name} avatar`} />
        <div>
          <p className="font-medium text-white">{name}</p>
          <p className="text-sm text-slate-400">{title}</p>
        </div>
      </div>
    </div>
  );
};

const FeatureItem: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
  <div className="flex flex-col items-center text-center">
    <div className="mb-4">
      {icon}
    </div>
    <h3 className="text-lg font-medium mb-2">{title}</h3>
    <p className="text-gray-600 text-sm">{description}</p>
  </div>
);

const Testimonials: React.FC = () => {
  return (
    <section className="py-20 bg-[#FFFFFF]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <h2 className="text-5xl font-normal mb-16">
          Your toolkit for<br />
          a perfect paper
        </h2>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <FeatureItem
            icon={<Lightbulb className="w-8 h-8" />}
            title="Smart section feedback"
            description="Get detailed insights for every part of your paper"
          />
          <FeatureItem
            icon={<FileText className="w-8 h-8" />}
            title="Citation finder"
            description="Enhance your paper with in-line citations"
          />
          <FeatureItem
            icon={<Sparkles className="w-8 h-8" />}
            title="One-click fixes"
            description="Apply clear fixes instantly, right in the editor"
          />
        </div>

        {/* Editor Demo */}
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
          {/* Window Controls */}
          <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
          </div>

          {/* Editor Content */}
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <button className="text-gray-600">← Back</button>
                <span className="text-gray-800">The Impact of Plastic Pollution on Marine Ecosystems.docx</span>
              </div>
              <div className="flex space-x-2">
                <button className="px-4 py-1 rounded-full bg-gray-100">Editor</button>
                <button className="px-4 py-1 rounded-full">Overview</button>
              </div>
            </div>

            {/* Document Content */}
            <div className="grid grid-cols-3 gap-8">
              <div className="col-span-2">
                <div className="bg-white rounded-lg p-6 border border-gray-200">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-gray-700">Section 1</h3>
                    <span className="text-yellow-600 text-sm flex items-center">
                      <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                      Needs attention
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    In today's rapidly evolving business environment, small and medium-sized enterprises (SMEs) are under increasing pressure to adapt to new technologies...
                  </p>
                </div>
              </div>

              {/* Analysis Panel */}
              <div className="space-y-6">
                <h3 className="font-medium text-gray-900">Section 1 Analysis</h3>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-600">Critical thinking</span>
                      <span className="text-sm font-medium">9%</span>
                    </div>
                    <div className="h-1 bg-gray-200 rounded-full">
                      <div className="h-1 bg-pink-500 rounded-full" style={{ width: '9%' }}></div>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">Limited critical analysis</p>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-600">Coherence</span>
                      <span className="text-sm font-medium">100%</span>
                    </div>
                    <div className="h-1 bg-gray-200 rounded-full">
                      <div className="h-1 bg-blue-500 rounded-full" style={{ width: '100%' }}></div>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">Excellent flow and structure</p>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-600">Relevance</span>
                      <span className="text-sm font-medium">55%</span>
                    </div>
                    <div className="h-1 bg-gray-200 rounded-full">
                      <div className="h-1 bg-yellow-500 rounded-full" style={{ width: '55%' }}></div>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">Often off-topic</p>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-600">Argument logic</span>
                      <span className="text-sm font-medium">9%</span>
                    </div>
                    <div className="h-1 bg-gray-200 rounded-full">
                      <div className="h-1 bg-pink-500 rounded-full" style={{ width: '9%' }}></div>
                    </div>
                  </div>
                </div>

                <button className="w-full py-3 bg-black text-white rounded-full text-sm font-medium">
                  Improve section
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
