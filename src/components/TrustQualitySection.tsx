import React, { useState } from 'react';
import { LanguageMode } from '../types';
import { ShieldCheck, Lock, Award, Clock, FileCheck, Layers } from 'lucide-react';

interface TrustQualitySectionProps {
  language: LanguageMode;
}

export const TrustQualitySection: React.FC<TrustQualitySectionProps> = ({ language }) => {
  const isHindi = language === 'hi';
  const [activeTrustIndex, setActiveTrustIndex] = useState(0);

  // 8 Trust Layers strictly from Blueprint Section 6
  const trustLayers = [
    {
      id: 'precision',
      title: isHindi ? 'सत्यापित सटीकता' : 'Precision & Quality',
      subtitle: isHindi ? 'स्वतंत्र चेकपॉइंट्स के साथ RMSE रिपोर्ट' : 'Independent Checkpoint RMSE Reporting',
      desc: isHindi
        ? 'ड्यूल-फ़्रीक्वेंसी GNSS बेस स्टेशन और अंधाधुंध चेकपॉइंट्स के साथ सब-सेंटीमीटर हॉरिजॉन्टल व वर्टिकल सत्यापन।'
        : 'Dual-frequency GNSS base station ground control with blind checkpoint RMSE reporting. Every project includes independent accuracy residuals.',
      icon: Award,
      badge: 'RMSE ≤ 1.8cm',
      evidence: 'Certified Calibration Logs'
    },
    {
      id: 'sla',
      title: isHindi ? '24 घंटे टर्नअराउंड' : 'Turnaround & Reliability',
      subtitle: isHindi ? 'समर्पित GPU क्लस्टर प्रोसेसिंग' : 'Dedicated High-Throughput GPU Cluster',
      desc: isHindi
        ? '50 हेक्टेयर तक के स्टैंडर्ड ऑर्थोमोज़ेक और वॉल्यूमेट्रिक ऑडिट 24 घंटे के अंदर प्रोसेस और डिलीवर।'
        : 'Dedicated GPU compute clusters delivering standard 50Ha orthomosaics and cut/fill volumetric reports within 24 business hours.',
      icon: Clock,
      badge: '< 24h SLA',
      evidence: 'High-Throughput Clusters'
    },
    {
      id: 'security',
      title: isHindi ? 'डेटा संप्रभुता व सुरक्षा' : 'Data Security & Custody',
      subtitle: isHindi ? 'कड़ा नॉन-डिस्क्लोज़र और ऑन-प्रेम प्रोसेसिंग' : 'Strict Non-Disclosure & Local Processing',
      desc: isHindi
        ? 'संवेदनशील औद्योगिक व सरकारी डेटा के लिए एयर-गैप्ड ऑन-प्रेमिस लोकल प्रोसेसिंग और सख्त गोपनीयता।'
        : 'Air-gapped on-premise local processing options for sensitive sovereign defense, mining, and government spatial data.',
      icon: Lock,
      badge: 'Air-Gapped Ready',
      evidence: 'ISO 27001 Protocol'
    },
    {
      id: 'interoperability',
      title: isHindi ? 'ओपन स्टैंडर्ड फॉर्मैट्स' : 'CAD & BIM Integration',
      subtitle: isHindi ? 'उद्योग-मानक सॉफ्टवेयर में सीधा उपयोग' : 'Standard GIS, CAD and BIM File Exports',
      desc: isHindi
        ? 'ArcGIS, QGIS, AutoCAD, Civil 3D और Revit में बिना किसी फ़ाइल रूपांतरण के सीधे इस्तेमाल योग्य डेटा।'
        : 'Direct compatibility with ArcGIS, QGIS, AutoCAD, Civil 3D, Bentley MicroStation, and BIM workflows. Zero proprietary lock-in.',
      icon: Layers,
      badge: 'Zero Lock-in',
      evidence: 'GeoTIFF / LAS / DXF / SHP'
    }
  ];

  return (
    <section id="resources" className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">
            {isHindi ? 'भरोसा और जवाबदेही' : 'Trust Architecture'}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight mt-1.5">
            {isHindi ? 'गुणवत्ता, सटीकता और विश्वसनीयता' : 'Engineered for Verifiable Trust'}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
            {isHindi
              ? 'बिना प्रमाण के खोखले दावों की जगह वास्तविक सॉफ्टवेयर स्क्रीनशॉट्स, सत्यापित सटीकता और कड़े सुरक्षा मानक।'
              : 'Built on verifiable evidence, documented methodology, and sovereign data handling — not unverified claims.'}
          </p>
        </div>

        {/* ========================================================================= */}
        {/* INTERACTIVE TRUST PILLARS CARDS                                           */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {trustLayers.map((pil, idx) => {
            const Icon = pil.icon;
            const isSelected = activeTrustIndex === idx;

            return (
              <div
                key={pil.id}
                onClick={() => setActiveTrustIndex(idx)}
                className={`p-6 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'border-orange-500 bg-orange-50/20 shadow-md ring-1 ring-orange-500/20'
                    : 'border-slate-200 bg-slate-50/50 hover:bg-white hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      isSelected ? 'bg-orange-500 text-white' : 'bg-white border border-slate-200 text-slate-700'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-white border border-slate-200 text-slate-700">
                      {pil.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-1">
                    {pil.title}
                  </h3>
                  <div className="text-xs font-medium text-slate-500 mb-2">
                    {pil.subtitle}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {pil.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-200/60 flex items-center justify-between text-[11px] font-medium text-slate-500">
                  <span>Evidence:</span>
                  <span className="text-slate-800 font-semibold">{pil.evidence}</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
