import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { LanguageMode } from '../types';
import { useAdmin } from '../context/AdminContext';
import { EditableText, EditableImageButton } from './Editable';

interface WhatWeDoProps {
  language: LanguageMode;
  onSelectCategory: (categoryId: string) => void;
}

export const WhatWeDo: React.FC<WhatWeDoProps> = ({ language, onSelectCategory }) => {
  const isHindi = language === 'hi';
  const sliderRef = useRef<HTMLDivElement>(null);
  const { siteContent, updateSiteContent, isEditMode } = useAdmin();
  const services = siteContent.services;

  const handleScroll = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const scrollAmount = sliderRef.current.clientWidth * 0.75;
      sliderRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="capabilities" className="relative py-16 sm:py-24 bg-white border-b border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Slider Navigation Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8 sm:mb-10">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">
              {isHindi ? 'हमारी सेवाएं' : 'Our Services'}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight mt-1.5">
              {isHindi 
                ? 'एक टेक्नोलॉजी पार्टनर। संपूर्ण जियोस्पेशियल क्षमताएं।' 
                : 'One Technology Partner. Complete Geospatial Capabilities.'}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
              {isHindi
                ? 'ड्रोन डेटा प्रोसेसिंग, GIS मैपिंग, AI एनालिटिक्स और 3D डिजिटल ट्विन — एंड-टू-एंड निष्पादन।'
                : 'Turnkey data-to-delivery workflows across photogrammetry, spatial analytics, AI vision, and web GIS.'}
            </p>
          </div>

          {/* Slider Controls (< and > circle buttons) */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => handleScroll('left')}
              aria-label="Scroll left"
              className="w-10 h-10 rounded-full border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 flex items-center justify-center transition-colors shadow-2xs"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => handleScroll('right')}
              aria-label="Scroll right"
              className="w-10 h-10 rounded-full border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 flex items-center justify-center transition-colors shadow-2xs"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* HORIZONTAL PHOTO SLIDER FOR SERVICES - IN-PLACE EDITABLE                   */}
        {/* ========================================================================= */}
        <div 
          ref={sliderRef}
          className="flex gap-5 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scroll-smooth no-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {services.map((svc, idx) => (
            <div
              key={svc.id}
              onClick={() => {
                if (!isEditMode) onSelectCategory(svc.targetCatId);
              }}
              className="group relative flex-none w-[260px] sm:w-[300px] h-64 sm:h-72 rounded-2xl overflow-hidden cursor-pointer bg-slate-900 border border-slate-200/90 shadow-2xs hover:shadow-lg transition-all duration-300 hover:-translate-y-1 select-none flex flex-col justify-between p-5 snap-start"
            >
              {/* Full Background Drone Photo */}
              <img
                src={svc.image}
                alt={svc.name}
                className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                loading="lazy"
              />

              {/* Bottom Dark Gradient for crisp readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent pointer-events-none" />

              {/* Top Row: Inline Image Changer button (visible in Edit Mode) */}
              <div className="relative z-10 flex justify-end">
                <EditableImageButton
                  currentImage={svc.image}
                  onSaveImage={(newUrl) => {
                    updateSiteContent((prev) => {
                      const updated = [...prev.services];
                      updated[idx].image = newUrl;
                      return { ...prev, services: updated };
                    });
                  }}
                />
              </div>

              {/* Card Content Overlay: ONLY NAME (In-place editable) & Subtle Arrow */}
              <div className="relative z-10 flex items-center justify-between gap-3">
                <EditableText
                  as="h3"
                  value={svc.name}
                  onSave={(newName) => {
                    updateSiteContent((prev) => {
                      const updated = [...prev.services];
                      updated[idx].name = newName;
                      return { ...prev, services: updated };
                    });
                  }}
                  className="text-base sm:text-lg font-bold text-white leading-snug drop-shadow-sm group-hover:text-orange-300 transition-colors block"
                />
                <ArrowRight className="w-4 h-4 text-white/80 group-hover:text-white group-hover:translate-x-1 transition-all shrink-0" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
