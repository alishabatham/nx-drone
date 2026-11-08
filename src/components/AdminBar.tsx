import React, { useState, useEffect } from 'react';
import { useAdmin } from '../context/AdminContext';
import { Edit3, Users, LogOut, RotateCcw, Check, RefreshCw, Database } from 'lucide-react';

export const AdminBar: React.FC = () => {
  const { isAdmin, isEditMode, setIsEditMode, setIsCrmOpen, resetToDefault, logout, saveStatus } = useAdmin();
  const [inquiryCount, setInquiryCount] = useState<number>(0);

  useEffect(() => {
    if (!isAdmin) return;
    const fetchCount = async () => {
      try {
        const res = await fetch('/api/inquiries');
        if (res.ok) {
          const json = await res.json();
          setInquiryCount(json.data?.length || 0);
        }
      } catch (e) {
        // ignore
      }
    };
    fetchCount();
  }, [isAdmin]);

  if (!isAdmin) return null;

  return (
    <div className="sticky top-0 z-50 bg-slate-900 text-white border-b border-slate-800 shadow-md px-3 sm:px-4 py-2 text-xs">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2.5">
        
        {/* Left: Status badge & DB sync state */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-[10px] sm:text-[11px] font-semibold border border-emerald-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Admin Active</span>
          </div>

          {/* MongoDB Sync Indicator */}
          {saveStatus === 'saving' && (
            <div className="flex items-center gap-1 text-[11px] text-amber-300 font-mono animate-pulse">
              <RefreshCw className="w-3 h-3 animate-spin" />
              <span>Saving to MongoDB...</span>
            </div>
          )}
          {saveStatus === 'saved' && (
            <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
              <Database className="w-3 h-3" />
              <span>Saved to MongoDB Atlas ✓</span>
            </div>
          )}
          {saveStatus === 'idle' && (
            <span className="hidden md:inline text-slate-400 text-[11px]">
              Direct click to edit in place. Changes auto-save to MongoDB.
            </span>
          )}
        </div>

        {/* Right: Action Buttons (Responsive flex wrap) */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Edit Mode Toggle */}
          <button
            type="button"
            onClick={() => setIsEditMode(!isEditMode)}
            className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-colors text-[11px] sm:text-xs ${
              isEditMode
                ? 'bg-orange-500 text-white'
                : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700'
            }`}
          >
            <Edit3 className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
            <span>{isEditMode ? 'Edit Mode: ON' : 'Edit Mode: OFF'}</span>
          </button>

          {/* CRM Leads Button */}
          <button
            type="button"
            onClick={() => setIsCrmOpen(true)}
            className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-semibold flex items-center gap-1.5 transition-colors text-[11px] sm:text-xs"
          >
            <Users className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-sky-400" />
            <span>CRM Leads</span>
            {inquiryCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-orange-500 text-white text-[9px] sm:text-[10px] font-bold">
                {inquiryCount}
              </span>
            )}
          </button>

          {/* Reset Content to defaults */}
          <button
            type="button"
            onClick={resetToDefault}
            className="p-1 sm:p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            title="Reset to default content in MongoDB"
          >
            <RotateCcw className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
          </button>

          {/* Logout */}
          <button
            type="button"
            onClick={logout}
            className="px-2 py-1 rounded-lg bg-red-600/20 text-red-300 hover:bg-red-600 hover:text-white font-semibold flex items-center gap-1 transition-colors text-[10px] sm:text-[11px]"
          >
            <LogOut className="w-3 h-3" />
            <span>Exit</span>
          </button>
        </div>

      </div>
    </div>
  );
};

