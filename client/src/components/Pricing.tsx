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
    <section className="py-20 bg-[#FFFFFF]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Before/After comparison */}
          <div className="space-y-6">
            {/* Before */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-gray-500 mb-4">Before</h3>
              <p className="text-gray-600 leading-relaxed">
                Social media has a strong impact on teenagers. It affects their mental health, self-esteem, and behavior. Many teens spend hours online every day, which can lead to anxiety and poor sleep. Overall, social media shapes how young people see themselves and the world around them.
              </p>
            </div>

            {/* After */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-gray-500 mb-4">After</h3>
              <p className="text-gray-600 leading-relaxed">
                Social media has a strong impact on teenagers. It affects their mental health, self-esteem, and behavior. According to a recent study, excessive daily use is linked to increased anxiety and disrupted sleep patterns <span className="text-blue-500">(Smith & Johnson, 2021)</span>. Overall, social media shapes how young people see themselves and the world around them.
              </p>
            </div>
          </div>

          {/* Right side - Feature description */}
          <div>
            <h2 className="text-5xl font-normal mb-8">
              Enhance your paper<br />with in-line citations
            </h2>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-2">
                <Check className="w-6 h-6" />
                <span className="text-xl">Spot uncited claims instantly</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-6 h-6" />
                <span className="text-xl">Insert reliable in-line sources in one click</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-6 h-6" />
                <span className="text-xl">Make your arguments more credible</span>
              </div>
            </div>

            <button className="px-8 py-4 bg-black text-white rounded-full text-lg font-medium">
              Add citations
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
