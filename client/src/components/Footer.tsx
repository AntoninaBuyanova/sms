import React, { useState, useRef, useEffect } from 'react';
import { LinkedInIcon, TwitterIcon, InstagramIcon, YoutubeIcon, FacebookIcon } from './icons/Logo';
import { useLocation } from 'wouter';

// Language options for the selector
const languageOptions = [
  { code: 'en', name: 'English', flag: '/icons/us-flag.svg' },
  { code: 'es', name: 'Spanish', flag: '/icons/es-flag.svg' },
  { code: 'es-mx', name: 'Spanish (Mexico)', flag: '/icons/mx-flag.svg', displayCode: 'ES' },
  { code: 'pt', name: 'Portuguese', flag: '/icons/pt-flag.svg' },
  { code: 'pt-br', name: 'Portuguese (Brazil)', flag: '/icons/br-flag.svg', displayCode: 'PT' },
];

const Footer: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [, navigate] = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Get current path to determine selected language
  const currentPath = window.location.pathname;
  const selectedLanguage = currentPath === '/' ? 'en' : currentPath.replace('/', '');
  
  // Find current language object
  const currentLang = languageOptions.find(lang => lang.code === selectedLanguage) || languageOptions[0];
  
  // Handle language selection
  const handleLanguageSelect = (langCode: string) => {
    setIsDropdownOpen(false);
    const path = langCode === 'en' ? '/' : `/${langCode}`;
    navigate(path);
  };
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <footer className="py-20 bg-[#F8F8F3] font-aeonik">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Logo and tagline */}
        <div className="mb-16">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
            <img 
              src="Banner (2).png" 
              alt="Reimagine the Word - Intelligent Platform for Writing and Research" 
              className="h-auto max-w-[550px] w-full mb-6 sm:mb-0"
            />
            
            {/* Language Selector */}
            <div className="relative self-center sm:self-auto" ref={dropdownRef}>
              <div 
                className="w-[90px] bg-white py-2 px-2 flex items-center justify-between cursor-pointer"
                style={{ borderRadius: '8px' }}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <div className="flex items-center">
                  <img 
                    src={currentLang.flag || '/icons/us-flag.svg'} 
                    alt={currentLang.name}
                    className="w-6 h-6 rounded-full mr-2" 
                  />
                  <span className="font-medium">
                    {currentLang.displayCode || currentLang.code.toUpperCase()}
                  </span>
                </div>
                <svg 
                  className={`w-3 h-3 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} 
                  fill="none" 
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              
              {/* Dropdown menu */}
              {isDropdownOpen && (
                <div className="absolute z-10 mt-1 w-[200px] bg-[#1E1E1E] shadow-lg right-0" style={{ borderRadius: '8px' }}>
                  <ul className="py-2">
                    {languageOptions.map((lang) => (
                      <li 
                        key={lang.code}
                        className={`px-4 py-2 flex items-center cursor-pointer hover:bg-[#2A2A2A] text-white ${selectedLanguage === lang.code ? 'bg-[#2A2A2A]' : ''}`}
                        onClick={() => handleLanguageSelect(lang.code)}
                      >
                        <img 
                          src={lang.flag} 
                          alt={lang.name}
                          className="w-6 h-6 rounded-full mr-3" 
                        />
                        <span>
                          {lang.name}
                        </span>
                        {selectedLanguage === lang.code && (
                          <svg className="w-4 h-4 ml-auto text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Navigation Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-16">
          {/* Company */}
          <div>
            <h3 className="font-medium mb-4 font-aeonik">Company</h3>
            <ul className="space-y-3">
              <li><a href="https://mystylus.ai/terms-conditions/" className="text-[#232323] hover:opacity-70 font-aeonik">Terms of service</a></li>
              <li><a href="https://mystylus.ai/privacy-policy/" className="text-[#232323] hover:opacity-70 font-aeonik">Cookie & Privacy policy</a></li>
              <li><a href="https://mystylus.ai/about-us/" className="text-[#232323] hover:opacity-70 font-aeonik">About us</a></li>
              <li><a href="https://mystylus.ai/affiliate-program/" className="text-[#232323] hover:opacity-70 font-aeonik">Affiliate Program</a></li>
            </ul>
          </div>

          {/* AI Generators */}
          <div>
            <h3 className="font-medium mb-4 font-aeonik">AI Generators</h3>
            <ul className="space-y-3">
              <li><a href="https://mystylus.ai/paragraph-generator/" className="text-[#232323] hover:opacity-70 font-aeonik">Paragraph Generator</a></li>
              <li><a href="https://mystylus.ai/ai-paper-generator/" className="text-[#232323] hover:opacity-70 font-aeonik">Research Paper Generator</a></li>
              <li><a href="https://mystylus.ai/ai-story-generator/" className="text-[#232323] hover:opacity-70 font-aeonik">Story Generator</a></li>
              <li><a href="https://mystylus.ai/thesis-statement-generator/" className="text-[#232323] hover:opacity-70 font-aeonik">Thesis Generator: Try one</a></li>
            </ul>
          </div>

          {/* Writing tools */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="font-medium mb-4 font-aeonik">Writing tools</h3>
            <ul className="space-y-3">
              <li><a href="https://mystylus.ai/ai-essay-writer/" className="text-[#232323] hover:opacity-70 font-aeonik">AI Writing Assistant</a></li>
              <li><a href="https://mystylus.ai/essay-title-generator/" className="text-[#232323] hover:opacity-70 font-aeonik">Essay Title Generator</a></li>
              <li><a href="https://mystylus.ai/paraphrase-tool/" className="text-[#232323] hover:opacity-70 font-aeonik">Paraphraser Tool</a></li>
              <li><a href="https://mystylus.ai/ai-literature-review-generator/" className="text-[#232323] hover:opacity-70 font-aeonik">Literature Review Generator</a></li>
            </ul>
          </div>

          {/* Follow Us */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="font-medium mb-4 font-aeonik">Follow Us</h3>
            <div className="flex gap-4 flex-wrap">
              <a href="https://www.linkedin.com/company/mystylus-ai/" className="text-[#232323] hover:opacity-70"><LinkedInIcon className="w-6 h-6" /></a>
              <a href="https://x.com/stylusai/" className="text-[#232323] hover:opacity-70"><TwitterIcon className="w-6 h-6" /></a>
              <a href="https://www.instagram.com/mystylus.ai/" className="text-[#232323] hover:opacity-70"><InstagramIcon className="w-6 h-6" /></a>
              <a href="https://www.youtube.com/@mystylus" className="text-[#232323] hover:opacity-70"><YoutubeIcon className="w-6 h-6" /></a>
              <a href="https://www.facebook.com/mystylusai/" className="text-[#232323] hover:opacity-70"><FacebookIcon className="w-6 h-6" /></a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-sm text-[#232323] font-aeonik">
          <div className="flex flex-col gap-1">
            <div>© 2024 myStylus All Rights Reserved</div>
            <div>
              <a href="mailto:info@myStylus.ai" className="hover:opacity-70 font-medium">info@myStylus.ai</a>
              <span className="mx-2">•</span>
              <a href="https://mystylus.ai/privacy-policy/" className="hover:opacity-70 font-medium">Privacy policy</a>
            </div>
          </div>
          <div className="md:col-start-3 md:col-span-2 flex flex-col">
            <span>MyStylus, Inc., 3524 Silverside Road, Suite 35B,</span>
            <span>Wilmington 19810, Delaware, USA</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
