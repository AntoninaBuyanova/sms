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
    <section id="pricing" className="py-20 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Simple, transparent pricing</h2>
          <p className="text-xl text-slate-600">Choose the plan that fits your writing needs, with no hidden fees.</p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <PricingCard
            title="Free"
            description="Perfect for occasional writers"
            price="$0"
            period="/month"
            features={[
              { text: "Basic style suggestions", included: true },
              { text: "Up to 5 documents", included: true },
              { text: "5 basic templates", included: true },
              { text: "Limited analytics", included: false },
              { text: "No style tuning", included: false }
            ]}
            buttonText="Start with Free"
            buttonStyle="outline"
          />
          
          <PricingCard
            title="Pro"
            description="For professional writers and small teams"
            price="$12"
            period="/month"
            features={[
              { text: <span><span className="font-medium">Advanced</span> style suggestions</span>, included: true },
              { text: <span><span className="font-medium">Unlimited</span> documents</span>, included: true },
              { text: "50+ professional templates", included: true },
              { text: "Full analytics dashboard", included: true },
              { text: "Style tuning for 3 audiences", included: true }
            ]}
            buttonText="Get Pro"
            buttonStyle="primary"
            featured={true}
            badge="POPULAR"
          />
          
          <PricingCard
            title="Team"
            description="For organizations and content teams"
            price="$29"
            period="/month per user"
            features={[
              { text: "Everything in Pro", included: true },
              { text: "Team collaboration tools", included: true },
              { text: "Brand voice settings", included: true },
              { text: "Style tuning for unlimited audiences", included: true },
              { text: "Priority support", included: true }
            ]}
            buttonText="Contact Sales"
            buttonStyle="outline"
          />
        </div>
        
        <div className="mt-16 bg-slate-100 rounded-xl p-8 max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-6 md:mb-0 md:mr-8">
              <h3 className="text-xl font-bold text-slate-900 mb-2">Need a custom plan?</h3>
              <p className="text-slate-600">We offer tailored solutions for larger teams and enterprises with specific requirements.</p>
            </div>
            <a href="#" className="px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors text-center whitespace-nowrap">
              Contact our sales team
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
