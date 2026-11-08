import React from 'react';
import { TECH_STACK } from '../data/content';
import { LanguageMode } from '../types';

interface TechnologyMatrixProps {
  language: LanguageMode;
}

export const TechnologyMatrix: React.FC<TechnologyMatrixProps> = ({ language }) => {
  const isHindi = language === 'hi';

  return (
    <section id="technology" className="py-16 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">
            {isHindi ? 'तकनीक' : 'Infrastructure'}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight mt-1.5">
            {isHindi ? 'तकनीकी स्टैक' : 'Technology Stack'}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600 font-normal">
            {isHindi
              ? 'उत्पादन में सक्रिय ओपन-सोर्स और एंटरप्राइज़ जियोस्पेशियल टूल्स।'
              : 'Production geospatial engines, machine learning frameworks, and spatial databases.'}
          </p>
        </div>

        {/* Clean Tech Groups Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {TECH_STACK.map((group, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl bg-slate-50 border border-slate-200"
            >
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {group.tools.map((tool, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-2.5 py-1 rounded-md text-xs font-mono font-medium bg-white border border-slate-200 text-slate-800"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
