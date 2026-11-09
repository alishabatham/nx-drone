import React from 'react';
import { ArrowRight } from 'lucide-react';
import { LanguageMode } from '../types';
import { useAdmin } from '../context/AdminContext';
import { EditableText, EditableImageButton } from './Editable';

interface ThreeLayersStrategyProps {
  language: LanguageMode;
  onOpenInquiry: (tab: 'project' | 'partner', serviceName?: string) => void;
}

export const ThreeLayersStrategy: React.FC<ThreeLayersStrategyProps> = ({
  language,
  onOpenInquiry,
}) => {
  const isHindi = language === 'hi';
  const { siteContent, updateSiteContent, isEditMode } = useAdmin();
  const pillars = siteContent.pillars;

  return (
    <section id="strategy-layers" className="relative py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">
            {isHindi ? 'बिजनेस आर्किटेक्चर' : 'Strategic Architecture'}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight mt-1.5">
            {isHindi 
              ? '3 मुख्य स्तरों में संगठित NX Aerial रणनीति' 
              : 'The 3 Pillars of NX Aerial'}
          </h2>
          <p className="mt-2.5 text-sm sm:text-base text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto">
            {isHindi
              ? 'फील्ड सर्वे से लेकर AI एनालिटिक्स और क्लाउड डिजिटल ट्विन मॉनिटरिंग तक का पूर्ण स्टैक समाधान।'
              : 'End-to-end execution across flight operations, spatial analytics, and cloud software infrastructure.'}
          </p>
        </div>

        {/* ========================================================================= */}
        {/* 3 PHOTO PILLAR CARDS - EDITABLE RIGHT WHERE DESIGN IS                     */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {pillars.map((pillar, idx) => (
            <div
              key={pillar.id}
              onClick={() => {
                if (!isEditMode) onOpenInquiry('project', pillar.title);
              }}
              className="group relative rounded-2xl sm:rounded-3xl overflow-hidden aspect-[4/5] sm:aspect-[4/5] lg:aspect-[3/4] shadow-2xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col justify-between p-5 sm:p-7 bg-slate-900 border border-slate-200/90"
            >
              {/* Background Photo with smooth subtle zoom on hover */}
              <img
                src={pillar.image}
                alt={pillar.title}
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                loading="lazy"
              />

              {/* Bottom Dark Gradient Overlay for crisp readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent pointer-events-none" />

              {/* Top Row: Inline Image Changer button (visible in Edit Mode) */}
              <div className="relative z-10 flex justify-end">
                <EditableImageButton
                  currentImage={pillar.image}
                  onSaveImage={(newUrl) => {
                    updateSiteContent((prev) => {
                      const updated = [...prev.pillars];
                      updated[idx].image = newUrl;
                      return { ...prev, pillars: updated };
                    });
                  }}
                />
              </div>

              {/* Card Content Overlay: Directly Editable Title in place */}
              <div className="relative z-10 flex items-center justify-between gap-3">
                <EditableText
                  as="h3"
                  value={pillar.title}
                  onSave={(newTitle) => {
                    updateSiteContent((prev) => {
                      const updated = [...prev.pillars];
                      updated[idx].title = newTitle;
                      return { ...prev, pillars: updated };
                    });
                  }}
                  className="text-lg sm:text-xl font-bold text-white leading-snug drop-shadow-sm group-hover:text-orange-400 transition-colors block"
                />
                <ArrowRight className="w-5 h-5 text-white/80 group-hover:text-white group-hover:translate-x-1 transition-all shrink-0" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
