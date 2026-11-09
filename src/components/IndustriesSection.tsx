import React, { useRef } from 'react';
import { IndustryItem, LanguageMode } from '../types';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import { EditableText, EditableImageButton } from './Editable';

interface IndustriesSectionProps {
  industries: IndustryItem[];
  language: LanguageMode;
  onOpenInquiry: (tab?: 'project' | 'partner', industryName?: string) => void;
}

export const IndustriesSection: React.FC<IndustriesSectionProps> = ({ 
  industries, 
  language, 
  onOpenInquiry 
}) => {
  const isHindi = language === 'hi';
  const sliderRef = useRef<HTMLDivElement>(null);
  const { siteContent, updateSiteContent, isEditMode } = useAdmin();

  const industryImageMap: Record<string, string> = {
    'mining-minerals': '/assets/industries/mining.jpg',
    'solar-renewable-energy': '/assets/industries/solar.jpg',
    'construction-real-estate': '/assets/industries/construction.jpg',
    'roads-highways': '/assets/industries/highways.jpg',
    'agriculture-forestry': '/assets/industries/agriculture.jpg',
    'power-utilities': '/assets/industries/power.jpg',
    'smart-cities-urban-development': '/assets/industries/smart_cities.jpg',
    'water-resources': '/assets/industries/water.jpg',
    'infrastructure-transportation': '/assets/industries/transport.jpg',
    'industrial-facilities': '/assets/industries/industrial.jpg',
    'environmental-monitoring': '/assets/industries/environment.jpg',
    'government-public-sector': '/assets/industries/government.jpg',
  };

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
    <section id="industries" className="py-16 sm:py-24 bg-slate-50/50 border-b border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Slider Navigation Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8 sm:mb-10">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">
              {isHindi ? 'उद्योग' : 'Sectors'}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight mt-1.5">
              {isHindi ? 'लक्षित उद्योग' : 'Industries We Serve'}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
              {isHindi
                ? 'विभिन्न औद्योगिक क्षेत्रों के लिए विशेष जियोस्पेशियल और ड्रोन समाधान।'
                : 'Domain-specific geospatial intelligence tailored to industry standards, regulations, and operational workflows.'}
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
        {/* HORIZONTAL PHOTO SLIDER (No top icon, image background + name)            */}
        {/* ========================================================================= */}
        <div 
          ref={sliderRef}
          className="flex gap-5 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scroll-smooth no-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {industries.map((ind) => {
            const indFromContent = siteContent.industries?.find((i) => i.id === ind.id);
            const imgSrc = indFromContent?.image || ind.image || industryImageMap[ind.id] || '/assets/industries/construction.jpg';
            const indName = indFromContent?.name || ind.name;

            return (
              <div
                key={ind.id}
                onClick={() => {
                  if (!isEditMode) onOpenInquiry('project', `${indName} Consultation`);
                }}
                className="group relative flex-none w-[260px] sm:w-[300px] h-64 sm:h-72 rounded-2xl overflow-hidden cursor-pointer bg-slate-900 border border-slate-200/90 shadow-2xs hover:shadow-lg transition-all duration-300 hover:-translate-y-1 select-none flex flex-col justify-between p-5 snap-start"
              >
                {/* Background Industry Photo */}
                <img
                  src={imgSrc}
                  alt={indName}
                  className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                  loading="lazy"
                />

                {/* Dark Gradient Overlay for Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent pointer-events-none" />

                {/* Top Row: Inline Image Changer button (visible in Edit Mode) */}
                <div className="relative z-10 flex justify-end">
                  <EditableImageButton
                    currentImage={imgSrc}
                    onSaveImage={(newUrl) => {
                      updateSiteContent((prev) => {
                        const existing = prev.industries || [];
                        const index = existing.findIndex((i) => i.id === ind.id);
                        let updated = [...existing];
                        if (index >= 0) {
                          updated[index] = { ...updated[index], image: newUrl };
                        } else {
                          updated.push({ id: ind.id, name: indName, image: newUrl });
                        }
                        return { ...prev, industries: updated };
                      });
                    }}
                  />
                </div>

                {/* Bottom Content: ONLY NAME (In-place editable) & Arrow */}
                <div className="relative z-10 flex items-center justify-between gap-3">
                  <EditableText
                    as="h3"
                    value={indName}
                    onSave={(newName) => {
                      updateSiteContent((prev) => {
                        const existing = prev.industries || [];
                        const index = existing.findIndex((i) => i.id === ind.id);
                        let updated = [...existing];
                        if (index >= 0) {
                          updated[index] = { ...updated[index], name: newName };
                        } else {
                          updated.push({ id: ind.id, name: newName, image: imgSrc });
                        }
                        return { ...prev, industries: updated };
                      });
                    }}
                    className="text-base sm:text-lg font-bold text-white leading-snug drop-shadow-sm group-hover:text-orange-300 transition-colors block"
                  />
                  <ArrowRight className="w-4 h-4 text-white/80 group-hover:text-white group-hover:translate-x-1 transition-all shrink-0" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
