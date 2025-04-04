import React from 'react';

interface FeatureCardProps {
  title: string;
  description: string;
  image?: string;
  isLarge?: boolean;
  children?: React.ReactNode;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, image, isLarge, children }) => {
  return (
    <div className={`bg-[#F9F9F7] rounded-[24px] p-8 ${isLarge ? 'col-span-2' : ''}`}>
      <h3 className="text-2xl font-medium mb-3 text-[#232323]">{title}</h3>
      <p className="text-[#232323] mb-6">{description}</p>
      {children}
    </div>
  );
};

const HowItWorks: React.FC = () => {
  return (
    <section className="pt-10 pb-12 lg:pb-20 bg-[#FFFFFF]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-8 lg:mb-[2.5rem]">
          <h2 className="text-[2rem] lg:text-[3.25rem] font-medium leading-[1.2] lg:leading-[3.75rem] text-[#232323] mb-3 lg:mb-0">Smarter way to search, cite, and store</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* See key quotes and insights card */}
          <FeatureCard 
            title="See key quotes and insights instantly" 
            description="Get a clear breakdown of every paper — with summaries, core ideas, and citations"
            isLarge={true}
          >
            <div className="relative h-[200px] md:h-[250px] mt-4">
              <img 
                src="/paper-summary.png" 
                alt="Paper summary example" 
                className="absolute top-0 left-0 rounded-lg object-cover shadow-md"
                style={{ width: '80%', height: '90%', zIndex: 2 }}
              />
              <div 
                className="absolute top-10 left-10 rounded-lg bg-white shadow-md"
                style={{ width: '80%', height: '90%', transform: 'rotate(-8deg)', zIndex: 1 }}
              />
            </div>
          </FeatureCard>
          
          {/* Search across academic databases card */}
          <FeatureCard 
            title="Search across top academic databases" 
            description="We search across 100M+ peer-reviewed sources from top research libraries"
          >
            <div className="flex flex-wrap gap-3 mt-4">
              <div className="flex items-center gap-2 bg-white py-2 px-3 rounded-full">
                <div className="w-5 h-5 rounded-full bg-blue-500"></div>
                <span>Google Scholar</span>
              </div>
              <div className="flex items-center gap-2 bg-white py-2 px-3 rounded-full">
                <div className="w-5 h-5 rounded-full bg-red-500"></div>
                <span>ArXiv</span>
              </div>
              <div className="flex items-center gap-2 bg-white py-2 px-3 rounded-full">
                <div className="w-5 h-5 rounded-full bg-red-800"></div>
                <span>JSTOR</span>
              </div>
              <div className="flex items-center gap-2 bg-white py-2 px-3 rounded-full">
                <div className="w-5 h-5 rounded-full bg-blue-600"></div>
                <span>PubMed</span>
              </div>
              <div className="flex items-center gap-2 bg-white py-2 px-3 rounded-full">
                <div className="w-5 h-5 rounded-full bg-gray-800"></div>
                <span>Semantic Scholar</span>
              </div>
              <div className="flex items-center gap-2 bg-white py-2 px-3 rounded-full">
                <span>...and more!</span>
              </div>
            </div>
          </FeatureCard>
          
          {/* Upload your own files card */}
          <FeatureCard 
            title="Upload your own files" 
            description="Bring in your PDFs to extract quotes and find supporting references"
          >
            <div className="border border-dashed border-gray-300 rounded-xl p-8 mt-4 flex flex-col items-center justify-center">
              <div className="flex mb-4">
                <div className="bg-gray-100 p-2 rounded-full mr-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="#4A5568" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M7 10L12 15L17 10" stroke="#4A5568" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 15V3" stroke="#4A5568" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="bg-orange-100 p-2 rounded-lg">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 3V7C14 7.26522 14.1054 7.51957 14.2929 7.70711C14.4804 7.89464 14.7348 8 15 8H19" stroke="#ED8936" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M17 21H7C6.46957 21 5.96086 20.7893 5.58579 20.4142C5.21071 20.0391 5 19.5304 5 19V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H14L19 8V19C19 19.5304 18.7893 20.0391 18.4142 20.4142C18.0391 20.7893 17.5304 21 17 21Z" stroke="#ED8936" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              <p className="text-center text-gray-500">Drag your file here<br />or click to upload</p>
            </div>
          </FeatureCard>
          
          {/* Keep your sources organized card */}
          <FeatureCard 
            title="Keep your sources organized" 
            description="Save, organize, and download your sources anytime"
          >
            <div className="mt-4 bg-white rounded-lg p-3 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-gray-600">4 selected</span>
                <div className="flex gap-2">
                  <button className="bg-gray-100 px-2 py-1 rounded text-sm">Save All</button>
                  <button className="bg-gray-100 px-2 py-1 rounded text-sm">Find Similar</button>
                  <button className="bg-gray-100 px-2 py-1 rounded text-sm">Sort: Most relevant</button>
                  <button className="bg-gray-100 px-2 py-1 rounded text-sm">Filters</button>
                </div>
              </div>
              
              <div className="border-b pb-2 mb-2">
                <div className="flex gap-2 items-start">
                  <div className="w-4 h-4 mt-1 rounded-sm bg-gray-200 flex-shrink-0"></div>
                  <div>
                    <div className="text-sm font-medium">Academic Paper</div>
                    <div className="text-xs text-gray-600 line-clamp-2">Sample paper title and description would go here</div>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="flex gap-2 items-start">
                  <div className="w-4 h-4 mt-1 rounded-sm bg-gray-200 flex-shrink-0"></div>
                  <div>
                    <div className="text-sm font-medium">Abstract Summary</div>
                    <div className="text-xs text-gray-600 line-clamp-2">The paper provides an overview of the topic with key insights and findings.</div>
                  </div>
                </div>
              </div>
            </div>
          </FeatureCard>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks; 