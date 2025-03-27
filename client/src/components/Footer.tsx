import React from 'react';
import { Instagram, Twitter, Facebook, Linkedin, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="py-20 bg-[#F8F8F3]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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
            <h3 className="font-medium mb-4">Company</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-[#232323] hover:opacity-70">Terms of service</a></li>
              <li><a href="#" className="text-[#232323] hover:opacity-70">Cookie & Privacy policy</a></li>
              <li><a href="#" className="text-[#232323] hover:opacity-70">About us</a></li>
              <li><a href="#" className="text-[#232323] hover:opacity-70">Affiliate Program</a></li>
            </ul>
          </div>

          {/* AI Generators */}
          <div>
            <h3 className="font-medium mb-4">AI Generators</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-[#232323] hover:opacity-70">Paragraph Generator</a></li>
              <li><a href="#" className="text-[#232323] hover:opacity-70">Research Paper Generator</a></li>
              <li><a href="#" className="text-[#232323] hover:opacity-70">Story Generator</a></li>
              <li><a href="#" className="text-[#232323] hover:opacity-70">Thesis Generator: Try one</a></li>
            </ul>
          </div>

          {/* Writing tools */}
          <div>
            <h3 className="font-medium mb-4">Writing tools</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-[#232323] hover:opacity-70">AI Writing Assistant</a></li>
              <li><a href="#" className="text-[#232323] hover:opacity-70">Essay Title Generator</a></li>
              <li><a href="#" className="text-[#232323] hover:opacity-70">Paraphraser Tool</a></li>
              <li><a href="#" className="text-[#232323] hover:opacity-70">Literature Review Generator</a></li>
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h3 className="font-medium mb-4">Follow Us</h3>
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
        <div className="flex flex-col md:flex-row justify-between text-sm text-[#232323]">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <span>© 2024 myStylus All Rights Reserved</span>
            <span>•</span>
            <a href="mailto:info@myStylus.ai" className="hover:opacity-70">info@myStylus.ai</a>
            <span>•</span>
            <a href="#" className="hover:opacity-70">Privacy policy</a>
          </div>
          <div>
            <p>MyStylus, Inc., 3524 Silverside Road, Suite 35B, Wilmington 19810, Delaware, USA</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
