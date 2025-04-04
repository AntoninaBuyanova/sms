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
      <h3 className="text-xl font-aeonik font-semibold text-slate-900 mb-3">{title}</h3>
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
    <section className="pt-12 md:pt-[80px] lg:pt-20 xl:pt-[5rem] pb-20 bg-[#FFFFFF]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
        <div className="max-w-[1200px] w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-12 items-center">
            {/* Left side content - Image */}
            <div className="relative w-full lg:w-[550px] xl:w-[600px] mt-0 lg:mt-0 order-2 lg:order-1">
              {/* Main image */}
              <img 
                src="/get.png"
                alt="Citation sources interface"
                className="rounded-3xl w-full"
              />
            </div>

            {/* Right side content - Text */}
            <div className="lg:block order-1 lg:order-2">
              <h2 className="text-[2rem] sm:text-[2rem] md:text-[32px] lg:text-[3.25rem] font-aeonik font-medium leading-[1.2] sm:leading-[1.3] md:leading-[1.2] lg:leading-[3.75rem] mb-6 text-[#232323]">
                Get verified sources<br className="hidden sm:block" /> with citations
              </h2>
              
              {/* Feature list */}
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <Check className="w-6 h-6 text-[#232323] mr-3 mt-0.5" />
                  <span className="text-lg text-[#232323]">We deliver 20+ top papers tailored to your topic</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-6 h-6 text-[#232323] mr-3 mt-0.5" />
                  <span className="text-lg text-[#232323]">Each result comes with key insights, quotes and links</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-6 h-6 text-[#232323] mr-3 mt-0.5" />
                  <span className="text-lg text-[#232323]">Export citations instantly in APA, MLA, Chicago, and more styles</span>
                </li>
              </ul>
              
              <a href="https://mystylus.ai/sms">
                <button className="hidden lg:block px-[3.75rem] py-[1.125rem] bg-[#232323] text-white rounded-full text-lg font-aeonik font-medium">
                  Get Started
                </button>
              </a>
            </div>
            
            {/* Mobile Check my paper button */}
            <div className="block lg:hidden mt-8 order-3">
              <a href="https://mystylus.ai/sms">
                <button className="w-full px-[3.75rem] py-[1.125rem] bg-[#232323] text-white rounded-full text-lg font-aeonik font-medium">
                  Get Started
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
