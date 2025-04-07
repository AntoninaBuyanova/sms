import React, { useEffect, lazy, Suspense } from 'react';
import Header from '@/components/Header';

// Import only the most critical components eagerly
import HeroSection from '@/components/HeroSection';

// Lazy load below-the-fold components
const LogoCloud = lazy(() => import('@/components/LogoCloud'));
const Features = lazy(() => import('@/components/Features'));
const Testimonials = lazy(() => import('@/components/Testimonials'));
const HowItWorks = lazy(() => import('@/components/HowItWorks'));
const CTA = lazy(() => import('@/components/CTA'));
const Footer = lazy(() => import('@/components/Footer'));

// Simple fallback for lazy components
const SectionFallback = () => <div className="w-full h-32 bg-slate-50"></div>;

const Home: React.FC = () => {
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
        import('@/components/Features');
        import('@/components/HowItWorks');
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

export default Home;
