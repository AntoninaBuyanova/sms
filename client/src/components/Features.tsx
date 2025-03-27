import React from 'react';
import { Check, Lightbulb, ClipboardList, PieChart, AlertCircle } from 'lucide-react';

const FeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  benefits: string[];
}> = ({ icon, title, description, benefits }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 transition-all hover:translate-y-[-5px] hover:shadow-[0_25px_30px_-12px_rgba(0,0,0,0.1)]">
      <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center mb-5">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-slate-900 mb-3">{title}</h3>
      <p className="text-slate-600 mb-4">{description}</p>
      <ul className="space-y-2">
        {benefits.map((benefit, index) => (
          <li key={index} className="flex items-start">
            <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-slate-700">{benefit}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Features: React.FC = () => {
  return (
    <section className="py-20 bg-[#FFFFFF]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side content */}
          <div>
            <h2 className="text-5xl font-normal mb-6">
              See your paper the<br />way a professor would
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Get detailed academic feedback and improve it with expert-level insights
            </p>
            <button className="px-8 py-4 bg-black text-white rounded-full text-lg">
              Check my paper
            </button>
          </div>

          {/* Right side content */}
          <div className="relative">
            {/* Plagiarism warning card */}
            <div className="absolute -top-10 right-0 bg-white rounded-2xl shadow-lg p-6 max-w-sm z-10">
              <div className="flex items-center gap-2 mb-4">
                <AlertCircle className="w-5 h-5 text-yellow-500" />
                <span className="font-medium">High risk of plagiarism</span>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">Potential Sources</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                      <span className="text-sm">Academic Journal of Research Vol. 12</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                      <span className="text-sm">Smith, J. (2023). Advanced Research</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                      <span className="text-sm">Johnson, A. (2023). Innovative Studies in T...</span>
                    </li>
                  </ul>
                </div>
                <button className="w-full py-2 px-4 bg-gray-100 rounded-lg text-sm font-medium">
                  Increase originality
                </button>
              </div>
            </div>

            {/* Main image */}
            <img 
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              alt="Student working on laptop"
              className="rounded-3xl w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
