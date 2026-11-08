import React, { useState } from 'react';
import { ServiceCategory, ServiceItem, LanguageMode } from '../types';
import { Search, X, ArrowRight } from 'lucide-react';

interface ServicesCatalogProps {
  categories: ServiceCategory[];
  language: LanguageMode;
  onOpenInquiry: (tab?: 'project' | 'partner', serviceName?: string) => void;
  selectedCategoryId?: string;
}

export const ServicesCatalog: React.FC<ServicesCatalogProps> = ({
  categories,
  language,
  onOpenInquiry,
  selectedCategoryId
}) => {
  const isHindi = language === 'hi';
  const [activeTab, setActiveTab] = useState<string>(
    selectedCategoryId && selectedCategoryId !== 'all' ? selectedCategoryId : categories[0]?.id || 'photogrammetry-data-processing'
  );
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalService, setActiveModalService] = useState<{
    service: ServiceItem;
    category: ServiceCategory;
  } | null>(null);

  const filteredCategories = categories
    .map((cat) => {
      const matchesCategory = activeTab === 'all' || cat.id === activeTab;
      if (!matchesCategory) return null;

      const filteredItems = cat.items.filter(
        (item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );

      if (searchQuery && filteredItems.length === 0) return null;

      return {
        ...cat,
        items: searchQuery ? filteredItems : cat.items
      };
    })
    .filter(Boolean) as ServiceCategory[];

  return (
    <section id="services" className="py-16 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">
              {isHindi ? 'कैटलॉग' : 'Master Catalogue'}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight mt-1.5">
              {isHindi ? 'सेवा निर्देशिका' : 'Services Directory'}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 font-normal">
              {isHindi
                ? '60+ विशिष्ट ड्रोन, GIS, AI और 3D तकनीकी समाधान।'
                : 'Explore our full spectrum of drone data processing, GIS, AI, and 3D capabilities.'}
            </p>
          </div>

          {/* Clean Search Input */}
          <div className="relative w-full md:w-64 shrink-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isHindi ? 'सेवा खोजें...' : 'Search services...'}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-sky-500"
            />
          </div>
        </div>

        {/* Minimal Category Tabs */}
        <div className="mt-6 flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none text-xs">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
              activeTab === 'all'
                ? 'bg-slate-950 text-white font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            All Services
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
                activeTab === cat.id
                  ? 'bg-slate-950 text-white font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>

        {/* Simplified Services Grid */}
        <div className="mt-8 space-y-8">
          {filteredCategories.map((cat) => (
            <div key={cat.id}>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3">
                {cat.title}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {cat.items.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => setActiveModalService({ service: item, category: cat })}
                    className="p-5 rounded-2xl border border-slate-200 hover:border-orange-400 bg-white shadow-2xs hover:shadow-xs cursor-pointer transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
                        {item.name}
                      </h4>
                      <p className="mt-1.5 text-xs text-slate-600 leading-relaxed font-normal">
                        {item.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="text-orange-600 font-semibold group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-1">
                        <span>View specifications</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenInquiry('project', item.name);
                        }}
                        className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-[11px] transition-colors"
                      >
                        Request
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Clean Detail Modal */}
      {activeModalService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-2xs">
          <div className="bg-white rounded-2xl border border-slate-200 max-w-lg w-full shadow-xl p-6 animate-in fade-in">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-xs text-sky-700 font-medium">
                  {activeModalService.category.title}
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                  {activeModalService.service.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveModalService(null)}
                className="text-slate-400 hover:text-slate-700 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-4 space-y-4 text-xs">
              <div>
                <span className="font-bold text-slate-900 block mb-1">Scope & Methodology:</span>
                <p className="text-slate-600 leading-relaxed font-normal">
                  {activeModalService.service.description} Deliverables are processed through cluster photogrammetry with RTK/PPK ground control validation and georeferenced to standard coordinate frames (WGS 84 / UTM).
                </p>
              </div>

              <div>
                <span className="font-bold text-slate-900 block mb-1">Standard Output Formats:</span>
                <p className="text-slate-600 font-normal">
                  GeoTIFF (.tif), Dense Point Cloud (.LAS/.LAZ), Vector Contours (.DXF/.SHP), Certified QA/QC Report (PDF).
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setActiveModalService(null)}
                className="text-xs text-slate-500 hover:text-slate-800"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  const sName = activeModalService.service.name;
                  setActiveModalService(null);
                  onOpenInquiry('project', sName);
                }}
                className="px-4 py-2 text-xs font-semibold text-white bg-slate-950 hover:bg-sky-600 rounded-lg transition-colors flex items-center gap-1.5"
              >
                <span>Request Service</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
