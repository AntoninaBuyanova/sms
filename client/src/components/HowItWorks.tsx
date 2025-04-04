import React from 'react';

interface FeatureCardProps {
  title: string;
  description: string;
  image?: string;
  isLarge?: boolean;
  isWider?: boolean;
  reducedHeight?: boolean;
  extraReducedHeight?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, image, isLarge, isWider, reducedHeight, extraReducedHeight, className, children }) => {
  return (
    <div className={`bg-[#F9F9F7] rounded-[40px] border border-[#E8E8E5] ${isLarge ? 'col-span-2 pt-8 px-8 pb-0' : isWider ? 'lg:col-span-3 pt-8 px-8 pb-0 flex flex-col' : 'lg:col-span-2 p-8'} ${className || ''}`}>
      <div>
        <h3 className={`text-2xl font-medium ${extraReducedHeight ? 'mb-3' : reducedHeight ? 'mb-2' : 'mb-3'} text-[#232323]`}>{title}</h3>
        <p className={`font-['Aeonik_Pro'] text-[#232323] ${isWider && extraReducedHeight ? 'mb-3' : isWider ? 'mb-2' : extraReducedHeight ? 'mb-3' : reducedHeight ? 'mb-4' : 'mb-6'}`}>{description}</p>
      </div>
      {isWider ? (
        <div className="mt-auto">
          {children}
        </div>
      ) : (
        children
      )}
    </div>
  );
};

const HowItWorks: React.FC = () => {
  return (
    <section className="pt-0 pb-20 bg-[#FFFFFF]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-12 text-left">
            <h2 className="text-[2rem] lg:text-[3.25rem] font-medium leading-[1.2] lg:leading-[3.75rem] mb-6 text-[#232323] max-w-none">Smarter way to search, cite, and store</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {/* See key quotes and insights card */}
            <FeatureCard 
              title="See key quotes and insights instantly" 
              description="Get a clear breakdown of every paper — with summaries, core ideas, and citations"
              isWider={true}
              className="md:col-span-1 lg:col-span-3"
            >
              <img src="/pdf.png" alt="PDF document" className="w-full" />
            </FeatureCard>
            
            {/* Search across academic databases card */}
            <FeatureCard 
              title="Search across top academic databases" 
              description="We search across 100M+ peer-reviewed sources from top research libraries"
              className="md:col-span-1 lg:col-span-2"
            >
              <div>
                <img src="/google.png" alt="Academic search engines" className="w-auto max-w-[85%]" />
              </div>
            </FeatureCard>
            
            {/* Upload your own files card */}
            <FeatureCard 
              title="Upload your own files" 
              description="Bring in your PDFs to extract quotes and find supporting references"
              extraReducedHeight={true}
              className="md:col-span-1 lg:col-span-2"
            >
              <div>
                <img src="/referenceu.png" alt="Upload references" className="w-full" />
              </div>
            </FeatureCard>
            
            {/* Keep your sources organized card */}
            <FeatureCard 
              title="Keep your sources organized" 
              description="Save, organize, and download your sources anytime"
              isWider={true}
              extraReducedHeight={true}
              className="md:col-span-1 lg:col-span-3"
            >
              <img src="/sources.png" alt="Organized sources" className="w-full h-auto" style={{ maxHeight: "240px", objectFit: "contain" }} />
            </FeatureCard>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks; 