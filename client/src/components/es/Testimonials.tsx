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
    <div className="bg-white p-6 md:p-7 lg:p-8 rounded-[32px] border border-[#F0F0F0] flex items-center">
      <div className="min-w-[4.5rem] w-[4.5rem] flex justify-center mr-4 lg:mr-8">
        {icon}
      </div>
      <div>
        <h3 className="text-3xl md:text-3xl lg:text-4xl font-medium text-[#232323] mb-1 lg:mb-2 font-['Aeonik_Pro']">{value}</h3>
        <p className="text-sm md:text-sm lg:text-base font-normal text-[#232323] font-['Aeonik_Pro']">{description}</p>
      </div>
    </div>
  );
};

const Testimonials: React.FC = () => {
  return (
    <section className="pt-0 pb-12 md:pb-20 bg-[#FFFFFF]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-12 text-left">
            {/* Heading */}
            <h2 className="text-[2rem] lg:text-[3.25rem] font-medium leading-[1.2] lg:leading-[3.75rem] mb-6 text-[#232323] max-w-none">
              Creado para velocidad y relevancia
            </h2>
          </div>

          {/* Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <StatCard 
              icon={<img src="timer.png" alt="Temporizador" className="w-[3.5rem] md:w-[4rem] lg:w-[4.875rem]" />}
              value="10h+"
              description="Ahorradas semanalmente al evitar búsquedas manuales"
            />
            <StatCard 
              icon={<img src="books.png" alt="Libros" className="w-[3.5rem] md:w-[4rem] lg:w-[4.875rem]" />}
              value="100M+"
              description="Artículos analizados de JSTOR, Semantic Scholar, ArXiv y más"
            />
            <StatCard 
              icon={<img src="pensilline.png" alt="Lápiz" className="w-[3.5rem] md:w-[4rem] lg:w-[4.875rem]" />}
              value="5x"
              description="Escritura más rápida con fuentes, citas y resúmenes"
            />
            <StatCard 
              icon={<img src="chart.png" alt="Gráfico" className="w-[3.5rem] md:w-[4rem] lg:w-[4.875rem]" />}
              value="99%"
              description="De los resultados son relevantes — sin artículos fuera de tema"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 