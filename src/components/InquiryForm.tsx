import React, { useState } from 'react';
import { LanguageMode } from '../types';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';

interface InquiryFormProps {
  language: LanguageMode;
  initialTab?: 'project' | 'partner';
  initialServiceName?: string;
  onSuccessSubmitted?: () => void;
}

export const InquiryForm: React.FC<InquiryFormProps> = ({
  language,
  initialTab = 'project',
  initialServiceName = '',
  onSuccessSubmitted,
}) => {
  const isHindi = language === 'hi';
  const [tab, setTab] = useState<'project' | 'partner'>(initialTab);

  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [industry, setIndustry] = useState('Mining & Minerals');
  const [requiredService, setRequiredService] = useState(initialServiceName || 'Drone Data Processing');
  const [additionalDetails, setAdditionalDetails] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [receipt, setReceipt] = useState<{ referenceId: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!fullName.trim() || !email.trim() || !phone.trim()) {
      setErrorMessage('Please provide your name, valid email, and contact phone number.');
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        type: tab,
        fullName,
        companyName: companyName || 'Not specified',
        email,
        phone,
        industry,
        projectLocation: 'Pan-India',
        requiredService,
        dataAvailability: 'requires_flight',
        projectArea: 'Not specified',
        expectedTimeline: 'Standard SLA',
        additionalDetails,
      };

      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Submission failed');

      setReceipt({ referenceId: data.referenceId });
      if (onSuccessSubmitted) onSuccessSubmitted();
    } catch (err: any) {
      setErrorMessage(err.message || 'Error logging inquiry');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-20 bg-slate-50/50 border-b border-slate-200">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">
            {isHindi ? 'संपर्क' : 'Get in Touch'}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight mt-1.5">
            {isHindi ? 'प्रोजेक्ट चर्चा करें' : 'Discuss Your Project'}
          </h2>
          <p className="mt-2 text-sm text-slate-600 font-normal">
            {isHindi
              ? '4 घंटे के भीतर तकनीकी मूल्यांकन और प्रस्ताव प्राप्त करें।'
              : 'Submit your requirement for a technical feasibility assessment within 4 business hours.'}
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="mt-8 flex p-1 bg-slate-200/70 rounded-xl text-xs font-semibold">
          <button
            type="button"
            onClick={() => setTab('project')}
            className={`flex-1 py-2 rounded-lg transition-colors ${
              tab === 'project' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
            }`}
          >
            Project Requirement
          </button>
          <button
            type="button"
            onClick={() => setTab('partner')}
            className={`flex-1 py-2 rounded-lg transition-colors ${
              tab === 'partner' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
            }`}
          >
            Partner Inquiry
          </button>
        </div>

        {/* Form Container */}
        <div className="mt-6 p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-xs">
          {receipt ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Inquiry Logged Successfully
              </h3>
              <p className="text-xs text-slate-600">
                Reference ID: <span className="font-mono font-bold text-slate-900">{receipt.referenceId}</span>
              </p>
              <button
                type="button"
                onClick={() => {
                  setReceipt(null);
                  setFullName('');
                  setEmail('');
                  setPhone('');
                  setAdditionalDetails('');
                }}
                className="mt-2 text-xs font-semibold text-sky-600 hover:underline"
              >
                Submit another inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {errorMessage && (
                <div className="p-3 rounded-lg bg-red-50 text-red-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full p-2.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-sky-500"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Company / Organization</label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. Apex Infrastructure"
                    className="w-full p-2.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-sky-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full p-2.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-sky-500"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Phone *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full p-2.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-sky-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Industry</label>
                  <select
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-200 bg-slate-50"
                  >
                    <option value="Mining & Minerals">Mining & Minerals</option>
                    <option value="Solar & Renewable Energy">Solar & Renewable Energy</option>
                    <option value="Construction & Real Estate">Construction & Real Estate</option>
                    <option value="Roads & Highways">Roads & Highways</option>
                    <option value="Agriculture & Forestry">Agriculture & Forestry</option>
                    <option value="Power & Utilities">Power & Utilities</option>
                    <option value="Smart Cities & Urban Development">Smart Cities & Urban</option>
                    <option value="Government & Public Sector">Government</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Service Needed</label>
                  <input
                    type="text"
                    value={requiredService}
                    onChange={(e) => setRequiredService(e.target.value)}
                    placeholder="e.g. Stockpile volume, Orthomosaic"
                    className="w-full p-2.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-sky-500"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Brief Requirements</label>
                <textarea
                  rows={3}
                  value={additionalDetails}
                  onChange={(e) => setAdditionalDetails(e.target.value)}
                  placeholder="Tell us about the site location, approximate area, target deadline, or existing flight data..."
                  className="w-full p-2.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-sky-500 font-normal"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 text-xs sm:text-sm font-semibold text-white bg-slate-950 hover:bg-sky-600 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSubmitting ? 'Submitting...' : 'Send Inquiry'}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
