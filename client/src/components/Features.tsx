import React from 'react';
import { Check, Lightbulb, ClipboardList, PieChart } from 'lucide-react';

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
    <section id="features" className="py-20 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Write better, faster, smarter</h2>
          <p className="text-xl text-slate-600">myStylus enhances your writing with powerful AI that understands context, style, and audience.</p>
        </div>
        
        <div className="grid gap-8 lg:grid-cols-3">
          <FeatureCard
            icon={<Lightbulb className="w-6 h-6 text-white" />}
            title="Smart Suggestions"
            description="Get real-time recommendations to improve readability, tone, and impact based on your specific writing goal."
            benefits={[
              "Style adaptation for different audiences",
              "Sentence structure optimization",
              "Word choice enhancements"
            ]}
          />
          
          <FeatureCard
            icon={<ClipboardList className="w-6 h-6 text-white" />}
            title="Content Templates"
            description="Access professionally designed templates for emails, blog posts, social media, and more to jumpstart your writing."
            benefits={[
              "50+ customizable templates",
              "Industry-specific frameworks",
              "One-click personalization"
            ]}
          />
          
          <FeatureCard
            icon={<PieChart className="w-6 h-6 text-white" />}
            title="Analytics & Insights"
            description="Understand your writing patterns with detailed analysis of readability, engagement potential, and more."
            benefits={[
              "Readability scoring",
              "Engagement prediction",
              "Writing style evolution"
            ]}
          />
        </div>
        
        <div className="mt-16 lg:mt-24">
          <div className="bg-slate-100 rounded-2xl overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800 mb-5">
                  Featured Capability
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-5">Style Tuning for Your Audience</h3>
                <p className="text-lg text-slate-600 mb-6">Automatically adjust your writing style based on your target audience. myStylus detects formality, complexity, and engagement levels to ensure your content resonates perfectly.</p>
                <ul className="space-y-4 mb-8">
                  {[
                    "Formality adjustment for business vs. casual communication",
                    "Technical complexity tuning based on audience expertise",
                    "Emotional tone calibration for maximum impact"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <div className="flex-shrink-0">
                        <Check className="h-6 w-6 text-purple-600" />
                      </div>
                      <p className="ml-3 text-slate-700">{item}</p>
                    </li>
                  ))}
                </ul>
                <a href="#" className="inline-flex items-center font-medium text-purple-600 hover:text-purple-800">
                  Learn more about style tuning
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
              <div className="bg-gradient-to-br from-purple-500 to-indigo-600 p-8 lg:p-12 flex items-center justify-center">
                <div className="bg-white rounded-xl shadow-lg p-6 max-w-md">
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium text-slate-900">Style Settings</h4>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Active</span>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Audience Type</label>
                        <select className="w-full rounded-lg border-slate-300 shadow-sm focus:border-purple-500 focus:ring-purple-500">
                          <option>Technical experts</option>
                          <option>General audience</option>
                          <option>Business professionals</option>
                          <option>Customers</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Formality Level</label>
                        <div className="flex items-center">
                          <span className="text-xs text-slate-600 mr-2">Casual</span>
                          <input type="range" className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer" min="1" max="5" defaultValue="3" />
                          <span className="text-xs text-slate-600 ml-2">Formal</span>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Tone</label>
                        <div className="grid grid-cols-3 gap-2">
                          <button className="px-3 py-1 border border-purple-600 bg-purple-50 text-purple-700 rounded-lg text-sm">Professional</button>
                          <button className="px-3 py-1 border border-slate-300 text-slate-700 rounded-lg text-sm">Friendly</button>
                          <button className="px-3 py-1 border border-slate-300 text-slate-700 rounded-lg text-sm">Enthusiastic</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <svg className="w-5 h-5 text-purple-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      <p className="text-sm text-slate-700">Your writing will now be optimized for technical experts with a professional tone.</p>
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

export default Features;
