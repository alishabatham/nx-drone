import React, { useState, useEffect } from 'react';
import { useAdmin } from '../context/AdminContext';
import { InquiryRecord } from '../types';
import { 
  X, 
  Users, 
  Search, 
  Download, 
  Trash2, 
  Phone, 
  Mail, 
  Building2, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Filter,
  RefreshCw,
  ExternalLink
} from 'lucide-react';

export const AdminCRMModal: React.FC = () => {
  const { isCrmOpen, setIsCrmOpen } = useAdmin();
  const [inquiries, setInquiries] = useState<InquiryRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'project' | 'partner'>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedInquiry, setSelectedInquiry] = useState<InquiryRecord | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

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
    if (isCrmOpen) {
      fetchInquiries();
    }
  }, [isCrmOpen]);

  if (!isCrmOpen) return null;

  const handleStatusChange = async (id: string, newStatus: string) => {
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
        if (selectedInquiry && selectedInquiry.id === id) {
          setSelectedInquiry((prev) => (prev ? { ...prev, status: newStatus as any } : null));
        }
        setFeedback(`Status updated to "${newStatus}"`);
        setTimeout(() => setFeedback(null), 3000);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this inquiry record from CRM?')) return;
    try {
      const res = await fetch(`/api/inquiries/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setInquiries((prev) => prev.filter((i) => i.id !== id));
        if (selectedInquiry?.id === id) setSelectedInquiry(null);
        setFeedback('Record deleted');
        setTimeout(() => setFeedback(null), 3000);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleExportCSV = () => {
    if (inquiries.length === 0) return;
    const headers = [
      'Reference ID',
      'Type',
      'Name',
      'Company',
      'Email',
      'Phone',
      'Industry',
      'Required Service',
      'Project Area',
      'Timeline',
      'Status',
      'Submission Date',
    ];
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
      `"${i.expectedTimeline}"`,
      i.status,
      i.createdAt,
    ]);
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `NX_Drone_Leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredInquiries = inquiries.filter((inq) => {
    const matchesType = typeFilter === 'all' || inq.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || inq.status === statusFilter;
    const q = searchQuery.toLowerCase();
    const matchesQuery =
      !q ||
      inq.fullName.toLowerCase().includes(q) ||
      inq.companyName.toLowerCase().includes(q) ||
      inq.email.toLowerCase().includes(q) ||
      inq.phone.toLowerCase().includes(q) ||
      inq.requiredService.toLowerCase().includes(q) ||
      inq.referenceId.toLowerCase().includes(q);

    return matchesType && matchesStatus && matchesQuery;
  });

  const statusColors: Record<string, string> = {
    'New': 'bg-blue-50 text-blue-700 border-blue-200',
    'Technical Assessment': 'bg-amber-50 text-amber-700 border-amber-200',
    'Scope Finalized': 'bg-purple-50 text-purple-700 border-purple-200',
    'In Progress': 'bg-sky-50 text-sky-700 border-sky-200',
    'Completed': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-6xl h-[90vh] bg-white rounded-3xl border border-slate-200 shadow-2xl flex flex-col overflow-hidden">
        
        {/* CRM Top Header */}
        <div className="p-5 sm:p-6 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4 bg-slate-50/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center shadow-xs">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <span>NX CRM & Lead Pipeline</span>
                <span className="px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 text-xs font-mono font-semibold">
                  {filteredInquiries.length} Leads
                </span>
              </h2>
              <p className="text-xs text-slate-500 font-normal">
                Direct inquiries and partner proposals submitted via the website.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={fetchInquiries}
              disabled={isLoading}
              className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition-colors"
              title="Refresh leads"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-orange-500' : ''}`} />
            </button>

            <button
              type="button"
              onClick={handleExportCSV}
              className="px-3 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-800 flex items-center gap-1.5 transition-colors shadow-2xs"
            >
              <Download className="w-3.5 h-3.5 text-orange-500" />
              <span>Export CSV</span>
            </button>

            <button
              type="button"
              onClick={() => setIsCrmOpen(false)}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Close CRM"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-4 border-b border-slate-200 bg-white flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Search */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, company, service..."
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-orange-500 text-xs"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Type Filter */}
            <div className="flex items-center rounded-xl border border-slate-200 p-0.5 bg-slate-50">
              <button
                type="button"
                onClick={() => setTypeFilter('all')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                  typeFilter === 'all' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                All
              </button>
              <button
                type="button"
                onClick={() => setTypeFilter('project')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                  typeFilter === 'project' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Projects
              </button>
              <button
                type="button"
                onClick={() => setTypeFilter('partner')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                  typeFilter === 'partner' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Partners
              </button>
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-700 font-medium focus:outline-hidden"
            >
              <option value="all">All Statuses</option>
              <option value="New">New</option>
              <option value="Technical Assessment">Technical Assessment</option>
              <option value="Scope Finalized">Scope Finalized</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>

        {feedback && (
          <div className="px-5 py-2 bg-emerald-50 text-emerald-800 text-xs border-b border-emerald-200 flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>{feedback}</span>
          </div>
        )}

        {/* CRM Content Split: List & Detail (Responsive for mobile & desktop) */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden bg-slate-100/60">
          
          {/* Leads List: Hidden on mobile when a lead is selected */}
          <div className={`${selectedInquiry ? 'hidden md:block' : 'block'} w-full md:w-1/2 lg:w-5/12 overflow-y-auto p-4 space-y-3 border-r border-slate-200 bg-white`}>
            {filteredInquiries.length === 0 ? (
              <div className="text-center py-12 text-slate-400 text-xs">
                No matching inquiries found in MongoDB.
              </div>
            ) : (
              filteredInquiries.map((inq) => {
                const isSelected = selectedInquiry?.id === inq.id || selectedInquiry?.referenceId === inq.referenceId;
                const statusColor = statusColors[inq.status] || 'bg-slate-100 text-slate-700 border-slate-200';

                return (
                  <div
                    key={inq.referenceId || inq.id}
                    onClick={() => setSelectedInquiry(inq)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-orange-500 bg-orange-50/20 shadow-xs ring-1 ring-orange-500/20'
                        : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-2xs'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <span className="text-[10px] font-mono font-bold text-slate-400 block">
                          {inq.referenceId}
                        </span>
                        <h4 className="text-sm font-bold text-slate-900 leading-snug">
                          {inq.fullName}
                        </h4>
                        <div className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                          <Building2 className="w-3 h-3 text-slate-400" />
                          <span>{inq.companyName}</span>
                        </div>
                      </div>

                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border ${statusColor}`}>
                        {inq.status}
                      </span>
                    </div>

                    <div className="text-xs text-slate-600 mt-2 font-medium bg-slate-50 p-2 rounded-lg line-clamp-1 border border-slate-100">
                      {inq.requiredService}
                    </div>

                    <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-100">
                      <span className="capitalize font-semibold text-slate-600">{inq.type} inquiry</span>
                      <span>{new Date(inq.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Lead Detail View: Visible on mobile when selected, or always on desktop */}
          <div className={`${selectedInquiry ? 'flex' : 'hidden md:flex'} flex-1 flex-col overflow-y-auto p-4 sm:p-6 bg-slate-50/50`}>
            {selectedInquiry ? (
              <div className="space-y-4 sm:space-y-6">
                
                {/* Mobile Back Button */}
                <div className="md:hidden pb-2">
                  <button
                    type="button"
                    onClick={() => setSelectedInquiry(null)}
                    className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 transition-colors flex items-center gap-1"
                  >
                    <span>← Back to all leads</span>
                  </button>
                </div>

                {/* Header Card */}
                <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-2xs">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono font-bold text-orange-600">
                          {selectedInquiry.referenceId}
                        </span>
                        <span className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-semibold uppercase">
                          {selectedInquiry.type}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-slate-900">
                        {selectedInquiry.fullName}
                      </h3>
                      <div className="text-sm text-slate-600 font-medium mt-0.5">
                        {selectedInquiry.companyName}
                      </div>
                    </div>

                    {/* Status Changer */}
                    <div>
                      <label className="block text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-1">
                        Update Status
                      </label>
                      <select
                        value={selectedInquiry.status}
                        onChange={(e) => handleStatusChange((selectedInquiry as any)._id || selectedInquiry.referenceId || selectedInquiry.id, e.target.value)}
                        className="w-full sm:w-auto px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-800 shadow-2xs focus:outline-hidden"
                      >
                        <option value="New">New</option>
                        <option value="Technical Assessment">Technical Assessment</option>
                        <option value="Scope Finalized">Scope Finalized</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </div>
                  </div>

                  {/* Quick Contact Actions */}
                  <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap gap-2.5">
                    <a
                      href={`tel:${selectedInquiry.phone}`}
                      className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-orange-500 text-white font-semibold text-xs transition-colors flex items-center gap-1.5"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Call {selectedInquiry.phone}</span>
                    </a>
                    <a
                      href={`mailto:${selectedInquiry.email}?subject=Regarding your inquiry ${selectedInquiry.referenceId}`}
                      className="px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 font-semibold text-xs transition-colors flex items-center gap-1.5"
                    >
                      <Mail className="w-3.5 h-3.5 text-orange-500" />
                      <span>Email</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => handleDelete((selectedInquiry as any)._id || selectedInquiry.referenceId || selectedInquiry.id)}
                      className="px-3.5 py-2 rounded-xl border border-red-200 bg-red-50 hover:bg-red-100 text-red-700 font-semibold text-xs transition-colors sm:ml-auto flex items-center gap-1.5"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>

                {/* Scope & Specifications */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Project & Technical Specifications
                  </h4>

                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-slate-400 block text-[11px]">Required Service</span>
                      <span className="font-semibold text-slate-900">{selectedInquiry.requiredService}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Industry Sector</span>
                      <span className="font-semibold text-slate-900">{selectedInquiry.industry}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Project Location</span>
                      <span className="font-semibold text-slate-900">{selectedInquiry.projectLocation}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Project Area / Coverage</span>
                      <span className="font-semibold text-slate-900">{selectedInquiry.projectArea}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Expected Timeline</span>
                      <span className="font-semibold text-slate-900">{selectedInquiry.expectedTimeline}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Date Submitted</span>
                      <span className="font-semibold text-slate-900">{new Date(selectedInquiry.createdAt).toLocaleString()}</span>
                    </div>
                  </div>

                  {selectedInquiry.additionalDetails && (
                    <div className="pt-3 border-t border-slate-100">
                      <span className="text-slate-400 block text-[11px] mb-1">Client Brief / Requirements</span>
                      <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100 leading-relaxed font-normal">
                        {selectedInquiry.additionalDetails}
                      </p>
                    </div>
                  )}
                </div>

              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-8 text-slate-400">
                <Users className="w-12 h-12 stroke-1 mb-2 text-slate-300" />
                <p className="text-sm font-semibold text-slate-600">Select an inquiry from the list</p>
                <p className="text-xs text-slate-400">Click any lead on the left to view complete client and technical brief.</p>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};

