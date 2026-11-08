import React from 'react';
import { LanguageMode } from '../types';

interface TrustQualitySectionProps {
  language: LanguageMode;
}

export const TrustQualitySection: React.FC<TrustQualitySectionProps> = ({ language }) => {
  const isHindi = language === 'hi';

  const trustLayers = [
    {
      id: 'precision',
      title: isHindi ? 'सत्यापित सटीकता' : 'Precision & Quality',
    },
    {
      id: 'sla',
      title: isHindi ? '24 घंटे टर्नअराउंड' : 'Turnaround & Reliability',
    },
    {
      id: 'security',
      title: isHindi ? 'डेटा संप्रभुता व सुरक्षा' : 'Data Security & Custody',
    },
    {
      id: 'interoperability',
      title: isHindi ? 'CAD व BIM इंटीग्रेशन' : 'CAD & BIM Integration',
    }
  ];

  return (
    <section id="resources" className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-10 sm:mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">
            {isHindi ? 'भरोसा और जवाबदेही' : 'Trust Architecture'}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight mt-1.5">
            {isHindi ? 'गुणवत्ता, सटीकता और विश्वसनीयता' : 'Engineered for Verifiable Trust'}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
            {isHindi
              ? 'बिना प्रमाण के खोखले दावों की जगह वास्तविक सॉफ्टवेयर स्क्रीनशॉट्स, सत्यापित सटीकता और कड़े सुरक्षा मानक।'
              : 'Built on verifiable evidence, documented methodology, and sovereign data handling.'}
          </p>
        </div>

        {/* ========================================================================= */}
        {/* CARDS: ONLY NAME                                                          */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {trustLayers.map((pil) => (
            <div
              key={pil.id}
              className="p-6 sm:p-8 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-orange-400 hover:shadow-xs transition-all flex items-center justify-center text-center group cursor-default min-h-[110px]"
            >
              <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-orange-600 transition-colors leading-snug">
                {pil.title}
              </h3>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
