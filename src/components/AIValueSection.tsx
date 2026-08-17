import React from 'react';
import { Zap, PieChart, TrendingUp, Sparkles, ArrowRight } from 'lucide-react';

interface AIValueSectionProps {
  onOpenConsultation: () => void;
}

export const AIValueSection: React.FC<AIValueSectionProps> = ({ onOpenConsultation }) => {
  const pillars = [
    {
      label: '01. AUTOMATE',
      title: 'Otomatisasikan Pekerjaan Berulang',
      desc: 'Serahkan tugas input data, verifikasi invoice, validasi dokumen, dan pengiriman notifikasi rutin kepada mesin AI. Hemat waktu tim hingga 80%.',
      icon: Zap,
      badge: 'Workforce Efficiency',
      color: 'text-amber-400',
      bgBorder: 'border-amber-500/30 bg-amber-950/20'
    },
    {
      label: '02. ANALYZE',
      title: 'Pahami Data Secara Mendalam',
      desc: 'AI memproses ribuan baris transaksi operasional dalam hitungan detik untuk menemukan anomali, pola tersembunyi, dan peluang peningkatan margin.',
      icon: PieChart,
      badge: 'Deep Intelligence',
      color: 'text-cyan-400',
      bgBorder: 'border-cyan-500/30 bg-cyan-950/20'
    },
    {
      label: '03. OPTIMIZE',
      title: 'Optimalkan Keputusan Strategis',
      desc: 'Dapatkan prediksi tren masa depan dan rekomendasi tindakan presisi berbasis data untuk meminimalisir risiko operasional perusahaan.',
      icon: TrendingUp,
      badge: 'Strategic Advantage',
      color: 'text-emerald-400',
      bgBorder: 'border-emerald-500/30 bg-emerald-950/20'
    }
  ];

  return (
    <section className="py-20 bg-[#070a12] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0d172e] border border-cyan-500/30 text-cyan-300 text-xs font-mono font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>VALUE PROPOSITION AI</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white tracking-tight">
            Jangan Hanya Digitalisasi. <br />
            <span className="text-gradient-cyan">Jadikan Bisnis Lebih Cerdas.</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal max-w-2xl mx-auto">
            Digitalisasi membantu bisnis bekerja lebih cepat. AI membantu bisnis memahami data, menemukan pola, dan membuat keputusan dengan lebih baik.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid md:grid-cols-3 gap-6 text-left">
          {pillars.map((p) => {
            const IconComp = p.icon;
            return (
              <div
                key={p.label}
                className={`card-interactive p-7 rounded-2xl border ${p.bgBorder} flex flex-col justify-between space-y-6 group`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-mono font-extrabold tracking-wider ${p.color}`}>
                      {p.label}
                    </span>
                    <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300">
                      {p.badge}
                    </span>
                  </div>

                  <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <IconComp className={`w-6 h-6 ${p.color}`} />
                  </div>

                  <h3 className="text-xl font-display font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {p.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                    {p.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>AI Business Integration</span>
                  <ArrowRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12">
          <button
            onClick={onOpenConsultation}
            className="btn-primary px-8 py-3.5 text-xs font-bold cursor-pointer inline-flex items-center gap-2"
          >
            <span>Konsultasikan Kebutuhan AI Perusahaan Anda</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
