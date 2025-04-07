import React, { useEffect, useRef } from 'react';
import OptimizedImage from '@/components/OptimizedImage';

interface FeatureCardProps {
  title: string;
  description: string;
  image?: string;
  imageWidth?: number;
  imageHeight?: number;
  isLarge?: boolean;
  isWider?: boolean;
  reducedHeight?: boolean;
  extraReducedHeight?: boolean;
  className?: string;
  children?: React.ReactNode;
  priority?: boolean;
  delay?: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  title, 
  description, 
  image, 
  imageWidth, 
  imageHeight, 
  isLarge, 
  isWider, 
  reducedHeight, 
  extraReducedHeight, 
  className, 
  children,
  priority,
  delay = 0
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!priority && delay > 0) {
      // Delay non-critical card rendering 
      const timer = setTimeout(() => {
        if (cardRef.current) {
          cardRef.current.style.opacity = '1';
        }
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [priority, delay]);

  return (
    <div 
      ref={cardRef} 
      className={`bg-[#F8F8F3] rounded-[40px] border border-[#E8E8E5] ${isLarge ? 'col-span-2 pt-8 px-8 pb-0' : isWider ? 'lg:col-span-3 pt-8 px-8 pb-0 flex flex-col' : 'lg:col-span-2 p-8'} ${className || ''}`} 
      style={{ opacity: priority ? '1' : '0.01', transition: 'opacity 0.5s ease-in' }}
    >
      <div>
        <h3 className={`text-2xl font-medium ${extraReducedHeight ? 'mb-3' : reducedHeight ? 'mb-2' : 'mb-3'} text-[#232323]`}>{title}</h3>
        <p className={`font-aeonik text-[#232323] ${isWider && extraReducedHeight ? 'mb-3' : isWider ? 'mb-2' : extraReducedHeight ? 'mb-3' : reducedHeight ? 'mb-4' : 'mb-6'}`}>{description}</p>
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

// Separate the heading as its own component to optimize LCP
const MainHeading: React.FC = () => {
  return (
    <h2 className="text-[2rem] md:text-[2.2rem] lg:text-[3.25rem] font-medium leading-[1.2] lg:leading-[3.75rem] mb-6 text-[#232323] max-w-none text-render-opt loaded">
      Manera más inteligente de buscar, citar y guardar
    </h2>
  );
};

const HowItWorks: React.FC = () => {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // Force the browser to prioritize this h2 by marking it as an important element
    if (headingRef.current) {
      // Set higher rendering priority for main heading
      const updateImportance = () => {
        if (headingRef.current) {
          headingRef.current.style.contentVisibility = 'visible';
          headingRef.current.classList.add('loaded');
        }
      };
      
      // Execute immediately and also after paint
      updateImportance();
      requestAnimationFrame(() => {
        requestAnimationFrame(updateImportance);
      });
    }
  }, []);

  return (
    <section className="pt-0 pb-20 bg-[#FFFFFF]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-12 text-left">
            {/* Important: This is the LCP element we need to optimize */}
            <h2 
              ref={headingRef}
              className="text-[2rem] md:text-[2.2rem] lg:text-[3.25rem] font-medium leading-[1.2] lg:leading-[3.75rem] mb-6 text-[#232323] max-w-none text-render-opt"
              style={{ contentVisibility: 'auto', contain: 'layout' }}
            >
              Manera más inteligente de buscar, citar y guardar
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {/* First card with priority loading */}
            <FeatureCard 
              title="Ve citas e ideas principales al instante" 
              description="Obtén un análisis claro de cada paper — con resúmenes, ideas centrales y citas"
              isWider={true}
              className="md:col-span-1 lg:col-span-3"
              priority={true}
            >
              <OptimizedImage 
                src="/pdf.png" 
                alt="Documento PDF" 
                className="w-full" 
                width={600} 
                height={400}
                priority={true}
              />
            </FeatureCard>
            
            {/* Delay non-critical content */}
            <FeatureCard 
              title="Busca en bases de datos académicas" 
              description="Buscamos en más de 100 millones de fuentes revisadas por pares de las mejores bibliotecas"
              className="md:col-span-1 lg:col-span-2"
              delay={100}
            >
              <div>
                <OptimizedImage 
                  src="/google.png" 
                  alt="Buscadores académicos" 
                  className="w-auto max-w-[85%]" 
                  width={300} 
                  height={200}
                />
              </div>
            </FeatureCard>
            
            <FeatureCard 
              title="Sube tus propios archivos" 
              description="Carga tus PDFs para extraer citas y encontrar referencias de apoyo"
              extraReducedHeight={true}
              className="md:col-span-1 lg:col-span-2"
              delay={200}
            >
              <div>
                <OptimizedImage 
                  src="/referenceu.png" 
                  alt="Cargar referencias" 
                  className="w-full" 
                  width={400} 
                  height={300}
                />
              </div>
            </FeatureCard>
            
            <FeatureCard 
              title="Mantén tus fuentes organizadas" 
              description="Guarda, organiza y descarga tus fuentes cuando quieras"
              isWider={true}
              extraReducedHeight={true}
              className="md:col-span-1 lg:col-span-3"
              delay={300}
            >
              <OptimizedImage 
                src="/sources.png" 
                alt="Fuentes organizadas" 
                className="w-full h-auto" 
                width={600} 
                height={240}
                style={{ maxHeight: "240px", objectFit: "contain" }} 
              />
            </FeatureCard>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks; 