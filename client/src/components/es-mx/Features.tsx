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
    <section className="pt-12 md:pt-[60px] lg:pt-20 xl:pt-[5rem] pb-12 md:pb-16 lg:pb-20 bg-[#FFFFFF]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
        <div className="max-w-[1200px] w-full">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-6 lg:gap-12 items-center">
            {/* Left side content - Image */}
            <div className="relative w-full md:col-span-5 lg:col-span-6 md:max-w-none lg:w-[550px] xl:w-[600px] mt-0 order-2 md:order-1">
              {/* Main image */}
              <img 
                src="/get.png"
                alt="Interfaz de fuentes de citas"
                className="rounded-3xl w-full md:max-w-[95%]"
              />
            </div>

            {/* Right side content - Text */}
            <div className="md:col-span-7 lg:col-span-6 md:pl-4 lg:pl-0 order-1 md:order-2">
              <h2 className="text-[2rem] md:text-[2.2rem] lg:text-[3.25rem] font-aeonik font-medium leading-[1.2] md:leading-[1.3] lg:leading-[3.75rem] mb-6 text-[#232323]">
                Consigue fuentes verificadas<br className="hidden sm:block" /> con citas
              </h2>
              
              {/* Feature list */}
              <ul className="space-y-4 md:space-y-4 mb-6 md:mb-8">
                <li className="flex items-start">
                  <Check className="min-w-[24px] w-6 h-6 text-[#232323] mr-3 mt-0.5" />
                  <span className="text-base md:text-base lg:text-lg text-[#232323]">Te entregamos más de 20 papers de calidad adaptados a tu tema</span>
                </li>
                <li className="flex items-start">
                  <Check className="min-w-[24px] w-6 h-6 text-[#232323] mr-3 mt-0.5" />
                  <span className="text-base md:text-base lg:text-lg text-[#232323]">Cada resultado incluye ideas principales, citas y links</span>
                </li>
                <li className="flex items-start">
                  <Check className="min-w-[24px] w-6 h-6 text-[#232323] mr-3 mt-0.5" />
                  <span className="text-base md:text-base lg:text-lg text-[#232323]">Exporta citas al instante en formatos APA, MLA, Chicago y más</span>
                </li>
              </ul>
              
              <a href="https://mystylus.ai/sms">
                <button className="hidden md:block px-8 lg:px-[3.75rem] py-3 lg:py-[1.125rem] bg-[#232323] text-white rounded-full text-base lg:text-lg font-aeonik font-medium">
                  Empezar Ahora
                </button>
              </a>
            </div>
            
            {/* Mobile Check my paper button */}
            <div className="block md:hidden order-3 md:col-span-12">
              <a href="https://mystylus.ai/sms">
                <button className="w-full px-[3.75rem] py-[1.125rem] bg-[#232323] text-white rounded-full text-lg font-aeonik font-medium">
                  Empezar Ahora
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