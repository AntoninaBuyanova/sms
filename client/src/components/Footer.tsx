import React from 'react';
import { Instagram, Twitter, Facebook, Linkedin, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="py-20 bg-[#F8F8F3] font-aeonik">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Logo and tagline */}
        <div className="mb-16">
          <img 
            src="Banner (2).png" 
            alt="Reimagine the Word - Intelligent Platform for Writing and Research" 
            className="h-auto max-w-[550px] w-full"
          />
        </div>

        {/* Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Company */}
          <div>
            <h3 className="font-medium mb-4 font-aeonik">Company</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-[#232323] hover:opacity-70 font-aeonik">Terms of service</a></li>
              <li><a href="#" className="text-[#232323] hover:opacity-70 font-aeonik">Cookie & Privacy policy</a></li>
              <li><a href="#" className="text-[#232323] hover:opacity-70 font-aeonik">About us</a></li>
              <li><a href="#" className="text-[#232323] hover:opacity-70 font-aeonik">Affiliate Program</a></li>
            </ul>
          </div>

          {/* AI Generators */}
          <div>
            <h3 className="font-medium mb-4 font-aeonik">AI Generators</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-[#232323] hover:opacity-70 font-aeonik">Paragraph Generator</a></li>
              <li><a href="#" className="text-[#232323] hover:opacity-70 font-aeonik">Research Paper Generator</a></li>
              <li><a href="#" className="text-[#232323] hover:opacity-70 font-aeonik">Story Generator</a></li>
              <li><a href="#" className="text-[#232323] hover:opacity-70 font-aeonik">Thesis Generator: Try one</a></li>
            </ul>
          </div>

          {/* Writing tools */}
          <div>
            <h3 className="font-medium mb-4 font-aeonik">Writing tools</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-[#232323] hover:opacity-70 font-aeonik">AI Writing Assistant</a></li>
              <li><a href="#" className="text-[#232323] hover:opacity-70 font-aeonik">Essay Title Generator</a></li>
              <li><a href="#" className="text-[#232323] hover:opacity-70 font-aeonik">Paraphraser Tool</a></li>
              <li><a href="#" className="text-[#232323] hover:opacity-70 font-aeonik">Literature Review Generator</a></li>
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h3 className="font-medium mb-4 font-aeonik">Follow Us</h3>
            <div className="flex gap-4">
              <a href="#" className="text-[#232323] hover:opacity-70"><Linkedin className="w-6 h-6" /></a>
              <a href="#" className="text-[#232323] hover:opacity-70"><Twitter className="w-6 h-6" /></a>
              <a href="#" className="text-[#232323] hover:opacity-70"><Instagram className="w-6 h-6" /></a>
              <a href="#" className="text-[#232323] hover:opacity-70"><Youtube className="w-6 h-6" /></a>
              <a href="#" className="text-[#232323] hover:opacity-70"><Facebook className="w-6 h-6" /></a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-sm text-[#232323] font-aeonik">
          <div className="flex flex-col gap-1">
            <div>© 2024 myStylus All Rights Reserved</div>
            <div>
              <a href="mailto:info@myStylus.ai" className="hover:opacity-70">info@myStylus.ai</a>
              <span className="mx-2">•</span>
              <a href="#" className="hover:opacity-70">Privacy policy</a>
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
