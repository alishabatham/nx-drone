import React, { useState, useEffect } from 'react';
import { useAdmin } from '../context/AdminContext';
import { X, Check, Edit, Image as ImageIcon } from 'lucide-react';

export const SectionEditModal: React.FC = () => {
  const { activeEditingSection, setActiveEditingSection, siteContent, updateSiteContent } = useAdmin();
  
  // Local edit states
  const [heroState, setHeroState] = useState(siteContent.hero);
  const [pillarsState, setPillarsState] = useState(siteContent.pillars);
  const [partnerState, setPartnerState] = useState(siteContent.partner);

  useEffect(() => {
    if (activeEditingSection === 'hero') setHeroState(siteContent.hero);
    if (activeEditingSection === 'pillars') setPillarsState(siteContent.pillars);
    if (activeEditingSection === 'partner') setPartnerState(siteContent.partner);
  }, [activeEditingSection, siteContent]);

  if (!activeEditingSection) return null;

  const handleSave = () => {
    updateSiteContent((prev) => {
      if (activeEditingSection === 'hero') {
        return { ...prev, hero: heroState };
      }
      if (activeEditingSection === 'pillars') {
        return { ...prev, pillars: pillarsState };
      }
      if (activeEditingSection === 'partner') {
        return { ...prev, partner: partnerState };
      }
      return prev;
    });
    setActiveEditingSection(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
              <Edit className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 capitalize">
                Edit {activeEditingSection} Content
              </h3>
              <p className="text-xs text-slate-500">
                Changes will reflect live across the entire website immediately.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setActiveEditingSection(null)}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ========================================= */}
        {/* HERO SECTION EDITING FORM                 */}
        {/* ========================================= */}
        {activeEditingSection === 'hero' && (
          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold uppercase tracking-wider text-slate-700 mb-1">
                Kicker / Category Tag
              </label>
              <input
                type="text"
                value={heroState.kicker}
                onChange={(e) => setHeroState({ ...heroState, kicker: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block font-semibold uppercase tracking-wider text-slate-700 mb-1">
                Main Headline
              </label>
              <textarea
                rows={2}
                value={heroState.title}
                onChange={(e) => setHeroState({ ...heroState, title: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block font-semibold uppercase tracking-wider text-slate-700 mb-1">
                Subtitle Description
              </label>
              <textarea
                rows={3}
                value={heroState.subtitle}
                onChange={(e) => setHeroState({ ...heroState, subtitle: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-orange-500"
              />
            </div>

            <div className="grid grid-cols-3 gap-3 pt-2">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">GSD Stat</label>
                <input
                  type="text"
                  value={heroState.statGsd}
                  onChange={(e) => setHeroState({ ...heroState, statGsd: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-xs font-mono"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">RMSE Stat</label>
                <input
                  type="text"
                  value={heroState.statRmse}
                  onChange={(e) => setHeroState({ ...heroState, statRmse: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-xs font-mono"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">SLA Stat</label>
                <input
                  type="text"
                  value={heroState.statSla}
                  onChange={(e) => setHeroState({ ...heroState, statSla: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-xs font-mono"
                />
              </div>
            </div>
          </div>
        )}

        {/* ========================================= */}
        {/* 3 PILLARS EDITING FORM                    */}
        {/* ========================================= */}
        {activeEditingSection === 'pillars' && (
          <div className="space-y-6 text-xs">
            {pillarsState.map((pillar, idx) => (
              <div key={pillar.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/70 space-y-3">
                <div className="font-bold text-slate-900 text-sm">
                  Pillar 0{idx + 1}
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Title</label>
                  <input
                    type="text"
                    value={pillar.title}
                    onChange={(e) => {
                      const updated = [...pillarsState];
                      updated[idx].title = e.target.value;
                      setPillarsState(updated);
                    }}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-semibold"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Image URL / Path</label>
                  <input
                    type="text"
                    value={pillar.image}
                    onChange={(e) => {
                      const updated = [...pillarsState];
                      updated[idx].image = e.target.value;
                      setPillarsState(updated);
                    }}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-mono"
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ========================================= */}
        {/* PARTNER SECTION EDITING FORM              */}
        {/* ========================================= */}
        {activeEditingSection === 'partner' && (
          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold uppercase tracking-wider text-slate-700 mb-1">
                Headline
              </label>
              <input
                type="text"
                value={partnerState.title}
                onChange={(e) => setPartnerState({ ...partnerState, title: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs"
              />
            </div>

            <div>
              <label className="block font-semibold uppercase tracking-wider text-slate-700 mb-1">
                Description
              </label>
              <textarea
                rows={2}
                value={partnerState.desc}
                onChange={(e) => setPartnerState({ ...partnerState, desc: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <span className="font-bold text-slate-900">Partner Track 01</span>
                <input
                  type="text"
                  value={partnerState.track1Title}
                  onChange={(e) => setPartnerState({ ...partnerState, track1Title: e.target.value })}
                  placeholder="Track 1 Title"
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs"
                />
                <input
                  type="text"
                  value={partnerState.track1Sub}
                  onChange={(e) => setPartnerState({ ...partnerState, track1Sub: e.target.value })}
                  placeholder="Track 1 Subtitle"
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs"
                />
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <span className="font-bold text-slate-900">Partner Track 02</span>
                <input
                  type="text"
                  value={partnerState.track2Title}
                  onChange={(e) => setPartnerState({ ...partnerState, track2Title: e.target.value })}
                  placeholder="Track 2 Title"
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs"
                />
                <input
                  type="text"
                  value={partnerState.track2Sub}
                  onChange={(e) => setPartnerState({ ...partnerState, track2Sub: e.target.value })}
                  placeholder="Track 2 Subtitle"
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs"
                />
              </div>
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => setActiveEditingSection(null)}
            className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <Check className="w-4 h-4" />
            <span>Save & Update Website</span>
          </button>
        </div>

      </div>
    </div>
  );
};

