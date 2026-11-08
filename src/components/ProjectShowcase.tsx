import React, { useState } from 'react';
import { ShowcaseProject, LanguageMode } from '../types';
import { Calculator, ArrowRight, Sparkles } from 'lucide-react';

const ORTHO_IMG = '/src/assets/images/nx_orthomosaic_satellite_1794131160697.jpg';
const DRONE_FIELD_IMG = '/src/assets/images/nx_drone_survey_field_1794131161097.jpg';
const DIGITAL_TWIN_IMG = '/src/assets/images/nx_digital_twin_3d_1794131161441.jpg';
const THERMAL_SCAN_IMG = '/src/assets/images/nx_solar_thermal_inspection_1794131161902.jpg';

interface ProjectShowcaseProps {
  projects: ShowcaseProject[];
  language: LanguageMode;
  onOpenInquiry: (tab?: 'project' | 'partner') => void;
}

export const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({ projects, language, onOpenInquiry }) => {
  const isHindi = language === 'hi';
  const [selectedProjectId, setSelectedProjectId] = useState<string>(projects[0]?.id || 'proj-1');

  // Interactive Live Stockpile Calculator state
  const [calcArea, setCalcArea] = useState<number>(2400); // sqm
  const [calcHeight, setCalcHeight] = useState<number>(6.5); // meters
  const [calcMaterial, setCalcMaterial] = useState<string>('bauxite');
  const [calcDensity, setCalcDensity] = useState<number>(1.85); // t/cu.m
  const [calcResult, setCalcResult] = useState<{
    cutVolume: number;
    tonnage: number;
  }>({
    cutVolume: 8686,
    tonnage: 16069
  });
  const [isCalculating, setIsCalculating] = useState<boolean>(false);

  const selectedProject = projects.find((p) => p.id === selectedProjectId) || projects[0];

  const handleCalculate = async () => {
    setIsCalculating(true);
    try {
      const res = await fetch('/api/volume-calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          footprintAreaSqm: calcArea,
          averageHeightM: calcHeight,
          baseElevationM: 320,
          materialType: calcMaterial
        })
      });
      if (res.ok) {
        const json = await res.json();
        setCalcResult({
          cutVolume: json.results.cutVolumeCuM,
          tonnage: json.results.totalMetricTonnes
        });
      } else {
        const gross = Math.round(calcArea * calcHeight * 0.58);
        setCalcResult({
          cutVolume: Math.round(gross * 0.96),
          tonnage: Math.round(gross * 0.96 * calcDensity)
        });
      }
    } catch {
      const gross = Math.round(calcArea * calcHeight * 0.58);
      setCalcResult({
        cutVolume: Math.round(gross * 0.96),
        tonnage: Math.round(gross * 0.96 * calcDensity)
      });
    } finally {
      setIsCalculating(false);
    }
  };

  const getProjectImage = (id: string) => {
    switch (id) {
      case 'proj-1': return DRONE_FIELD_IMG;
      case 'proj-2': return THERMAL_SCAN_IMG;
      case 'proj-3': return ORTHO_IMG;
      case 'proj-4': return DIGITAL_TWIN_IMG;
      default: return ORTHO_IMG;
    }
  };

  return (
    <section id="projects" className="py-16 sm:py-20 bg-slate-50/50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">
              {isHindi ? 'प्रमाण' : 'Case Studies'}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight mt-1.5">
              {isHindi ? 'तकनीकी प्रदर्शन और प्रोजेक्ट्स' : 'Technical Demonstrations'}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 font-normal">
              {isHindi
                ? 'सत्यापित कार्यप्रणाली, वास्तविक आउटपुट और सटीकता सहिष्णुता (Tolerances)।'
                : 'Real sample outputs, verified sensor parameters, and calibrated checkpoint accuracy.'}
            </p>
          </div>
        </div>

        {/* Minimal Project Tabs */}
        <div className="mt-8 flex flex-wrap gap-2 border-b border-slate-200 pb-3">
          {projects.map((proj) => (
            <button
              key={proj.id}
              onClick={() => setSelectedProjectId(proj.id)}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors ${
                selectedProjectId === proj.id
                  ? 'bg-slate-950 text-white'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              {proj.title}
            </button>
          ))}
        </div>

        {/* Project Card */}
        {selectedProject && (
          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Clean Case Study Summary */}
            <div className="lg:col-span-7 space-y-5">
              <div>
                <span className="text-xs font-semibold text-sky-700 uppercase tracking-wider">
                  {selectedProject.industry} · GSD {selectedProject.accuracyGsd}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                  {selectedProject.title}
                </h3>
              </div>

              <div>
                <span className="text-xs font-bold text-slate-900 block mb-1">Challenge & Solution:</span>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {selectedProject.problem} {selectedProject.workPerformed}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100">
                <span className="text-xs font-bold text-slate-900 block mb-2">Deliverables:</span>
                <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-600 font-normal">
                  {selectedProject.finalDeliverables.map((del, i) => (
                    <span key={i}>
                      {del}{i < selectedProject.finalDeliverables.length - 1 ? ' ·' : ''}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm">
                <span className="font-bold text-slate-900 block mb-0.5">Verified Result:</span>
                <p className="text-slate-700 font-normal">{selectedProject.verifiedResults}</p>
              </div>
            </div>

            {/* Right: Visual + Compact Calculator */}
            <div className="lg:col-span-5 space-y-4">
              <div className="rounded-xl overflow-hidden border border-slate-200 h-56 sm:h-64 bg-slate-900">
                <img
                  src={getProjectImage(selectedProject.id)}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Compact Volume Calculator */}
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 text-xs">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5 font-bold text-slate-900">
                    <Calculator className="w-4 h-4 text-sky-600" />
                    <span>Volumetric Estimator</span>
                  </div>
                  <span className="text-[11px] text-slate-500 font-mono">Algorithm Demo</span>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <label className="text-[11px] text-slate-600 block">Footprint: {calcArea} m²</label>
                    <input
                      type="range"
                      min="500"
                      max="6000"
                      step="100"
                      value={calcArea}
                      onChange={(e) => setCalcArea(Number(e.target.value))}
                      className="w-full accent-sky-600 cursor-pointer mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-600 block">Height: {calcHeight} m</label>
                    <input
                      type="range"
                      min="2"
                      max="15"
                      step="0.5"
                      value={calcHeight}
                      onChange={(e) => setCalcHeight(Number(e.target.value))}
                      className="w-full accent-sky-600 cursor-pointer mt-1"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-200/80">
                  <div className="font-mono text-xs">
                    <span className="text-slate-500">Volume: </span>
                    <span className="font-bold text-slate-900">{calcResult.cutVolume.toLocaleString()} m³</span>
                    <span className="text-slate-400 mx-1.5">|</span>
                    <span className="text-slate-500">Tonnage: </span>
                    <span className="font-bold text-sky-700">{calcResult.tonnage.toLocaleString()} MT</span>
                  </div>

                  <button
                    type="button"
                    onClick={handleCalculate}
                    disabled={isCalculating}
                    className="px-2.5 py-1 text-[11px] font-semibold text-white bg-slate-950 hover:bg-sky-600 rounded-md transition-colors"
                  >
                    {isCalculating ? 'Computing...' : 'Recalculate'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
