import React, { useEffect, lazy, Suspense } from 'react';
import Header from '@/components/pt-br/Header';

// Import only the most critical components eagerly
import HeroSection from '@/components/pt-br/HeroSection';

// Lazy load below-the-fold components
const LogoCloud = lazy(() => import('@/components/pt-br/LogoCloud'));
const Features = lazy(() => import('@/components/pt-br/Features'));
const Testimonials = lazy(() => import('@/components/pt-br/Testimonials'));
const HowItWorks = lazy(() => import('@/components/pt-br/HowItWorks'));
const CTA = lazy(() => import('@/components/pt-br/CTA'));
const Footer = lazy(() => import('@/components/pt-br/Footer'));

// Simple fallback for lazy components
const SectionFallback = () => <div className="w-full h-32 bg-slate-50"></div>;

const BrazilianPortuguesePage: React.FC = () => {
  useEffect(() => {
    // Smooth scrolling for anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLAnchorElement;
      if (target.hash && target.href.includes(window.location.pathname)) {
        e.preventDefault();
        const targetId = target.getAttribute('href') as string;
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.getBoundingClientRect().top + window.scrollY - 80, // Adjust for header height
            behavior: 'smooth'
          });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    
    // Preload below-the-fold components when browser is idle
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(() => {
        import('@/components/pt-br/Features');
        import('@/components/pt-br/HowItWorks');
      });
    }
    
    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  return (
    <div className="bg-slate-50 text-slate-800 font-sans antialiased">
      <Header />
      <HeroSection />
      
      {/* Lazy loaded content with visibility detection */}
      <Suspense fallback={<SectionFallback />}>
        <LogoCloud />
      </Suspense>
      
      <Suspense fallback={<SectionFallback />}>
        <Features />
      </Suspense>
      
      <Suspense fallback={<SectionFallback />}>
        <Testimonials />
      </Suspense>
      
      <Suspense fallback={<SectionFallback />}>
        <HowItWorks />
      </Suspense>
      
      <Suspense fallback={<SectionFallback />}>
        <CTA />
      </Suspense>
      
      <Suspense fallback={<SectionFallback />}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default BrazilianPortuguesePage; 