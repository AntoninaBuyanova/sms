import React from 'react';
// Remove icon imports as they're no longer needed
// import { DetailedFeedbackIcon, AIDetectionIcon, PlagiarismFixIcon, InTextCitationsIcon, OneClickFixesIcon } from './icons/Logo';

const LogoCloud: React.FC = () => {
  return (
    <section className="hidden md:block py-6 md:py-10 bg-[#FFFFFF]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center">
          <img src="/Uni (1).png" alt="Logos de universidades" className="max-w-full" />
        </div>
      </div>
    </section>
  );
};

export default LogoCloud; 