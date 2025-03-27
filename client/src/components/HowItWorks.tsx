import React from 'react';

const StepCard: React.FC<{
  number: number;
  title: string;
  description: string;
  isHighlighted?: boolean;
}> = ({ number, title, description, isHighlighted }) => {
  return (
    <div className={`rounded-2xl p-8 ${isHighlighted ? 'bg-[#E8FF81]' : 'bg-white border border-gray-100'}`}>
      <div className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-white text-black font-medium mb-6">
        {number}
      </div>
      <h3 className="text-2xl font-medium mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
      {isHighlighted && (
        <button className="mt-6 px-6 py-3 bg-black text-white rounded-full font-medium">
          Get started
        </button>
      )}
    </div>
  );
};

const HowItWorks: React.FC = () => {
  return (
    <section className="py-20 bg-[#FFFFFF]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-start mb-16">
          <h2 className="text-5xl font-normal">How it works</h2>
          <p className="text-gray-600 max-w-xs text-right">
            3 easy steps to strengthen and finalize your academic paper
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <StepCard
            number={1}
            title="Upload your paper"
            description="Drop in your essay, report, or thesis. We support all academic formats"
            isHighlighted={true}
          />
          
          <StepCard
            number={2}
            title="Get feedback instantly"
            description="AI analyzes your paper by academic standards and highlights what needs work"
          />
          
          <StepCard
            number={3}
            title="Fix and submit"
            description="Apply improvements with one click and download a clean, ready-to-submit version"
          />
        </div>
      </div>
    </section>
  );
};

export default HowItWorks; 