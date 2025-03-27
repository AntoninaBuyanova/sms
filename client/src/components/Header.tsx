import React, { useState, useEffect } from 'react';
import Logo from './Logo';
import { Menu } from 'lucide-react';

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed w-full bg-white border-b border-slate-200 z-50 ${isScrolled ? 'shadow-md' : ''}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Logo />
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-10">
            <a href="#features" className="text-base font-medium text-slate-600 hover:text-purple-600 transition-colors">Features</a>
            <a href="#pricing" className="text-base font-medium text-slate-600 hover:text-purple-600 transition-colors">Pricing</a>
            <a href="#testimonials" className="text-base font-medium text-slate-600 hover:text-purple-600 transition-colors">Testimonials</a>
            <a href="#faq" className="text-base font-medium text-slate-600 hover:text-purple-600 transition-colors">FAQ</a>
          </nav>
          
          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <a href="#" className="text-base font-medium text-slate-700 hover:text-purple-600 transition-colors">Log in</a>
            <a href="#" className="px-5 py-2 rounded-lg bg-purple-600 text-white text-base font-medium hover:bg-purple-700 transition-colors">Get Started</a>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              type="button" 
              className="text-slate-600 hover:text-purple-600 focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden bg-white absolute left-0 right-0 top-16 shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${mobileMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}
      >
        <div className="px-4 py-6 space-y-4">
          <a href="#features" className="block text-base font-medium text-slate-600 hover:text-purple-600 transition-colors" onClick={() => setMobileMenuOpen(false)}>Features</a>
          <a href="#pricing" className="block text-base font-medium text-slate-600 hover:text-purple-600 transition-colors" onClick={() => setMobileMenuOpen(false)}>Pricing</a>
          <a href="#testimonials" className="block text-base font-medium text-slate-600 hover:text-purple-600 transition-colors" onClick={() => setMobileMenuOpen(false)}>Testimonials</a>
          <a href="#faq" className="block text-base font-medium text-slate-600 hover:text-purple-600 transition-colors" onClick={() => setMobileMenuOpen(false)}>FAQ</a>
          <div className="pt-4 border-t border-slate-200 flex flex-col space-y-4">
            <a href="#" className="text-base font-medium text-slate-700 hover:text-purple-600 transition-colors" onClick={() => setMobileMenuOpen(false)}>Log in</a>
            <a href="#" className="px-5 py-2 rounded-lg bg-purple-600 text-white text-base font-medium hover:bg-purple-700 transition-colors text-center" onClick={() => setMobileMenuOpen(false)}>Get Started</a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
