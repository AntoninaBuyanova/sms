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
  <div className="flex flex-col items-start text-left">
    <div className="mb-6">
      {icon}
    </div>
    <h3 className="text-base font-medium mb-2">{title}</h3>
    <p className="text-sm text-gray-500">{description}</p>
  </div>
);

const Testimonials: React.FC = () => {
  return (
    <section className="py-20 bg-[#FFFFFF]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-start mb-16">
            {/* Heading */}
            <h2 className="text-[3.25rem] font-medium leading-[3.75rem] mb-8 lg:mb-0">
              Your toolkit for<br />
              a perfect paper
            </h2>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:w-[55%]">
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
          </div>

          {/* Editor Demo */}
          <div className="w-full">
            <img 
              src="Section.png"
              alt="Section analysis interface"
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
