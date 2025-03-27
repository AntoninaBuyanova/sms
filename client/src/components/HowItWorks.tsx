import React from 'react';

const StepCard: React.FC<{
  number: number;
  title: string;
  description: string;
  isHighlighted?: boolean;
}> = ({ number, title, description, isHighlighted }) => {
  return (
    <div className={`rounded-[1.25rem] p-6 lg:p-8 ${isHighlighted ? 'bg-[#E9FF70]' : 'bg-white border border-[#E8E8E5]'}`}>
      <div className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-white text-black font-medium mb-6 border border-[#E8E8E5]">
        {number}
      </div>
      <h3 className="text-2xl font-aeonik font-medium mb-3 text-[#3C3C3C]">{title}</h3>
      <p className="text-[#3C3C3C]">{description}</p>
      {isHighlighted && (
        <button className="mt-6 px-6 py-3 bg-[#232323] text-[#FFFFFF] text-base rounded-full font-aeonik font-medium">
          Get started
        </button>
      )}
    </div>
  );
};

const HowItWorks: React.FC = () => {
  return (
    <section className="pt-4 pb-12 lg:pt-[7.5rem] lg:pb-20 bg-[#FFFFFF]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-8 lg:mb-[2.5rem]">
          <h2 className="text-[2rem] lg:text-[3.25rem] font-medium leading-[1.2] lg:leading-[3.75rem] text-[#232323] mb-3 lg:mb-0">How it works</h2>
          <p className="text-base lg:text-lg text-[#3C3C3C] lg:max-w-[17rem] lg:text-right">
            <span className="font-medium">3 easy steps</span> to strengthen and finalize your academic paper
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-8">
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