import React from 'react';
import { FileText, BarChart2, Glasses, Shield, ThumbsUp } from 'lucide-react';

const LogoCloud: React.FC = () => {
  return (
    <section className="py-16 bg-[#FFFFFF]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {/* Detailed Feedback */}
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <FileText className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-medium mb-2">Detailed Feedback</h3>
            <p className="text-gray-600 text-sm">
              Get suggestions on structure, clarity, tone, and more
            </p>
          </div>

          {/* Grade Prediction */}
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <BarChart2 className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-medium mb-2">Grade Prediction</h3>
            <p className="text-gray-600 text-sm">
              Know your estimated score before you hit submit
            </p>
          </div>

          {/* AI Detection */}
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <Glasses className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-medium mb-2">AI Detection</h3>
            <p className="text-gray-600 text-sm">
              Make sure your work sounds like you — not ChatGPT
            </p>
          </div>

          {/* Plagiarism Fix */}
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <Shield className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-medium mb-2">Plagiarism Fix</h3>
            <p className="text-gray-600 text-sm">
              Spot copied content and rewrite it instantly
            </p>
          </div>

          {/* One-Click Fixes */}
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <ThumbsUp className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-medium mb-2">One-Click Fixes</h3>
            <p className="text-gray-600 text-sm">
              Apply smart suggestions instantly and improve your paper
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogoCloud;
