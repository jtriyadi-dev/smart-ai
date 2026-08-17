import React, { useState } from 'react';
import { 
  Zap, PieChart, TrendingUp, Sparkles, Bot, FileText, ShieldCheck, Database, 
  Lightbulb, CheckCircle2, ArrowRight, Activity, DollarSign, ShoppingCart, Users, Factory
} from 'lucide-react';

interface AIBenefitsSectionProps {
  onOpenConsultation: () => void;
}

export const AIBenefitsSection: React.FC<AIBenefitsSectionProps> = ({ onOpenConsultation }) => {
  const capabilities = [
    { title: 'AI Automation', desc: 'Otomatisasikan alur kerja manual dan proses bisnis berulang 24/7.', icon: Zap },
    { title: 'Smart Analytics', desc: 'Visualisasi grafik interaktif dan deteksi tren data bisnis secara real-time.', icon: PieChart },
    { title: 'Predictive Insights', desc: 'Prediksi kebutuhan stok, penjualan, dan potensi kendala operasional.', icon: TrendingUp },
    { title: 'AI Assistant', desc: 'Copilot internal untuk menjawab SOP, mencari data, dan memandu tim.', icon: Bot },
    { title: 'Document Processing', desc: 'Ekstraksi otomatis data dari invoice, dokumen, dan PDF dengan OCR.', icon: FileText },
    { title: 'Data Analysis', desc: 'Analisis mendalam terhadap data operasional untuk menemukan pola efisiensi.', icon: Database },
    { title: 'Intelligent Recommendation', desc: 'Saran tindakan bisnis otomatis berbasis pembelajaran algoritma.', icon: Lightbulb },
    { title: 'Decision Support', desc: 'Peringatan dini (early warning) untuk membantu jajaran pimpinan mengambil keputusan.', icon: ShieldCheck }
  ];

  const [activeTab, setActiveTab] = useState<'overview' | 'insights' | 'recommendations'>('overview');

  return (
    <section id="ai-capabilities" className="py-20 md:py-28 relative bg-[#07090e] border-y border-slate-800/60 overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-600/10 blur-[130px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/10 blur-[130px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0d172e] border border-cyan-500/30 text-cyan-300 text-xs font-mono font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>ENTERPRISE AI CAPABILITIES</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white tracking-tight">
            AI yang Bekerja untuk <span className="text-gradient-cyan">Bisnis Anda</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            AI bukan hanya chatbot. Kami mengintegrasikan AI ke dalam proses bisnis untuk membantu perusahaan bekerja lebih cepat dan mengambil keputusan dengan lebih baik.
          </p>
        </div>

        {/* Layout: Left 8 Capabilities | Right Interactive Dashboard */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: 8 AI Capabilities List */}
          <div className="lg:col-span-6 grid sm:grid-cols-2 gap-3.5">
            {capabilities.map((item) => {
              const IconComp = item.icon;
              return (
                <div
                  key={item.title}
                  className="card-interactive p-4 rounded-xl border border-slate-800 bg-slate-900/60 hover:bg-slate-900 hover:border-cyan-500/40 transition-all text-left group"
                >
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="p-2 rounded-lg bg-slate-800 border border-slate-700 text-cyan-400 group-hover:text-cyan-300 group-hover:border-cyan-500/50 transition-colors shrink-0">
                      <IconComp className="w-4 h-4" />
                    </div>
                    <h3 className="text-sm font-bold text-white font-display group-hover:text-cyan-300 transition-colors">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Right: Interactive AI Dashboard Visual */}
          <div className="lg:col-span-6 card-featured p-6 border border-white/10 shadow-2xl space-y-5 text-left relative">
            
            {/* Header / Demo Badge */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse"></div>
                <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                  AI Business Executive Dashboard
                </span>
              </div>

              <span className="text-[10px] font-mono font-semibold text-amber-300 bg-amber-950/80 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                DEMO DATA / SAMPLE
              </span>
            </div>

            {/* Switcher Buttons */}
            <div className="flex items-center gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-mono">
              <button
                onClick={() => setActiveTab('overview')}
                className={`flex-1 py-1.5 px-2 rounded-lg text-center transition-all cursor-pointer ${
                  activeTab === 'overview'
                    ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-600/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('insights')}
                className={`flex-1 py-1.5 px-2 rounded-lg text-center transition-all cursor-pointer ${
                  activeTab === 'insights'
                    ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-600/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                AI Insights
              </button>
              <button
                onClick={() => setActiveTab('recommendations')}
                className={`flex-1 py-1.5 px-2 rounded-lg text-center transition-all cursor-pointer ${
                  activeTab === 'recommendations'
                    ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-600/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Recommendations
              </button>
            </div>

            {/* Tab 1: Business Overview */}
            {activeTab === 'overview' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3 font-mono">
                  <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 space-y-1">
                    <div className="flex items-center justify-between text-[10px] text-slate-400">
                      <span>REVENUE</span>
                      <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                    <div className="text-base font-extrabold text-white">Rp 4.28B</div>
                    <div className="text-[10px] text-emerald-400 font-sans">+18.4% vs last month</div>
                  </div>

                  <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 space-y-1">
                    <div className="flex items-center justify-between text-[10px] text-slate-400">
                      <span>ORDERS</span>
                      <ShoppingCart className="w-3.5 h-3.5 text-cyan-400" />
                    </div>
                    <div className="text-base font-extrabold text-white">8,420</div>
                    <div className="text-[10px] text-cyan-300 font-sans">100% Processed</div>
                  </div>

                  <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 space-y-1">
                    <div className="flex items-center justify-between text-[10px] text-slate-400">
                      <span>USERS</span>
                      <Users className="w-3.5 h-3.5 text-indigo-400" />
                    </div>
                    <div className="text-base font-extrabold text-white">12,480</div>
                    <div className="text-[10px] text-slate-400 font-sans">Active Internal & Clients</div>
                  </div>

                  <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 space-y-1">
                    <div className="flex items-center justify-between text-[10px] text-slate-400">
                      <span>PRODUCTION</span>
                      <Factory className="w-3.5 h-3.5 text-amber-400" />
                    </div>
                    <div className="text-base font-extrabold text-white">94.2%</div>
                    <div className="text-[10px] text-amber-300 font-sans">Efficiency Capacity</div>
                  </div>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1">
                  <div className="text-[10px] font-mono text-slate-400 uppercase">System Status</div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-300">AI Automation Pipelines:</span>
                    <span className="text-emerald-400 font-mono font-bold">ALL OPERATIONAL (99.98%)</span>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: AI Insights */}
            {activeTab === 'insights' && (
              <div className="space-y-3 font-sans text-xs">
                <div className="p-3 bg-slate-900/90 border border-slate-800 rounded-xl space-y-1">
                  <div className="flex items-center justify-between font-mono text-[10px] text-emerald-400">
                    <span className="font-bold">INSIGHT #01</span>
                    <span>CONFIDENCE: 98%</span>
                  </div>
                  <div className="text-sm font-bold text-white">"Sales trend is increasing."</div>
                  <p className="text-[11px] text-slate-300 leading-relaxed font-normal">
                    Penjualan meningkat 18.4% bulan ini didorong oleh otomatisasi respon lead dan integrasi WhatsApp API Gateway.
                  </p>
                </div>

                <div className="p-3 bg-slate-900/90 border border-amber-500/30 rounded-xl space-y-1">
                  <div className="flex items-center justify-between font-mono text-[10px] text-amber-400">
                    <span className="font-bold">INSIGHT #02</span>
                    <span>ATTENTION REQUIRED</span>
                  </div>
                  <div className="text-sm font-bold text-white">"Inventory requires attention."</div>
                  <p className="text-[11px] text-slate-300 leading-relaxed font-normal">
                    Stok bahan mentah di Gudang B berada di bawah ambang batas minimum. Diperkirakan akan habis dalam 4 hari kerja.
                  </p>
                </div>

                <div className="p-3 bg-slate-900/90 border border-cyan-500/30 rounded-xl space-y-1">
                  <div className="flex items-center justify-between font-mono text-[10px] text-cyan-400">
                    <span className="font-bold">INSIGHT #03</span>
                    <span>EFFICIENCY METRIC</span>
                  </div>
                  <div className="text-sm font-bold text-white">"Operational efficiency improved."</div>
                  <p className="text-[11px] text-slate-300 leading-relaxed font-normal">
                    Waktu pemrosesan dokumen invoice berkurang dari 24 jam menjadi 3 menit berkat OCR AI parser.
                  </p>
                </div>
              </div>
            )}

            {/* Tab 3: AI Recommendations */}
            {activeTab === 'recommendations' && (
              <div className="space-y-3 font-sans text-xs">
                <div className="p-3 bg-[#0d172e] border border-cyan-500/40 rounded-xl space-y-2">
                  <div className="flex items-center justify-between font-mono text-[10px] text-cyan-300">
                    <span className="font-bold flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                      RECOMMENDATION #01
                    </span>
                    <span className="bg-cyan-950 px-2 py-0.5 rounded text-cyan-300 border border-cyan-500/30">HIGH PRIORITY</span>
                  </div>
                  <div className="text-sm font-bold text-white">"Review inventory allocation."</div>
                  <p className="text-[11px] text-slate-300 leading-relaxed font-normal">
                    Sistem merekomendasikan realokasi 300 unit stok dari Gudang Utama ke Gudang Cabang B untuk mencegah stockout minggu depan.
                  </p>
                </div>

                <div className="p-3 bg-[#0d172e] border border-cyan-500/40 rounded-xl space-y-2">
                  <div className="flex items-center justify-between font-mono text-[10px] text-cyan-300">
                    <span className="font-bold flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                      RECOMMENDATION #02
                    </span>
                    <span className="bg-cyan-950 px-2 py-0.5 rounded text-cyan-300 border border-cyan-500/30">WORKFLOW OPTIMIZATION</span>
                  </div>
                  <div className="text-sm font-bold text-white">"Optimize operational workflow."</div>
                  <p className="text-[11px] text-slate-300 leading-relaxed font-normal">
                    Aktifkan otomatisasi approval bertingkat untuk transaksi di bawah Rp 50 Juta guna mempercepat perputaran PO.
                  </p>
                </div>
              </div>
            )}

            {/* Footer Action */}
            <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-[11px] text-slate-400 font-sans">
                Model AI disesuaikan dengan data & SOP internal perusahaan Anda.
              </span>
              <button
                onClick={onOpenConsultation}
                className="btn-primary text-xs font-bold px-4 py-2 flex items-center gap-1.5 cursor-pointer"
              >
                <span>Konsultasi AI</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
