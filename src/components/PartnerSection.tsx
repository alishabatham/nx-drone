import React from 'react';
import { ArrowRight, Plane, Cpu } from 'lucide-react';
import { LanguageMode } from '../types';
import { useAdmin } from '../context/AdminContext';
import { EditableText } from './Editable';

interface PartnerSectionProps {
  language: LanguageMode;
  onOpenInquiry: (tab: 'partner' | 'project') => void;
}

export const PartnerSection: React.FC<PartnerSectionProps> = ({ language, onOpenInquiry }) => {
  const isHindi = language === 'hi';
  const { siteContent, updateSiteContent } = useAdmin();

  const partnerTracks = [
    {
      title: isHindi ? 'ड्रोन सर्वे कंपनियों व पायलेट्स के लिए' : siteContent.partner.track1Title,
      subtitle: isHindi ? 'व्हाइट-लेबल प्रोसेसिंग और वॉल्यूमेट्रिक निष्पादन' : siteContent.partner.track1Sub,
      desc: isHindi
        ? 'आपके पास प्रोजेक्ट्स और फ्लाइट डेटा है — हम आपके लिए 24 घंटे में हाई-स्पीड फोटोग्रामेट्री, कंटूर मैपिंग और कट/फिल रिपोर्ट तैयार करेंगे, बिना किसी महंगे वर्कस्टेशन के।'
        : siteContent.partner.track1Desc,
      icon: Plane,
      benefits: [
        'Guaranteed 24-Hour SLA Delivery',
        'Zero Workstation or Software License Capex',
        'Certified PPK / RTK Georeferencing Accuracy',
        'White-Label Branded Client Reports'
      ],
      actionText: isHindi ? 'पार्टनर के रूप में जुड़ें' : 'Join as Drone Partner'
    },
    {
      title: isHindi ? 'इंजीनियरिंग व सर्वे कंसल्टेंट्स के लिए' : siteContent.partner.track2Title,
      subtitle: isHindi ? 'LiDAR क्लासिफिकेशन और CAD/BIM इंटीग्रेशन' : siteContent.partner.track2Sub,
      desc: isHindi
        ? 'जटिल इन्फ्रास्ट्रक्चर और माइनिंग प्रोजेक्ट्स के लिए पॉइंट क्लाउड क्लासिफिकेशन, हाइड्रो-मॉडलिंग और सीधा AutoCAD/Civil 3D इंटीग्रेशन।'
        : siteContent.partner.track2Desc,
      icon: Cpu,
      benefits: [
        'Direct Civil 3D, QGIS & AutoCAD Compatibility',
        'Sub-Centimeter Quality Assurance Checkpoints',
        'Customized Web GIS Dashboards for Clients',
        'Joint Project Bidding & Procurement Support'
      ],
      actionText: isHindi ? 'कंसल्टेंट साझेदारी शुरू करें' : 'Explore Consulting Alliance'
    }
  ];

  return (
    <section id="partner" className="relative py-16 sm:py-24 bg-slate-50/50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl space-y-2">
            <div>
              <EditableText
                as="span"
                value={isHindi ? 'साझेदारी' : siteContent.partner.subtitle}
                onSave={(newSub) =>
                  updateSiteContent((prev) => ({
                    ...prev,
                    partner: { ...prev.partner, subtitle: newSub },
                  }))
                }
                className="text-xs font-semibold uppercase tracking-widest text-slate-500 inline-block"
              />
            </div>
            <div>
              <EditableText
                as="h2"
                value={isHindi ? 'पार्टनरशिप प्रोग्राम' : siteContent.partner.title}
                onSave={(newTitle) =>
                  updateSiteContent((prev) => ({
                    ...prev,
                    partner: { ...prev.partner, title: newTitle },
                  }))
                }
                className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight block"
              />
            </div>
            <div>
              <EditableText
                as="p"
                value={isHindi 
                  ? 'ड्रोन कंपनियों और कंसल्टेंट्स के लिए एंड-टू-एंड डेटा प्रोसेसिंग, GIS, AI और डिजिटल ट्विन डिलीवरी मॉडल।' 
                  : siteContent.partner.desc}
                onSave={(newDesc) =>
                  updateSiteContent((prev) => ({
                    ...prev,
                    partner: { ...prev.partner, desc: newDesc },
                  }))
                }
                className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed block"
                multiline
              />
            </div>
          </div>

          <button
            type="button"
            onClick={() => onOpenInquiry('partner')}
            className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-slate-900 hover:bg-orange-500 rounded-xl transition-colors shrink-0 flex items-center gap-2 shadow-xs"
          >
            <span>{isHindi ? 'पार्टनर बनें' : 'Become a Partner'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* ========================================================================= */}
        {/* 2-TRACK PARTNER ARCHITECTURE CARDS (No boring small boxes)                */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {partnerTracks.map((track, idx) => {
            const Icon = track.icon;

            return (
              <div 
                key={idx}
                className="p-7 sm:p-8 rounded-3xl border border-slate-200 bg-white shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-md bg-slate-100 text-slate-600">
                      PARTNER TRACK 0{idx + 1}
                    </span>
                  </div>

                  <div>
                    <EditableText
                      as="h3"
                      value={track.title}
                      onSave={(newVal) => {
                        updateSiteContent((prev) => ({
                          ...prev,
                          partner: {
                            ...prev.partner,
                            ...(idx === 0 ? { track1Title: newVal } : { track2Title: newVal }),
                          },
                        }));
                      }}
                      className="text-xl font-bold text-slate-900 block"
                    />
                    <div className="mt-0.5">
                      <EditableText
                        as="div"
                        value={track.subtitle}
                        onSave={(newVal) => {
                          updateSiteContent((prev) => ({
                            ...prev,
                            partner: {
                              ...prev.partner,
                              ...(idx === 0 ? { track1Sub: newVal } : { track2Sub: newVal }),
                            },
                          }));
                        }}
                        className="text-xs font-semibold text-orange-600 block"
                      />
                    </div>
                  </div>

                  <EditableText
                    as="p"
                    value={track.desc}
                    onSave={(newVal) => {
                      updateSiteContent((prev) => ({
                        ...prev,
                        partner: {
                          ...prev.partner,
                          ...(idx === 0 ? { track1Desc: newVal } : { track2Desc: newVal }),
                        },
                      }));
                    }}
                    className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal block"
                    multiline
                  />

                  {/* Clean Editorial Benefits List */}
                  <div className="pt-2 border-t border-slate-100 space-y-1.5">
                    {track.benefits.map((ben, bIdx) => (
                      <div key={bIdx} className="flex items-center gap-2 text-xs font-medium text-slate-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0" />
                        <span>{ben}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => onOpenInquiry('partner')}
                    className="w-full py-2.5 rounded-xl border border-slate-300 hover:border-slate-900 bg-white text-xs font-semibold text-slate-800 transition-colors flex items-center justify-center gap-2"
                  >
                    <span>{track.actionText}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-orange-500" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
