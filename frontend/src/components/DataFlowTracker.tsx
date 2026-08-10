import React, { useState } from 'react';
import { ShieldCheck, Search, FileText, CheckCircle2, Clock, AlertCircle, Building2, User } from 'lucide-react';
import { trackDataFlow } from '../services/api';

export const DataFlowTracker: React.FC = () => {
  const [query, setQuery] = useState<string>('DF-DXB-98421');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError('');

    try {
      const data = await trackDataFlow(query);
      setResult(data);
    } catch (err) {
      setError('Case reference not found or network offline.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="tracker" className="py-20 relative bg-slate-950 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 text-xs font-bold uppercase">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Primary Source Verification (PSV) Desk</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            DataFlow Document <span className="gradient-text-emerald">Status Tracker</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Track your DHA Primary Source Verification (PSV) progress in real-time. Enter your DataFlow Reference Number or Passport ID below.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-10">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter DataFlow Case # (e.g. DF-DXB-98421) or Passport Number..."
                className="w-full glass-input pl-12 pr-4 py-3.5 rounded-xl text-xs font-semibold"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-950/50 flex items-center justify-center gap-2"
            >
              {loading ? 'Searching...' : 'Track Case'}
            </button>
          </form>
          <p className="text-[11px] text-slate-500 text-center mt-2">
            Try sample numbers: <span onClick={() => setQuery('DF-DXB-98421')} className="text-emerald-400 underline cursor-pointer">DF-DXB-98421</span> or <span onClick={() => setQuery('DF-DXB-87103')} className="text-emerald-400 underline cursor-pointer">DF-DXB-87103</span>
          </p>
        </div>

        {/* Search Results Display */}
        {result && (
          <div className="max-w-4xl mx-auto glass-panel p-6 sm:p-8 rounded-2xl border-slate-800 space-y-8 animate-fadeIn">
            
            {/* Top Bar Summary */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-extrabold uppercase tracking-widest text-teal-400">CASE NUMBER:</span>
                  <span className="font-extrabold text-white text-base">{result.caseNumber}</span>
                </div>
                <div className="flex items-center gap-4 text-xs text-slate-400">
                  <span className="flex items-center gap-1"><User className="w-3.5 h-3.5 text-slate-500" /> {result.applicantName}</span>
                  <span className="flex items-center gap-1"><Building2 className="w-3.5 h-3.5 text-slate-500" /> Authority: {result.authority}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                  <span className="text-[10px] text-slate-500 font-bold uppercase">Report Status</span>
                  <div className="text-xs font-extrabold text-emerald-400">{result.status}</div>
                </div>
                <span className="px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold">
                  {result.progressPercentage}% Completed
                </span>
              </div>
            </div>

            {/* Stage Stepper Progress Visualizer */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Verification Milestones</h4>
              <div className="grid sm:grid-cols-4 gap-3">
                {result.stages.map((stg: any, i: number) => (
                  <div key={i} className={`p-4 rounded-xl border space-y-2 ${
                    stg.completed 
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                      : 'bg-slate-900/60 border-slate-800 text-slate-500'
                  }`}>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-extrabold">STAGE 0{i + 1}</span>
                      {stg.completed ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Clock className="w-4 h-4 text-slate-600" />}
                    </div>
                    <div className="text-xs font-bold text-white line-clamp-2">{stg.title}</div>
                    <div className="text-[10px] text-slate-400">{stg.date}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Details Box */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1 text-xs">
              <span className="font-bold text-amber-400">DataFlow Specialist Note:</span>
              <p className="text-slate-300">{result.details}</p>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
