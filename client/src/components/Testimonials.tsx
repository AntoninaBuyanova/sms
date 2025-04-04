import React from 'react';
import { Star, Clock, BookOpen, Zap, TrendingUp } from 'lucide-react';

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

interface StatCardProps {
  icon: React.ReactNode;
  value: string;
  description: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, value, description }) => {
  return (
    <div className="bg-white p-8 rounded-[32px] border border-[#F0F0F0] flex items-center">
      <div className="mr-8">
        {icon}
      </div>
      <div>
        <h3 className="text-4xl font-medium text-[#232323] mb-2 font-['Aeonik_Pro']">{value}</h3>
        <p className="text-base font-normal text-[#232323] font-['Aeonik_Pro']">{description}</p>
      </div>
    </div>
  );
};

const Testimonials: React.FC = () => {
  return (
    <section className="pt-0 pb-20 bg-[#FFFFFF]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-12 text-left">
            {/* Heading */}
            <h2 className="text-[2rem] lg:text-[3.25rem] font-medium leading-[1.2] lg:leading-[3.75rem] mb-6 text-[#232323] max-w-none">
              Built for speed and relevance
            </h2>
          </div>

          {/* Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <StatCard 
              icon={<img src="timer.png" alt="Timer" className="w-[4.875rem] h-[4.875rem]" />}
              value="10h+"
              description="Saved weekly by skipping manual research work"
            />
            <StatCard 
              icon={<img src="books.png" alt="Books" className="w-[4.875rem] h-[4.875rem]" />}
              value="100M+"
              description="Papers scanned from JSTOR, Semantic Scholar, ArXiv & more"
            />
            <StatCard 
              icon={<img src="pensilline.png" alt="Pencil" className="w-[4.875rem] h-[4.875rem]" />}
              value="5x"
              description="Faster writing with sources, quotes, and summaries"
            />
            <StatCard 
              icon={<img src="chart.png" alt="Chart" className="w-[4.875rem] h-[4.875rem]" />}
              value="99%"
              description="Of results are relevant — no off-topic papers"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
