import React, { useState } from 'react';
import { Menu, X, Search, ArrowRight, Lock } from 'lucide-react';
import { LanguageMode } from '../types';
import { useAdmin } from '../context/AdminContext';

interface NavbarProps {
  language: LanguageMode;
  onLanguageChange: (lang: LanguageMode) => void;
  onOpenInquiry: (tab?: 'project' | 'partner') => void;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  language,
  onLanguageChange,
  onOpenInquiry,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isHindi = language === 'hi';
  const { isAdmin, setIsLoginModalOpen, setIsCrmOpen } = useAdmin();

  const navLinks = [
    { href: '#capabilities', label: isHindi ? 'क्षमताएं' : 'Capabilities' },
    { href: '#services', label: isHindi ? 'सेवाएं' : 'Services' },
    { href: '#industries', label: isHindi ? 'उद्योग' : 'Industries' },
    { href: '#partner', label: isHindi ? 'पार्टनर' : 'Partner With Us' },
    { href: '#contact', label: isHindi ? 'संपर्क' : 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6 h-18">
          
          {/* ========================================================= */}
          {/* LOGO: NX Aerial Transparent Brand Logo                     */}
          {/* ========================================================= */}
          <a href="#" className="flex items-center gap-2.5 shrink-0 group">
            <img 
              src="/assets/nx_logo.png" 
              alt="NX Aerial" 
              className="h-9 w-auto object-contain transition-transform group-hover:scale-105" 
            />
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-slate-900 group-hover:text-emerald-600 transition-colors leading-none">
                NX Aerial
              </span>
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mt-0.5">
                Drone Intelligence
              </span>
            </div>
          </a>

          {/* ========================================================= */}
          {/* CENTER NAVIGATION LINKS (Matching Image 2 Nav)            */}
          {/* ========================================================= */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-slate-600">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-orange-600 transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-0.5 after:bg-orange-500 after:transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* ========================================================= */}
          {/* RIGHT ACTION: Search, Language & CTA (No Bag / User Icons)*/}
          {/* ========================================================= */}
          <div className="flex items-center gap-2.5 sm:gap-3.5 shrink-0">
            {/* Search Icon */}
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById('services');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors"
              title="Search Services & Solutions"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Language Toggle (EN / HI) */}
            <div className="flex items-center rounded-lg border border-slate-200 p-0.5 bg-slate-50 text-xs font-semibold">
              <button
                type="button"
                onClick={() => onLanguageChange('en')}
                className={`px-2 py-1 rounded-md transition-colors ${
                  language === 'en'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => onLanguageChange('hi')}
                className={`px-2 py-1 rounded-md transition-colors ${
                  language === 'hi'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                HI
              </button>
            </div>

            {/* Primary Action Button: Request a Project */}
            <button
              type="button"
              onClick={() => onOpenInquiry('project')}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-slate-900 hover:bg-orange-500 rounded-xl transition-all shadow-xs active:scale-95"
            >
              <span>{isHindi ? 'प्रोजेक्ट शुरू करें' : 'Request a Project'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-xl"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white/95 backdrop-blur-md px-4 py-6 space-y-4">
          <nav className="flex flex-col space-y-3 font-semibold text-slate-700">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-slate-50 hover:text-orange-600 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
            {/* Language Selector */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => {
                  onLanguageChange('en');
                  setMobileMenuOpen(false);
                }}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg ${
                  language === 'en' ? 'bg-orange-500 text-white' : 'bg-slate-100 text-slate-700'
                }`}
              >
                English
              </button>
              <button
                type="button"
                onClick={() => {
                  onLanguageChange('hi');
                  setMobileMenuOpen(false);
                }}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg ${
                  language === 'hi' ? 'bg-orange-500 text-white' : 'bg-slate-100 text-slate-700'
                }`}
              >
                हिंदी
              </button>
            </div>

            <button
              type="button"
              onClick={() => {
                if (isAdmin) {
                  setIsCrmOpen(true);
                } else {
                  setIsLoginModalOpen(true);
                }
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 px-3 py-1.5 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
            >
              <Lock className="w-3.5 h-3.5 text-orange-500" />
              <span>{isAdmin ? 'Admin & CRM' : 'Admin Login'}</span>
            </button>
          </div>

          <button
            type="button"
            onClick={() => {
              onOpenInquiry('project');
              setMobileMenuOpen(false);
            }}
            className="w-full py-3 text-center text-sm font-semibold text-white bg-slate-900 hover:bg-orange-500 rounded-xl shadow-xs transition-colors"
          >
            {isHindi ? 'प्रोजेक्ट का अनुरोध करें' : 'Request a Project'}
          </button>
        </div>
      )}
    </header>
  );
};
