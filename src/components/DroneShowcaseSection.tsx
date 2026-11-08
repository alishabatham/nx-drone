import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { LanguageMode } from '../types';

interface DroneShowcaseSectionProps {
  language: LanguageMode;
  onOpenInquiry: (tab?: 'project' | 'partner', serviceName?: string) => void;
}

export const DroneShowcaseSection: React.FC<DroneShowcaseSectionProps> = ({
  language,
}) => {
  const isHindi = language === 'hi';
  const [activeSlide, setActiveSlide] = useState(1);

  // Gallery cards for "at a Glance"
  const glanceCards = [
    {
      id: 0,
      title: isHindi ? 'तटीय हवाई सर्वेक्षण' : 'Coastal Horizon Recon',
      views: '8.4k',
      image: '/assets/showcase/glance_drone_flight.jpg',
    },
    {
      id: 1,
      title: isHindi ? 'अल्पाइन पर्वत उड़ान' : 'Alpine Mountain Flight',
      views: '10.02k',
      image: '/assets/showcase/mountain_flight.jpg',
    },
    {
      id: 2,
      title: isHindi ? 'माइनिंग व वॉल्यूमेट्रिक्स' : 'Mining & Volumetrics',
      views: '12.6k',
      image: '/assets/showcase/hero_drone.jpg',
    },
    {
      id: 3,
      title: isHindi ? 'सोलर पार्क मैपिंग' : 'Solar Farm Mapping',
      views: '9.1k',
      image: '/assets/showcase/glance_valley.jpg',
    },
    {
      id: 4,
      title: isHindi ? 'इन्फ्रास्ट्रक्चर डिजिटल ट्विन' : 'Infrastructure Twin',
      views: '15.3k',
      image: '/assets/showcase/glance_industrial.jpg',
    },
  ];

  const handlePrev = () => {
    setActiveSlide((prev) => (prev === 0 ? glanceCards.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveSlide((prev) => (prev === glanceCards.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section id="fleet-glance" className="py-16 sm:py-20 bg-white text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ========================================================= */}
        {/* SECTION 1: at a Glance (Exact match to reference image 1) */}
        {/* ========================================================= */}
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
            at a Glance
          </h2>
        </div>

        {/* Carousel Container */}
        <div className="relative mb-6">
          <div className="flex items-center justify-center gap-4 sm:gap-6 overflow-hidden py-2">
            {glanceCards.map((card, idx) => {
              const isCenter = idx === activeSlide;
              const isPrev = idx === (activeSlide - 1 + glanceCards.length) % glanceCards.length;
              const isNext = idx === (activeSlide + 1) % glanceCards.length;

              if (!isCenter && !isPrev && !isNext) return null;

              return (
                <div
                  key={card.id}
                  onClick={() => setActiveSlide(idx)}
                  className={`cursor-pointer transition-all duration-300 select-none ${
                    isCenter
                      ? 'w-[280px] sm:w-[360px] lg:w-[400px] scale-100 opacity-100 z-20 shadow-md ring-1 ring-slate-200'
                      : 'hidden sm:block w-[220px] sm:w-[260px] lg:w-[300px] scale-95 opacity-60 hover:opacity-80 z-10'
                  } rounded-3xl overflow-hidden bg-slate-100 border border-slate-200`}
                >
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-slate-100">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />

                    {/* Minimal Top-Right View Counter */}
                    <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/70 text-white text-xs font-medium">
                      <Eye className="w-3.5 h-3.5 text-slate-300" />
                      <span>{card.views}</span>
                    </div>

                    {/* Bottom Title */}
                    <div className="absolute bottom-4 left-4 right-4 text-white drop-shadow-md">
                      <h3 className="text-lg font-bold">
                        {card.title}
                      </h3>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation Controls: Clean Circles */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous slide"
              className="w-11 h-11 rounded-full border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 flex items-center justify-center transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={handleNext}
              aria-label="Next slide"
              className="w-11 h-11 rounded-full bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center transition-colors"
            >
              <ChevronRight className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>
        </div>

        {/* ================================================================= */}
        {/* SECTION 2: Explore Key Features (Clean, Solid, No Gradients/Tags) */}
        {/* ================================================================= */}
        <div id="features" className="pt-16 sm:pt-20">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
              {isHindi ? 'मुख्य विशेषताएं' : 'Explore Key Features'}
            </h2>
          </div>

          {/* Clean Bento Grid (Exact layout from Image 1) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 items-stretch max-w-5xl mx-auto">
            
            {/* Card 1: 4K Clear Camera */}
            <div className="lg:col-span-7 bg-slate-50 rounded-3xl p-6 sm:p-7 border border-slate-200 flex flex-col justify-between">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="w-full sm:w-1/2 aspect-square sm:aspect-auto sm:h-44 rounded-2xl overflow-hidden bg-white border border-slate-200 p-2 flex items-center justify-center shrink-0">
                  <img
                    src="/assets/showcase/camera_gimbal.jpg"
                    alt="4K Clear Camera"
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>

                <div className="w-full sm:w-1/2 space-y-1.5">
                  <h3 className="text-xl font-bold text-slate-900">
                    {isHindi ? '4K स्पष्ट कैमरा' : '4K Clear Camera'}
                  </h3>
                  <p className="text-sm text-slate-600">
                    {isHindi
                      ? 'स्थिर, अल्ट्रा-क्लियर 4K फुटेज और स्मार्ट मोड्स।'
                      : 'Stabilized, ultra-clear 4K footage with smart modes.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2: 2250mAh Power Battery */}
            <div className="lg:col-span-5 bg-slate-50 rounded-3xl p-6 sm:p-7 border border-slate-200 flex flex-col justify-between">
              <div className="flex flex-col sm:flex-row items-center gap-5">
                <div className="space-y-1.5 flex-1 order-2 sm:order-1">
                  <h3 className="text-xl font-bold text-slate-900">
                    {isHindi ? '2250mAh पावर बैटरी' : '2250mAh Power Battery'}
                  </h3>
                  <p className="text-sm text-slate-600">
                    {isHindi
                      ? '31 मिनट की उड़ान और सुरक्षित स्मार्ट BMS।'
                      : 'Up to 31 minutes flight time with safe BMS.'}
                  </p>
                </div>

                {/* Vertical Battery Render */}
                <div className="w-24 sm:w-28 h-36 sm:h-44 rounded-2xl bg-white border border-slate-200 p-2 flex items-center justify-center shrink-0 order-1 sm:order-2">
                  <img
                    src="/assets/showcase/battery_pack.jpg"
                    alt="2250mAh Battery"
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
              </div>
            </div>

            {/* Card 3: Ergonomic Remote */}
            <div className="lg:col-span-5 bg-slate-50 rounded-3xl p-6 sm:p-7 border border-slate-200 flex flex-col justify-between">
              <div className="space-y-1.5">
                <h3 className="text-xl font-bold text-slate-900">
                  {isHindi ? 'एर्गोनोमिक रिमोट' : 'Ergonomic Remote'}
                </h3>
                <p className="text-sm text-slate-600">
                  {isHindi
                    ? 'सटीक नियंत्रण और स्थिर लो-लेटेंसी कनेक्टिविटी।'
                    : 'Precision control with low-latency transmission.'}
                </p>
              </div>

              <div className="mt-4 w-full h-36 rounded-2xl bg-white border border-slate-200 p-2 flex items-center justify-center overflow-hidden">
                <img
                  src="/assets/showcase/remote_controller.jpg"
                  alt="Ergonomic Remote"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
            </div>

            {/* Card 4: Ultra-Light Weight */}
            <div className="lg:col-span-7 bg-slate-50 rounded-3xl p-6 sm:p-7 border border-slate-200 flex flex-col justify-between">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="w-full sm:w-1/2 aspect-video sm:aspect-auto sm:h-44 rounded-2xl overflow-hidden bg-white border border-slate-200 p-2 flex items-center justify-center shrink-0">
                  <img
                    src="/assets/showcase/lightweight_drone.jpg"
                    alt="Ultra-Light Weight Drone"
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>

                <div className="w-full sm:w-1/2 space-y-1.5">
                  <h3 className="text-xl font-bold text-slate-900">
                    {isHindi ? 'अल्ट्रा-लाइट वजन' : 'Ultra-Light Weight'}
                  </h3>
                  <p className="text-sm text-slate-600">
                    {isHindi
                      ? 'सिर्फ 249 ग्राम — कॉम्पैक्ट और ट्रेवल-रेडी।'
                      : 'At just 249g, compact, portable, and travel-ready.'}
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
