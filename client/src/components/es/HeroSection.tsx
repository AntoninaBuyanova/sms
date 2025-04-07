import React from 'react';
import { Shield } from 'lucide-react';
import { AIIcon } from '@/components/icons/Logo';

const HeroSection: React.FC = () => {
  return (
    <section className="pt-6 pb-0 md:pt-20 md:pb-0 overflow-hidden bg-[#FFFFFF]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mx-auto">
          {/* User count banner */}
          <div className="inline-flex items-center gap-2 mb-6 md:mb-8 border border-[#E8E8E5] rounded-full px-4 py-2">
            <img src="/user.png" alt="Icono de biblioteca académica" className="h-6 md:h-8 w-auto" />
            <div className="text-sm md:text-base text-[#232323] font-aeonik">
              <span className="font-normal">Solo bibliotecas </span>
              <span className="font-medium">académicas confiables</span>
            </div>
          </div>

          {/* Main heading */}
          <h1 className="text-[2rem] sm:text-[3rem] md:text-[3.5rem] lg:text-[5rem] leading-[1.1] sm:leading-[1.2] md:leading-[1.2] mb-4 md:mb-8 text-[#232323]" style={{ fontFamily: '"Orbikular Variable"', fontStyle: 'normal', fontWeight: 400 }}>
            Fortalece Tu Artículo
            <br />
            con <em style={{ fontStyle: 'italic' }}>Citas Verificadas</em>
          </h1>
          <p className="font-['Aeonik Pro'] text-base sm:text-lg md:text-xl mb-6 md:mb-12 text-gray-600">
            Obtén fuentes y citas de JSTOR, Google Scholar, Semantic Scholar y más —
            <br />
            todo adaptado a tu tema
          </p>
          <div className="flex justify-center mb-0 md:mb-12">
            <a href="https://mystylus.ai/sms">
              <button className="w-[280px] md:w-auto px-6 md:px-[3.75rem] py-3 md:py-[1.125rem] bg-[#232323] text-white rounded-full text-base md:text-[20px] font-aeonik font-medium">
                Buscar ahora – es gratis
              </button>
            </a>
          </div>

          {/* SMS Image */}
          <div className="hidden sm:block">
            <img src="/sms.webp" alt="Muestra de citas" className="mx-auto max-w-full" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 