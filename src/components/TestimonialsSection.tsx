import React from 'react';
import { Quote, Sparkles, Building2, ShieldCheck, Star } from 'lucide-react';

interface TestimonialsSectionProps {
  onOpenConsultation: () => void;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ onOpenConsultation }) => {
  const testimonials = [
    {
      quote: "SMART-AI.ID membantu kami melihat proses bisnis dari perspektif yang lebih terstruktur. Aplikasi custom yang dibangun memudahkan tim lapangan menginput laporan harian secara akurat.",
      clientName: "Sample Client Executive",
      role: "Direktur Operasional",
      industry: "Manufaktur & Fabrikasi",
      impact: "Efisiensi Laporan +65%"
    },
    {
      quote: "Integrasi sistem monitoring armada dan solar berbasis AI memberi kami transparansi penuh terhadap biaya operasional di site tambang. Sangat profesional.",
      clientName: "Sample Mining Manager",
      role: "General Manager Site",
      industry: "Pertambangan Batubara",
      impact: "Hemat BBM 14%"
    },
    {
      quote: "Pengembangan sistem informasi sekolah dengan AI Assistant mempermudah guru dalam memantau nilai dan absensi siswa. Antarmuka aplikasi sangat modern dan cepat.",
      clientName: "Sample School Principal",
      role: "Kepala Yayasan",
      industry: "Pendidikan & Sekolah",
      impact: "Otomatisasi Admin 80%"
    }
  ];

  return (
    <section className="py-20 bg-[#06080e] relative overflow-hidden border-t border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0d172e] border border-cyan-500/30 text-cyan-300 text-xs font-mono font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>SAMPLE CLIENT TESTIMONIALS & CASE IMPACT</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
            Perspektif Mitra & <span className="text-gradient-cyan">Simulasi Dampak</span>
          </h2>

          <p className="text-sm text-slate-300 leading-relaxed font-normal">
            Bagaimana pendekatan sistematis SMART-AI.ID dalam mentransformasi proses bisnis konvensional menjadi aplikasi digital yang terukur.
          </p>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-400 text-[11px] font-mono">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>Label: Sample Testimonials / Simulated Case Studies</span>
          </div>
        </div>

        {/* 3 Testimonial Cards */}
        <div className="grid md:grid-cols-3 gap-6 text-left">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="card-interactive p-6 rounded-2xl border border-slate-800 bg-slate-900/60 hover:bg-slate-900 flex flex-col justify-between space-y-6 group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-mono font-bold text-cyan-300 bg-cyan-950 px-2.5 py-0.5 rounded-full border border-cyan-500/30">
                    {t.impact}
                  </span>
                </div>

                <Quote className="w-8 h-8 text-cyan-500/40" />

                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal italic">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-cyan-400 shrink-0">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white font-display">{t.clientName}</div>
                  <div className="text-[11px] text-slate-400 font-sans">{t.role} • <span className="text-cyan-400 font-mono">{t.industry}</span></div>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12">
          <button
            onClick={onOpenConsultation}
            className="btn-outline px-6 py-2.5 text-xs font-bold cursor-pointer"
          >
            Konsultasikan Proyek Aplikasi Bisnis Anda
          </button>
        </div>

      </div>
    </section>
  );
};
