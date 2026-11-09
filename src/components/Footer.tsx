import React from 'react';
import { LanguageMode } from '../types';
import { Mail, Phone, MapPin, Shield, Lock } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

interface FooterProps {
  language: LanguageMode;
  onOpenInquiry: (tab?: 'project' | 'partner') => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ language, onOpenInquiry }) => {
  const isHindi = language === 'hi';
  const { isAdmin, setIsLoginModalOpen, setIsCrmOpen } = useAdmin();

  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1: Brand & Philosophy (Spans 2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <img 
                src="/assets/nx_logo.png" 
                alt="NX Aerial" 
                className="h-8 w-auto object-contain brightness-110" 
              />
              <span className="text-base font-extrabold tracking-tight text-white">
                NX AERIAL
              </span>
            </div>

            <p className="text-slate-300 font-medium text-xs">
              From Aerial Data to Actionable Intelligence.
            </p>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Capturing the world. Understanding the data. Engineering better decisions. Complete geospatial technology, photogrammetry, AI analytics, and 3D digital twin execution.
            </p>

            <div className="pt-2 flex items-center gap-2 text-[11px] font-mono text-slate-400">
              <Shield className="w-3.5 h-3.5 text-sky-400" />
              <span>DGCA & ISO 9001:2015 Compliant Data Security</span>
            </div>
          </div>

          {/* Col 2: Services Directory */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-white uppercase tracking-wider block">
              Core Capabilities
            </span>
            <ul className="space-y-2 text-xs">
              <li><a href="#services" className="hover:text-white transition-colors">Drone Data Acquisition</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Photogrammetry & PPK</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">GIS & Contour Mapping</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Stockpile Volumetrics</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">AI Defect Detection</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">3D Digital Twins</a></li>
            </ul>
          </div>

          {/* Col 3: Key Verticals */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-white uppercase tracking-wider block">
              Industry Verticals
            </span>
            <ul className="space-y-2 text-xs">
              <li><a href="#industries" className="hover:text-white transition-colors">Mining & Minerals</a></li>
              <li><a href="#industries" className="hover:text-white transition-colors">Solar & Renewables</a></li>
              <li><a href="#industries" className="hover:text-white transition-colors">Roads & Expressways</a></li>
              <li><a href="#industries" className="hover:text-white transition-colors">Smart Cities & BIM</a></li>
              <li><a href="#industries" className="hover:text-white transition-colors">Agriculture & Forestry</a></li>
              <li><a href="#industries" className="hover:text-white transition-colors">Power & Transmission</a></li>
            </ul>
          </div>

          {/* Col 4: Contact & Engagement */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-white uppercase tracking-wider block">
              Direct Technical Office
            </span>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                <span>Geospatial Processing Hub, Aerocity, New Delhi & Bangalore, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <span>engineering@nxdrones.ai</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <span>+91 11 4982 7700</span>
              </div>
            </div>

            <div className="pt-3">
              <button
                type="button"
                onClick={() => onOpenInquiry('project')}
                className="w-full py-2 px-3 text-xs font-semibold text-slate-900 bg-white hover:bg-sky-400 rounded-lg transition-colors text-center"
              >
                Submit Project Brief
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Sub-bar */}
        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} NX Aerial Pvt. Ltd. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                if (isAdmin) {
                  setIsCrmOpen(true);
                } else {
                  setIsLoginModalOpen(true);
                }
              }}
              className="hover:text-orange-400 transition-colors flex items-center gap-1.5"
            >
              <Lock className="w-3 h-3 text-orange-500" />
              <span>{isAdmin ? 'Admin & CRM Panel' : 'Staff Admin Login'}</span>
            </button>
            <span aria-hidden="true">·</span>
            <span>Privacy Policy</span>
            <span aria-hidden="true">·</span>
            <span>Geospatial Data Handling</span>
            <span aria-hidden="true">·</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
