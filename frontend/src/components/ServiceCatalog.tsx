import React, { useState } from 'react';
import { Award, Users, Building, BookOpen, Shield, ArrowRight, CheckCircle2, Clock, Target, Info, Sparkles, X, ChevronRight } from 'lucide-react';

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName?: string;
  keyBenefits: string[];
  timeline: string;
  targetAudience: string;
}

interface ServiceCategory {
  id: string;
  categoryTitle: string;
  categoryDescription: string;
  badge: string;
  icon: string;
  services: ServiceItem[];
}

interface ServiceCatalogProps {
  categories: ServiceCategory[];
  onSelectServiceBooking: (serviceName: string, categoryTitle: string) => void;
}

export const ServiceCatalog: React.FC<ServiceCatalogProps> = ({
  categories,
  onSelectServiceBooking,
}) => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [selectedService, setSelectedService] = useState<{ service: ServiceItem; categoryTitle: string } | null>(null);

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Award': return Award;
      case 'Users': return Users;
      case 'Building': return Building;
      case 'BookOpen': return BookOpen;
      case 'Shield': return Shield;
      default: return Award;
    }
  };

  const filteredCategories = activeTab === 'all'
    ? categories
    : categories.filter(c => c.id === activeTab);

  return (
    <section id="services" className="py-20 relative bg-slate-950/60 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Comprehensive Dubai Healthcare Services</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            End-to-End Solutions for <span className="gradient-text-emerald">Professionals & Facilities</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            From initial DHA licensing and exam preparation to clinic setup, facility accreditation, and executive recruitment in the UAE.
          </p>
        </div>

        {/* Tab Filter Navigation */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'all'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-950/50'
                : 'glass-panel text-slate-300 hover:text-white hover:bg-slate-800/80'
            }`}
          >
            All Services (39)
          </button>
          {categories.map((cat) => {
            const Icon = getCategoryIcon(cat.icon);
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  activeTab === cat.id
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-950/50'
                    : 'glass-panel text-slate-300 hover:text-white hover:bg-slate-800/80'
                }`}
              >
                <Icon className="w-3.5 h-3.5 text-emerald-400" />
                <span>{cat.badge}</span>
                <span className="ml-1 text-[10px] bg-slate-900/60 px-1.5 py-0.5 rounded text-slate-400">
                  {cat.services.length}
                </span>
              </button>
            );
          })}
        </div>

        {/* Services Render Grid */}
        <div className="space-y-16">
          {filteredCategories.map((cat) => {
            const Icon = getCategoryIcon(cat.icon);
            return (
              <div key={cat.id} className="space-y-6">
                
                {/* Category Header Banner */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 glass-panel rounded-2xl border-l-4 border-l-emerald-500">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-amber-400">{cat.badge}</span>
                        <span className="text-slate-500 text-xs">• {cat.services.length} Specialized Services</span>
                      </div>
                      <h3 className="text-xl font-bold text-white">{cat.categoryTitle}</h3>
                      <p className="text-xs text-slate-400 mt-1">{cat.categoryDescription}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => onSelectServiceBooking('', cat.categoryTitle)}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold transition-all whitespace-nowrap self-start md:self-auto"
                  >
                    <span>Inquire for {cat.badge}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Services Cards Sub-Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {cat.services.map((svc) => (
                    <div
                      key={svc.id}
                      className="glass-card p-5 rounded-xl flex flex-col justify-between hover:border-emerald-500/40 group cursor-pointer"
                      onClick={() => setSelectedService({ service: svc, categoryTitle: cat.categoryTitle })}
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-xs text-slate-400">
                          <span className="flex items-center gap-1 font-semibold text-emerald-400">
                            <Clock className="w-3 h-3" /> {svc.timeline}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-slate-900 text-[10px] font-bold text-amber-400 border border-amber-500/20">
                            Verified
                          </span>
                        </div>

                        <h4 className="font-bold text-sm text-white group-hover:text-emerald-400 transition-colors line-clamp-2">
                          {svc.title}
                        </h4>

                        <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                          {svc.description}
                        </p>

                        <div className="pt-2 space-y-1">
                          {svc.keyBenefits.slice(0, 2).map((b, idx) => (
                            <div key={idx} className="flex items-center gap-1.5 text-[11px] text-slate-400">
                              <CheckCircle2 className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                              <span className="truncate">{b}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between">
                        <span className="text-[11px] text-slate-400 font-medium">Click to view details</span>
                        <div className="w-7 h-7 rounded-lg bg-slate-800 group-hover:bg-emerald-500 text-slate-300 group-hover:text-white flex items-center justify-center transition-all">
                          <ArrowRight className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            );
          })}
        </div>

        {/* Detailed Service Modal */}
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
            <div className="glass-panel w-full max-w-2xl rounded-2xl p-6 sm:p-8 space-y-6 relative border-emerald-500/30 max-h-[90vh] overflow-y-auto">
              
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white bg-slate-900 rounded-lg border border-slate-800"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-2">
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold uppercase tracking-wider">
                  {selectedService.categoryTitle}
                </span>
                <h3 className="text-2xl font-bold text-white">{selectedService.service.title}</h3>
                <p className="text-sm text-slate-300 leading-relaxed">{selectedService.service.description}</p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-1">
                  <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
                    <Clock className="w-4 h-4" /> Estimated Processing Timeline
                  </div>
                  <div className="text-lg font-extrabold text-white">{selectedService.service.timeline}</div>
                </div>

                <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-1">
                  <div className="flex items-center gap-2 text-teal-400 font-bold text-xs">
                    <Target className="w-4 h-4" /> Target Professional / Facility
                  </div>
                  <div className="text-sm font-semibold text-white">{selectedService.service.targetAudience}</div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-sm text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Key Deliverables & Service Scope
                </h4>
                <div className="grid sm:grid-cols-2 gap-2">
                  {selectedService.service.keyBenefits.map((benefit, i) => (
                    <div key={i} className="flex items-center gap-2 bg-slate-900/50 p-2.5 rounded-lg border border-slate-800/60 text-xs text-slate-200">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <Info className="w-4 h-4 text-emerald-400" />
                  <span>DHA / MOH Regulatory Compliant Service</span>
                </div>

                <button
                  onClick={() => {
                    const svcName = selectedService.service.title;
                    const catName = selectedService.categoryTitle;
                    setSelectedService(null);
                    onSelectServiceBooking(svcName, catName);
                  }}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-950/50"
                >
                  <span>Book Consultation for this Service</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
