import React, { useState, useEffect } from 'react';
import { InquiryRecord, ShowcaseProject } from '../types';
import { X, ShieldCheck, Download, Trash2, CheckCircle2, Clock, FileSpreadsheet, RefreshCw, PlusCircle, AlertCircle } from 'lucide-react';

interface AdminCMSProps {
  isOpen: boolean;
  onClose: () => void;
  onRefreshData?: () => void;
}

export const AdminCMS: React.FC<AdminCMSProps> = ({ isOpen, onClose, onRefreshData }) => {
  const [activeTab, setActiveTab] = useState<'leads' | 'projects' | 'system'>('leads');
  const [inquiries, setInquiries] = useState<InquiryRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [feedback, setFeedback] = useState<string | null>(null);

  // New Project Form State
  const [newTitle, setNewTitle] = useState('');
  const [newIndustry, setNewIndustry] = useState('Mining & Minerals');
  const [newProblem, setNewProblem] = useState('');
  const [newResults, setNewResults] = useState('');

  const fetchInquiries = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/inquiries');
      if (res.ok) {
        const json = await res.json();
        setInquiries(json.data || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchInquiries();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/inquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setInquiries((prev) =>
          prev.map((item) => (item.id === id ? { ...item, status: newStatus as any } : item))
        );
        setFeedback(`Inquiry status updated to "${newStatus}"`);
        setTimeout(() => setFeedback(null), 3000);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteInquiry = async (id: string) => {
    if (!window.confirm('Delete this inquiry record?')) return;
    try {
      const res = await fetch(`/api/inquiries/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setInquiries((prev) => prev.filter((i) => i.id !== id));
        setFeedback('Record deleted');
        setTimeout(() => setFeedback(null), 3000);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleExportCSV = () => {
    if (inquiries.length === 0) return;
    const headers = ['Reference ID', 'Type', 'Name', 'Company', 'Email', 'Phone', 'Industry', 'Service', 'Area', 'Status', 'Date'];
    const rows = inquiries.map((i) => [
      i.referenceId,
      i.type,
      `"${i.fullName}"`,
      `"${i.companyName}"`,
      i.email,
      `"${i.phone}"`,
      `"${i.industry}"`,
      `"${i.requiredService}"`,
      `"${i.projectArea}"`,
      i.status,
      i.createdAt
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `NX_Drone_Inquiries_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredInquiries = inquiries.filter((inq) => {
    if (statusFilter === 'all') return true;
    return inq.status === statusFilter;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-xs">
      <div className="bg-white rounded-2xl border border-slate-200 max-w-5xl w-full h-[88vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in duration-150">
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-slate-950 text-white flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900">
                  NX Aerial · Central Admin CMS
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-100 text-sky-800 font-semibold">
                  Live Operations
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Manage incoming client requirements, B2B partner applications, and system catalogs.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchInquiries}
              className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              title="Refresh Inquiries"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6 pt-3 border-b border-slate-200 flex items-center justify-between bg-white text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('leads')}
              className={`pb-2.5 px-3 font-semibold border-b-2 transition-colors ${
                activeTab === 'leads'
                  ? 'border-sky-600 text-sky-700'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              Inquiries & Leads ({inquiries.length})
            </button>
            <button
              onClick={() => setActiveTab('projects')}
              className={`pb-2.5 px-3 font-semibold border-b-2 transition-colors ${
                activeTab === 'projects'
                  ? 'border-sky-600 text-sky-700'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              Add Project Case Study
            </button>
            <button
              onClick={() => setActiveTab('system')}
              className={`pb-2.5 px-3 font-semibold border-b-2 transition-colors ${
                activeTab === 'system'
                  ? 'border-sky-600 text-sky-700'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              System Statistics & Health
            </button>
          </div>

          {activeTab === 'leads' && (
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-1.5 pb-2 text-slate-700 hover:text-sky-700 font-medium"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
          )}
        </div>

        {feedback && (
          <div className="px-6 py-2 bg-emerald-50 text-emerald-800 text-xs font-medium border-b border-emerald-200">
            {feedback}
          </div>
        )}

        {/* Tab 1: Leads & Inquiries Table */}
        {activeTab === 'leads' && (
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {/* Filter toolbar */}
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="text-slate-500">Filter Status:</span>
                {['all', 'New', 'Technical Assessment', 'Scope Finalized', 'In Progress', 'Completed'].map((s) => (
                  <button
                    key={s}
                    onClick={() => setStatusFilter(s)}
                    className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                      statusFilter === s ? 'bg-slate-900 text-white font-semibold' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
              <span className="text-slate-400 font-mono text-[11px]">
                Showing {filteredInquiries.length} records
              </span>
            </div>

            {/* Inquiries Table */}
            <div className="rounded-xl border border-slate-200 overflow-x-auto bg-white shadow-2xs">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 font-mono text-[11px] border-b border-slate-200 uppercase tracking-wider">
                  <tr>
                    <th className="py-2.5 px-3">Ref ID</th>
                    <th className="py-2.5 px-3">Type</th>
                    <th className="py-2.5 px-3">Contact</th>
                    <th className="py-2.5 px-3">Industry & Service</th>
                    <th className="py-2.5 px-3">Location / Area</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredInquiries.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-slate-400">
                        No inquiries recorded in this category yet.
                      </td>
                    </tr>
                  ) : (
                    filteredInquiries.map((inq) => (
                      <tr key={inq.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3 px-3 font-mono font-bold text-sky-700 whitespace-nowrap">
                          {inq.referenceId}
                        </td>
                        <td className="py-3 px-3 whitespace-nowrap">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                              inq.type === 'partner'
                                ? 'bg-purple-100 text-purple-800'
                                : 'bg-blue-100 text-blue-800'
                            }`}
                          >
                            {inq.type}
                          </span>
                        </td>
                        <td className="py-3 px-3">
                          <div className="font-bold text-slate-900">{inq.fullName}</div>
                          <div className="text-slate-500 text-[11px]">{inq.companyName}</div>
                          <div className="text-slate-400 font-mono text-[10px]">{inq.email} · {inq.phone}</div>
                        </td>
                        <td className="py-3 px-3">
                          <div className="font-semibold text-slate-800">{inq.industry}</div>
                          <div className="text-slate-500 text-[11px]">{inq.requiredService}</div>
                        </td>
                        <td className="py-3 px-3">
                          <div className="text-slate-700">{inq.projectLocation}</div>
                          <div className="text-slate-400 font-mono text-[10px]">{inq.projectArea}</div>
                        </td>
                        <td className="py-3 px-3 whitespace-nowrap">
                          <select
                            value={inq.status}
                            onChange={(e) => handleStatusUpdate(inq.id, e.target.value)}
                            className="text-[11px] font-medium p-1 rounded border border-slate-200 bg-white"
                          >
                            <option value="New">New</option>
                            <option value="Technical Assessment">Technical Assessment</option>
                            <option value="Scope Finalized">Scope Finalized</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                          </select>
                        </td>
                        <td className="py-3 px-3 text-right whitespace-nowrap">
                          <button
                            type="button"
                            onClick={() => handleDeleteInquiry(inq.id)}
                            className="p-1 rounded text-slate-400 hover:text-red-600 hover:bg-red-50"
                            title="Delete Record"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Add Project Showcase */}
        {activeTab === 'projects' && (
          <div className="flex-1 overflow-y-auto p-6 space-y-4 max-w-2xl">
            <h4 className="text-sm font-bold text-slate-900">
              Publish New Showcase Demonstration Project
            </h4>
            <p className="text-xs text-slate-500">
              Add technical demonstrations to the public showcase without writing code.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setFeedback('Demo project logged into preview cache.');
                setTimeout(() => setFeedback(null), 3000);
              }}
              className="space-y-4 text-xs"
            >
              <div>
                <label className="font-bold text-slate-700 block mb-1">Project Title</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. 100Ha Greenfield Quarry Benchmark"
                  className="w-full p-2 rounded-lg border border-slate-200 bg-white"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Industry</label>
                <select
                  value={newIndustry}
                  onChange={(e) => setNewIndustry(e.target.value)}
                  className="w-full p-2 rounded-lg border border-slate-200 bg-white"
                >
                  <option value="Mining & Minerals">Mining & Minerals</option>
                  <option value="Solar & Renewable Energy">Solar & Renewable Energy</option>
                  <option value="Roads & Highways">Roads & Highways</option>
                  <option value="Smart Cities & Urban Development">Smart Cities & Urban Development</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Operational Problem</label>
                <textarea
                  rows={2}
                  value={newProblem}
                  onChange={(e) => setNewProblem(e.target.value)}
                  placeholder="Describe the operational challenge..."
                  className="w-full p-2 rounded-lg border border-slate-200 bg-white"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Verified Results & Accuracy</label>
                <input
                  type="text"
                  value={newResults}
                  onChange={(e) => setNewResults(e.target.value)}
                  placeholder="e.g. ±1.4% volumetric variance, 2cm RMSEz"
                  className="w-full p-2 rounded-lg border border-slate-200 bg-white"
                />
              </div>

              <button
                type="submit"
                className="px-4 py-2 bg-slate-950 hover:bg-sky-600 text-white font-semibold rounded-lg text-xs"
              >
                Publish Demonstration
              </button>
            </form>
          </div>
        )}

        {/* Tab 3: System Health & Stats */}
        {activeTab === 'system' && (
          <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                <span className="text-slate-400 block text-[11px]">API Service Status</span>
                <span className="text-lg font-bold text-emerald-600">Active & Operational</span>
                <span className="text-[10px] font-mono text-slate-400 block mt-1">REST Engine v2.4.0</span>
              </div>
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                <span className="text-slate-400 block text-[11px]">Active Inquiries</span>
                <span className="text-lg font-bold text-slate-900 font-mono">{inquiries.length} Records</span>
                <span className="text-[10px] font-mono text-slate-400 block mt-1">Real-time sync</span>
              </div>
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                <span className="text-slate-400 block text-[11px]">SLA Response Window</span>
                <span className="text-lg font-bold text-sky-700 font-mono">&lt; 4 Hours</span>
                <span className="text-[10px] font-mono text-slate-400 block mt-1">Technical team dispatch</span>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
              <h5 className="font-bold text-slate-900">Architecture Invariants</h5>
              <p className="text-slate-600">
                Database: In-Memory / Structured JSON Backend API on port 3000.
                <br />
                Frontend: React 19 + TypeScript + Vite + Tailwind CSS v4.
                <br />
                GIS Engine: WebGL / HTML5 Canvas 3D Mesh with OGC 3D Tile compatibility.
              </p>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 text-[11px] text-slate-500 flex justify-between items-center">
          <span>NX Aerial Platform Admin Console</span>
          <button
            onClick={onClose}
            className="px-3 py-1 rounded bg-slate-200 text-slate-700 hover:bg-slate-300 font-medium"
          >
            Exit Console
          </button>
        </div>
      </div>
    </div>
  );
};
