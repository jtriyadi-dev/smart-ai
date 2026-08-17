import React, { useState } from 'react';
import { INDUSTRY_SOLUTIONS } from '../data/content';
import { IndustrySolution } from '../types';
import { 
  Pickaxe, Trees, Egg, Waves, Activity, GraduationCap, Factory, 
  ShoppingBag, Warehouse, Truck, Utensils, ShieldCheck, ArrowRight, Sparkles,
  Fuel, Wrench, PackageCheck, Users, DollarSign, BarChart3, Radio,
  Hotel, Stethoscope, Pill
} from 'lucide-react';

interface IndustriesSectionProps {
  onSelectIndustry: (industry: IndustrySolution) => void;
  onOpenConsultation: () => void;
}

export const IndustriesSection: React.FC<IndustriesSectionProps> = ({ onSelectIndustry, onOpenConsultation }) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const getIndustryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Pickaxe': return <Pickaxe className="w-5 h-5 text-amber-400" />;
      case 'Trees': return <Trees className="w-5 h-5 text-emerald-400" />;
      case 'Egg': return <Egg className="w-5 h-5 text-yellow-400" />;
      case 'Waves': return <Waves className="w-5 h-5 text-cyan-400" />;
      case 'Activity': return <Activity className="w-5 h-5 text-rose-400" />;
      case 'Stethoscope': return <Stethoscope className="w-5 h-5 text-emerald-400" />;
      case 'Pill': return <Pill className="w-5 h-5 text-teal-400" />;
      case 'Hotel': return <Hotel className="w-5 h-5 text-amber-300" />;
      case 'GraduationCap': return <GraduationCap className="w-5 h-5 text-indigo-400" />;
      case 'Factory': return <Factory className="w-5 h-5 text-blue-400" />;
      case 'ShoppingBag': return <ShoppingBag className="w-5 h-5 text-purple-400" />;
      case 'Warehouse': return <Warehouse className="w-5 h-5 text-teal-400" />;
      case 'Truck': return <Truck className="w-5 h-5 text-orange-400" />;
      case 'Utensils': return <Utensils className="w-5 h-5 text-pink-400" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-sky-400" />;
      default: return <Sparkles className="w-5 h-5 text-cyan-400" />;
    }
  };

  const filteredIndustries = activeFilter === 'all'
    ? INDUSTRY_SOLUTIONS
    : INDUSTRY_SOLUTIONS.filter(item => item.category === activeFilter);

  const miningModules = [
    { title: 'Production', icon: Pickaxe, desc: 'Ritase tonase batubara & mineral' },
    { title: 'Fleet', icon: Truck, desc: 'Tracking hauling & alat berat' },
    { title: 'Fuel', icon: Fuel, desc: 'Pemakaian solar & tangki BBM' },
    { title: 'Maintenance', icon: Wrench, desc: 'Jadwal servis & breakdown engine' },
    { title: 'Warehouse', icon: PackageCheck, desc: 'Sparepart & inventory site' },
    { title: 'HR & K3', icon: Users, desc: 'Shift kerja & insiden keselamatan' },
    { title: 'Finance', icon: DollarSign, desc: 'Cost/ton & kontraktor billing' },
    { title: 'AI Analytics', icon: BarChart3, desc: 'Prediksi anomali & kecenderungan' },
  ];

  const handleExploreMining = () => {
    const miningItem = INDUSTRY_SOLUTIONS.find(i => i.id === 'mining');
    if (miningItem) {
      onSelectIndustry(miningItem);
    } else {
      onOpenConsultation();
    }
  };

  return (
    <section id="industri" className="py-20 md:py-28 relative bg-tech-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0d172e] border border-cyan-500/30 text-cyan-300 text-xs font-mono font-semibold">
            <span>SOLUSI SPESIFIK INDUSTRI</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white tracking-tight">
            Solusi AI untuk <span className="text-gradient-cyan">Berbagai Industri</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            Dari operasional lapangan hingga manajemen perusahaan, SMART-AI.ID dapat membangun aplikasi yang disesuaikan dengan karakteristik industri Anda.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10 font-mono text-xs">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer font-semibold ${
              activeFilter === 'all'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            Semua Industri ({INDUSTRY_SOLUTIONS.length})
          </button>

          <button
            onClick={() => setActiveFilter('primary')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer font-semibold ${
              activeFilter === 'primary'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            Tambang & Perkebunan
          </button>

          <button
            onClick={() => setActiveFilter('agriculture')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer font-semibold ${
              activeFilter === 'agriculture'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            Peternakan & Tambak
          </button>

          <button
            onClick={() => setActiveFilter('healthcare')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer font-semibold ${
              activeFilter === 'healthcare'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            Kesehatan & Sekolah
          </button>

          <button
            onClick={() => setActiveFilter('commerce')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer font-semibold ${
              activeFilter === 'commerce'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            Ritel, Distributor & Kuliner
          </button>

          <button
            onClick={() => setActiveFilter('operations')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer font-semibold ${
              activeFilter === 'operations'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            Manufaktur & Gudang
          </button>
        </div>

        {/* Industry Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-16">
          {filteredIndustries.map((ind) => (
            <div
              key={ind.id}
              className="card-interactive p-5 flex flex-col justify-between group text-left"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center group-hover:scale-105 transition-transform">
                    {getIndustryIcon(ind.iconName)}
                  </div>
                  <span className="badge-cyan font-mono text-[10px]">
                    {ind.impactMetrics}
                  </span>
                </div>

                <h3 className="text-base font-bold font-display text-white group-hover:text-cyan-300 transition-colors mb-2">
                  {ind.title}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed mb-4 line-clamp-3 font-normal">
                  {ind.shortDesc}
                </p>

                <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 text-[11px] text-slate-400 mb-4">
                  <span className="text-cyan-400 font-semibold font-mono block mb-0.5">Kapabilitas AI:</span>
                  <span className="line-clamp-2 text-slate-300 font-normal">{ind.aiCapability}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between">
                <button
                  onClick={() => onSelectIndustry(ind)}
                  className="w-full btn-outline py-2 text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer group/btn"
                >
                  <span>Explore Solution</span>
                  <ArrowRight className="w-3.5 h-3.5 text-cyan-400 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* SECTION 14: FEATURED INDUSTRY - SMART MINING */}
        <div className="card-featured p-6 sm:p-10 rounded-3xl border border-cyan-500/30 relative overflow-hidden text-left">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 blur-[130px] rounded-full pointer-events-none"></div>

          <div className="grid lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-5 space-y-5">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-amber-950/80 border border-amber-500/40 text-amber-300 font-mono text-xs font-bold flex items-center gap-1.5">
                  <Radio className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                  CONCEPT SOLUTION
                </span>
                <span className="text-xs font-mono text-slate-400">FEATURED INDUSTRY</span>
              </div>

              <h3 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
                SMART MINING <span className="text-gradient-cyan">SYSTEM</span>
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                Sistem pengawasan tambang terpadu untuk batubara dan nikel. Monitoring tonase produksi, hauling, konsumsi BBM, jadwal maintenance alat berat, stockpile, dan analisis AI secara real-time.
              </p>

              {/* Modules list */}
              <div className="grid grid-cols-2 gap-2.5 pt-2">
                {miningModules.map((mod) => {
                  const IconComp = mod.icon;
                  return (
                    <div key={mod.title} className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center gap-2">
                      <IconComp className="w-4 h-4 text-amber-400 shrink-0" />
                      <div>
                        <div className="text-xs font-bold text-white font-mono">{mod.title}</div>
                        <div className="text-[10px] text-slate-400 font-sans leading-tight">{mod.desc}</div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleExploreMining}
                  className="btn-primary px-6 py-3 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Explore Mining Solution</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={onOpenConsultation}
                  className="btn-outline px-6 py-3 text-xs font-bold cursor-pointer"
                >
                  Konsultasi Tambang
                </button>
              </div>
            </div>

            {/* Right Dashboard Mockup Visual */}
            <div className="lg:col-span-7 bg-slate-950/90 rounded-2xl border border-slate-800 p-5 space-y-4 shadow-2xl">
              
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 font-mono text-xs">
                <div className="flex items-center gap-2 text-slate-300 font-bold">
                  <Pickaxe className="w-4 h-4 text-amber-400" />
                  <span>SMART MINING OPERATIONAL COCKPIT</span>
                </div>
                <span className="text-[10px] text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/30">
                  Site East Kalimantan
                </span>
              </div>

              {/* Key Metrics Mockup */}
              <div className="grid grid-cols-3 gap-3 font-mono">
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                  <div className="text-[10px] text-slate-400">DAILY TONNAGE</div>
                  <div className="text-base font-extrabold text-amber-400">42,850 MT</div>
                  <div className="text-[9px] text-emerald-400">+12% Target</div>
                </div>

                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                  <div className="text-[10px] text-slate-400">FLEET ACTIVE</div>
                  <div className="text-base font-extrabold text-cyan-300">84 Units</div>
                  <div className="text-[9px] text-cyan-400">98.2% Availability</div>
                </div>

                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                  <div className="text-[10px] text-slate-400">FUEL AVG</div>
                  <div className="text-base font-extrabold text-emerald-400">18.2 L/Hr</div>
                  <div className="text-[9px] text-emerald-400">AI Efficient</div>
                </div>
              </div>

              {/* Live Activity Stream */}
              <div className="p-3.5 bg-slate-900/80 rounded-xl border border-slate-800 space-y-2 font-mono text-[11px]">
                <div className="text-slate-400 text-[10px] uppercase font-bold flex items-center justify-between">
                  <span>AI Predictive Breakdown Warning</span>
                  <span className="text-amber-400">EARLY ALERT</span>
                </div>
                <p className="text-slate-300 font-sans text-xs leading-relaxed">
                  "Excavator EX-042 terdeteksi mengalami kenaikan suhu oli hidrolik sebesar 8°C di luar batas wajar. Disarankan melakukan inspek preventif sebelum shift malam."
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
