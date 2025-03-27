import React from 'react';
import { Check } from 'lucide-react';

interface PricingFeature {
  text: string;
  included: boolean;
}

interface PricingCardProps {
  title: string;
  description: string;
  price: string;
  period: string;
  features: PricingFeature[];
  buttonText: string;
  buttonStyle: 'primary' | 'outline';
  featured?: boolean;
  badge?: string;
}

const PricingCard: React.FC<PricingCardProps> = ({
  title,
  description,
  price,
  period,
  features,
  buttonText,
  buttonStyle,
  featured = false,
  badge
}) => {
  return (
    <div className={`bg-white rounded-xl border ${featured ? 'border-2 border-purple-600 shadow-lg relative scale-[1.05] z-10' : 'border-slate-200 shadow-sm'} transition-all hover:translate-y-[-5px] hover:shadow-[0_25px_50px_-12px_rgba(124,58,237,0.1)]`}>
      {badge && (
        <div className="absolute top-0 right-0 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
          {badge}
        </div>
      )}
      <div className={`${featured ? 'p-8' : 'p-6'} border-b border-slate-200`}>
        <h3 className={`${featured ? 'text-2xl' : 'text-xl'} font-bold text-slate-900 mb-2`}>{title}</h3>
        <p className="text-slate-600 mb-4">{description}</p>
        <div className="flex items-baseline">
          <span className={`${featured ? 'text-5xl' : 'text-4xl'} font-bold text-slate-900`}>{price}</span>
          <span className="text-slate-600 ml-2">{period}</span>
        </div>
      </div>
      <div className={`${featured ? 'p-8' : 'p-6'}`}>
        <ul className={`space-y-4 ${featured ? 'mb-8' : 'mb-6'}`}>
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <svg 
                className={`w-5 h-5 ${feature.included ? 'text-green-500' : 'text-slate-400'} mr-2 mt-0.5`} 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className={feature.included ? 'text-slate-700' : 'text-slate-500'}>
                {feature.text}
              </span>
            </li>
          ))}
        </ul>
        <a 
          href="#" 
          className={`block w-full py-3 px-4 text-center rounded-lg ${
            buttonStyle === 'primary' 
              ? 'bg-purple-600 text-white font-medium hover:bg-purple-700' 
              : 'border border-slate-300 text-slate-700 font-medium hover:border-purple-600 hover:text-purple-600'
          } transition-colors`}
        >
          {buttonText}
        </a>
      </div>
    </div>
  );
};

const Pricing: React.FC = () => {
  return (
    <section className="pt-0 pb-8 lg:py-20 bg-[#FFFFFF]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24 items-start max-w-[1200px] mx-auto">
          {/* Left side - Before/After comparison */}
          <div className="relative">
            {/* Before */}
            <div className="bg-white rounded-[20px] p-6 lg:p-8 shadow-sm border border-gray-100 relative z-10 mb-[-48px] lg:mb-0">
              <h3 className="text-[#9CA3AF] text-base lg:text-xl font-normal mb-3 lg:mb-4">Before</h3>
              <p className="text-[#9CA3AF] leading-relaxed text-base font-normal">
                Social media has a strong impact on teenagers. It affects their mental health, self-esteem, and behavior. Many teens spend hours online every day, which can lead to anxiety and poor sleep. Overall, social media shapes how young people see themselves and the world around them.
              </p>
            </div>

            {/* After */}
            <div className="bg-white rounded-[20px] p-6 lg:p-8 shadow-sm border border-gray-100 relative lg:absolute lg:top-[160px] lg:left-[40px] lg:right-[-40px] z-20">
              <h3 className="text-[#3C3C3C] text-base lg:text-xl font-normal mb-3 lg:mb-4">After</h3>
              <p className="text-[#3C3C3C] leading-relaxed text-base font-normal">
                Social media has a strong impact on teenagers. It affects their mental health, self-esteem, and behavior. <span className="bg-[#60A5FA]/20 rounded-[4px]">According to a recent study, excessive daily use is linked to increased anxiety and disrupted sleep patterns</span> <span className="text-[#60A5FA]">(Smith & Johnson, 2021)</span>. Overall, social media shapes how young people see themselves and the world around them.
              </p>
            </div>
          </div>

          {/* Right side - Feature description */}
          <div className="lg:pl-16 mt-6 lg:mt-0">
            <h2 className="text-[2rem] lg:text-[3.25rem] font-medium leading-[1.2] lg:leading-[3.75rem] mb-6 lg:mb-8 text-[#232323]">
              Enhance your paper with in-line citations
            </h2>
            
            <div className="space-y-2 lg:space-y-[8px] mb-8">
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 lg:w-6 lg:h-6 text-[#232323]" />
                <span className="text-base lg:text-xl text-[#232323] font-medium">Spot uncited claims instantly</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 lg:w-6 lg:h-6 text-[#232323]" />
                <span className="text-base lg:text-xl text-[#232323] font-medium">Insert reliable in-line sources in one click</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 lg:w-6 lg:h-6 text-[#232323]" />
                <span className="text-base lg:text-xl text-[#232323] font-medium">Make your arguments more credible</span>
              </div>
            </div>

            <button className="w-full lg:w-auto py-4 lg:py-[1.125rem] px-6 lg:px-[3.75rem] bg-[#232323] text-white rounded-full text-lg lg:text-[1.25rem] font-medium">
              Add citations
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
