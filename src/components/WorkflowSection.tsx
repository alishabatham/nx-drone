import React from 'react';
import { 
  Plane, 
  Cpu, 
  Layers, 
  Sparkles, 
  Globe, 
  FileCheck2,
  ArrowRight,
  ChevronRight
} from 'lucide-react';
import { LanguageMode } from '../types';

interface WorkflowSectionProps {
  language: LanguageMode;
}

export const WorkflowSection: React.FC<WorkflowSectionProps> = ({ language }) => {
  const isHindi = language === 'hi';

  const flowSteps = [
    {
      step: '01',
      title: isHindi ? 'डेटा अधिग्रहण' : 'Acquisition',
      action: isHindi ? 'ड्रोन व GCP कैप्चर' : 'Drone & GCP Capture',
      icon: Plane,
    },
    {
      step: '02',
      title: isHindi ? 'फोटोग्रामेट्री' : 'Processing',
      action: isHindi ? 'ऑर्थोमोज़ेक व 3D मेश' : 'Orthomosaic & 3D Mesh',
      icon: Cpu,
    },
    {
      step: '03',
      title: isHindi ? 'स्थानिक विश्लेषण' : 'Analytics',
      action: isHindi ? 'कंटूर्स व वॉल्यूम ऑडिट' : 'Contours & Volume Audits',
      icon: Layers,
    },
    {
      step: '04',
      title: isHindi ? 'AI इंटेलिजेंस' : 'AI Inspection',
      action: isHindi ? 'स्वचालित डिफेक्ट ट्रायज' : 'Automated Defect Triage',
      icon: Sparkles,
    },
    {
      step: '05',
      title: isHindi ? 'इंटीग्रेशन' : 'Integration',
      action: isHindi ? 'वेब GIS व क्लाउड APIs' : 'Web GIS & Cloud APIs',
      icon: Globe,
    },
    {
      step: '06',
      title: isHindi ? 'प्रमाणित डिलीवरी' : 'Final Delivery',
      action: isHindi ? 'सत्यापित QA साइन-ऑफ' : 'Signed QA & Handover',
      icon: FileCheck2,
    },
  ];

  return (
    <section id="workflow" className="py-16 sm:py-20 bg-slate-50/50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header - Minimal & Clean */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">
            {isHindi ? 'कार्यप्रणाली' : 'Process Pipeline'}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight mt-1">
            {isHindi ? 'फील्ड डेटा से अंतिम डिलीवरी तक' : 'From Field Data to Final Intelligence'}
          </h2>
        </div>

        {/* ========================================================================= */}
        {/* CONNECTED STEP FLOW PIPELINE (Clean, Minimal, Flow Design)                */}
        {/* ========================================================================= */}
        <div className="relative">
          
          {/* Horizontal Desktop Flow Connector Line */}
          <div className="hidden lg:block absolute top-1/2 left-10 right-10 -translate-y-5 h-0.5 bg-slate-200 z-0" />

          {/* 6 Connected Flow Nodes Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 relative z-10">
            {flowSteps.map((item, idx) => {
              const Icon = item.icon;
              const isLast = idx === flowSteps.length - 1;

              return (
                <div key={item.step} className="relative flex flex-col items-center group">
                  
                  {/* Card Container */}
                  <div className="w-full bg-white rounded-2xl border border-slate-200 p-5 text-center flex flex-col items-center justify-between shadow-2xs hover:border-orange-400 hover:shadow-xs transition-all duration-200 group-hover:-translate-y-1">
                    
                    {/* Top Circle Node with Step Number Badge */}
                    <div className="relative mb-3.5">
                      <div className="w-12 h-12 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-700 group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500 transition-colors shadow-2xs">
                        <Icon className="w-5 h-5" />
                      </div>
                      
                      {/* Step Pill */}
                      <span className="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-slate-900 text-white">
                        {item.step}
                      </span>
                    </div>

                    {/* Step Title & Action (Short, no heavy paragraphs!) */}
                    <div className="space-y-1">
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-[11px] font-medium text-slate-500">
                        {item.action}
                      </p>
                    </div>

                  </div>

                  {/* Flow Arrow (Desktop connecting indicator between steps) */}
                  {!isLast && (
                    <div className="hidden lg:flex absolute -right-3.5 top-1/2 -translate-y-5 w-7 h-7 rounded-full bg-white border border-slate-200 items-center justify-center text-slate-400 shadow-2xs z-20 pointer-events-none group-hover:text-orange-500 group-hover:border-orange-300 transition-colors">
                      <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                  )}

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
