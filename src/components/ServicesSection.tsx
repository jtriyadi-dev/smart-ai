import React from 'react';
import { MAIN_SERVICES } from '../data/content';
import { ServiceItem } from '../types';
import { Cpu, Building2, Zap, BarChart3, Bot, Network, ArrowRight, CheckCircle2 } from 'lucide-react';

interface ServicesSectionProps {
  onSelectService: (service: ServiceItem) => void;
  onOpenConsultation: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService, onOpenConsultation }) => {
  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu': return <Cpu className="w-6 h-6 text-cyan-400" />;
      case 'Building2': return <Building2 className="w-6 h-6 text-indigo-400" />;
      case 'Zap': return <Zap className="w-6 h-6 text-amber-400" />;
      case 'BarChart3': return <BarChart3 className="w-6 h-6 text-emerald-400" />;
      case 'Bot': return <Bot className="w-6 h-6 text-purple-400" />;
      case 'Network': return <Network className="w-6 h-6 text-sky-400" />;
      default: return <Cpu className="w-6 h-6 text-cyan-400" />;
    }
  };

  return (
    <section id="layanan" className="py-20 md:py-28 relative bg-[#070a12]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0d172e] border border-cyan-500/30 text-cyan-300 text-xs font-mono font-semibold">
            <span>LAYANAN UTAMA SMART-AI.ID</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white tracking-tight">
            Solusi Digital Custom untuk <span className="text-gradient-cyan">Bisnis Anda</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            Setiap perusahaan memiliki alur kerja, standar operasional, dan tantangan yang berbeda. Kami membangun aplikasi web custom berbasis AI yang 100% dirancang mengikuti kebutuhan spesifik bisnis Anda.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {MAIN_SERVICES.map((service) => (
            <div
              key={service.id}
              className="card-interactive p-6 sm:p-7 flex flex-col justify-between relative group"
            >
              <div>
                {/* Header / Icon / Badge */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-slate-900/90 border border-slate-700/80 flex items-center justify-center group-hover:scale-105 group-hover:border-cyan-500/50 transition-all duration-300">
                    {getServiceIcon(service.iconName)}
                  </div>
                  
                  {service.badge && (
                    <span className="badge-cyan font-mono">
                      {service.badge}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-xl font-display font-bold text-white group-hover:text-cyan-300 transition-colors mb-3">
                  {service.title}
                </h3>

                {/* Short Description */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5">
                  {service.shortDesc}
                </p>

                {/* Key Features List Preview */}
                <div className="space-y-2 mb-6 pt-4 border-t border-slate-800/80">
                  {service.features.slice(0, 3).map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-800/60 flex items-center justify-between">
                <button
                  onClick={() => onSelectService(service)}
                  className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 group/btn cursor-pointer"
                >
                  <span>Detail Solusi</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={onOpenConsultation}
                  className="btn-outline text-[11px] font-semibold px-3 py-1.5 cursor-pointer"
                >
                  Konsultasi
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Additional Services Banner */}
        <div className="mt-12 p-6 rounded-2xl card-featured border border-cyan-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-lg font-bold text-white font-display">Membutuhkan Fitur atau Layanan Khusus Lainnya?</h4>
            <p className="text-xs sm:text-sm text-slate-300">
              Juga melayani: Enterprise Management System, Predictive Analytics, Workflow Automation, Progressive Web App (PWA), & Digital Transformation Consulting.
            </p>
          </div>
          <button
            onClick={onOpenConsultation}
            className="btn-primary text-xs font-bold px-6 py-3 cursor-pointer whitespace-nowrap shrink-0"
          >
            Diskusikan Kebutuhan Spesifik
          </button>
        </div>

      </div>
    </section>
  );
};

