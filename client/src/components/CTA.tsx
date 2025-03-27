import React from 'react';

const CTA: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-purple-600 to-indigo-600">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">Ready to transform your writing?</h2>
          <p className="text-xl text-purple-100 mb-10 max-w-3xl mx-auto">Join thousands of writers who are using myStylus to create more engaging, effective content that resonates with their audience.</p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <a href="#" className="px-8 py-4 bg-white text-purple-700 font-semibold rounded-lg hover:bg-purple-50 transition-colors">
              Start your free trial
            </a>
            <a href="#" className="px-8 py-4 border border-white text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors">
              Request a demo
            </a>
          </div>
          <p className="mt-6 text-purple-200 text-sm">No credit card required. 14-day free trial.</p>
        </div>
      </div>
    </section>
  );
};

export default CTA;
