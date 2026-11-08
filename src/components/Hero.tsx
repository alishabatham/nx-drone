import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { LanguageMode } from '../types';
import { TerrainCanvas } from './TerrainCanvas';
import { useAdmin } from '../context/AdminContext';
import { EditableText } from './Editable';

interface HeroProps {
  language: LanguageMode;
  onOpenInquiry: (tab?: 'project' | 'partner') => void;
  onSelectService: (serviceId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  language,
  onOpenInquiry,
}) => {
  const isHindi = language === 'hi';
  const { siteContent, updateSiteContent } = useAdmin();
  const [activeLayer, setActiveLayer] = useState<'dtm' | 'ortho' | 'twin' | 'thermal'>('dtm');

  const layers = [
    { id: 'dtm', label: isHindi ? '3D टेरेन मेश' : '3D Terrain Mesh' },
    { id: 'ortho', label: isHindi ? 'ऑर्थोमोज़ेक GIS' : 'Orthomosaic GIS' },
    { id: 'twin', label: isHindi ? 'डिजिटल ट्विन' : 'Digital Twin' },
    { id: 'thermal', label: isHindi ? 'थर्मल स्कैन' : 'Thermal Scan' },
  ] as const;

  return (
    <section className="relative pt-12 pb-16 lg:pt-16 lg:pb-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ========================================================= */}
        {/* BLUEPRINT SECTION 1: Master Hero Header                  */}
        {/* ========================================================= */}
        <div className="relative text-center max-w-4xl mx-auto space-y-5">
          <div>
            <EditableText
              as="span"
              value={isHindi ? 'जियोस्पेशियल टेक्नोलॉजी एवं इंटेलिजेंस पार्टनर' : siteContent.hero.kicker}
              onSave={(newKicker) =>
                updateSiteContent((prev) => ({
                  ...prev,
                  hero: { ...prev.hero, kicker: newKicker },
                }))
              }
              className="text-xs font-bold uppercase tracking-widest text-slate-500 inline-block"
            />
          </div>

          {/* Master Headline: Directly editable in place */}
          <div>
            <EditableText
              as="h1"
              value={isHindi 
                ? 'एरियल डेटा को उद्योगों को आगे बढ़ाने वाली बुद्धिमत्ता में बदलना।' 
                : siteContent.hero.title}
              onSave={(newTitle) =>
                updateSiteContent((prev) => ({
                  ...prev,
                  hero: { ...prev.hero, title: newTitle },
                }))
              }
              className="text-2xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight leading-[1.2] block"
              multiline
            />
          </div>

          {/* Master Supporting Text: Directly editable in place */}
          <div>
            <EditableText
              as="p"
              value={isHindi
                ? 'NX ड्रोन इंटेलिजेंस जटिल वास्तविक परियोजनाओं के लिए एकीकृत ड्रोन डेटा प्रोसेसिंग, GIS मैपिंग, AI एनालिटिक्स, 3D मॉडलिंग और कस्टम सॉफ्टवेयर समाधान प्रदान करता है।'
                : siteContent.hero.subtitle}
              onSave={(newSubtitle) =>
                updateSiteContent((prev) => ({
                  ...prev,
                  hero: { ...prev.hero, subtitle: newSubtitle },
                }))
              }
              className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-3xl mx-auto block"
              multiline
            />
          </div>

          {/* Master CTAs from Blueprint: 2 Primary + 1 Secondary */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#capabilities"
              className="px-6 py-3 text-sm font-semibold text-white bg-slate-900 hover:bg-orange-500 rounded-xl transition-colors shadow-xs"
            >
              {isHindi ? 'हमारी क्षमताएं देखें' : 'Explore Our Capabilities'}
            </a>

            <button
              type="button"
              onClick={() => onOpenInquiry('project')}
              className="px-6 py-3 text-sm font-semibold text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors flex items-center gap-2"
            >
              <span>{isHindi ? 'प्रोजेक्ट पर चर्चा करें' : 'Discuss Your Project'}</span>
              <ArrowRight className="w-4 h-4 text-orange-500" />
            </button>

            <button
              type="button"
              onClick={() => onOpenInquiry('partner')}
              className="px-4 py-3 text-sm font-semibold text-orange-600 hover:text-orange-700 transition-colors"
            >
              {isHindi ? 'पार्टनर बनें →' : 'Partner With NX →'}
            </button>
          </div>
        </div>

        {/* ========================================================= */}
        {/* INTERACTIVE GEOSPATIAL TERRAIN & MAPPING STAGE             */}
        {/* ========================================================= */}
        <div className="mt-12 max-w-5xl mx-auto">
          <div className="rounded-2xl overflow-hidden bg-slate-50 border border-slate-200 shadow-xs relative">
            <div className="relative h-[360px] sm:h-[440px] lg:h-[480px] w-full">
              <TerrainCanvas />

              {/* Layer Selection Badges */}
              <div className="absolute top-4 left-4 z-20 flex flex-wrap gap-2">
                {layers.map((l) => (
                  <button
                    key={l.id}
                    onClick={() => setActiveLayer(l.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      activeLayer === l.id
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'bg-white/95 text-slate-700 hover:text-slate-900 border border-slate-200 hover:bg-slate-50 shadow-xs'
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Verifiable Differentiators Strip: Editable in place */}
          <div className="mt-6 grid grid-cols-3 gap-4 text-center border-t border-slate-100 pt-6">
            <div>
              <EditableText
                as="div"
                value={siteContent.hero.statGsd}
                onSave={(newVal) =>
                  updateSiteContent((prev) => ({
                    ...prev,
                    hero: { ...prev.hero, statGsd: newVal },
                  }))
                }
                className="text-xl sm:text-2xl font-semibold font-mono text-slate-900"
              />
              <div className="text-xs text-slate-500 mt-0.5">GSD Resolution</div>
            </div>
            <div>
              <EditableText
                as="div"
                value={siteContent.hero.statRmse}
                onSave={(newVal) =>
                  updateSiteContent((prev) => ({
                    ...prev,
                    hero: { ...prev.hero, statRmse: newVal },
                  }))
                }
                className="text-xl sm:text-2xl font-semibold font-mono text-slate-900"
              />
              <div className="text-xs text-slate-500 mt-0.5">Vertical RMSE Validation</div>
            </div>
            <div>
              <EditableText
                as="div"
                value={siteContent.hero.statSla}
                onSave={(newVal) =>
                  updateSiteContent((prev) => ({
                    ...prev,
                    hero: { ...prev.hero, statSla: newVal },
                  }))
                }
                className="text-xl sm:text-2xl font-semibold font-mono text-slate-900"
              />
              <div className="text-xs text-slate-500 mt-0.5">Rapid Processing SLA</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
