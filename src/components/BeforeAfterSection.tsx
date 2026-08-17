import React from 'react';
import { FileSpreadsheet, Keyboard, FileText, Unlink, Clock, Server, Zap, Workflow, Network, TrendingUp, ArrowRight, Sparkles } from 'lucide-react';

interface BeforeAfterSectionProps {
  onOpenConsultation: () => void;
}

export const BeforeAfterSection: React.FC<BeforeAfterSectionProps> = ({ onOpenConsultation }) => {
  const beforePoints = [
    { title: 'Excel & Spreadsheet Terpisah', desc: 'Data tercecer di berbagai file Excel dengan risiko salah rumus.', icon: FileSpreadsheet },
    { title: 'Manual Data Entry', desc: 'Waktu tim habis untuk menginput ulang data secara berulang.', icon: Keyboard },
    { title: 'Dokumen Fisik & Kertas', desc: 'Risiko dokumen hilang, rusak, atau sulit dicari saat dibutuhkan.', icon: FileText },
    { title: 'Data Tidak Terintegrasi', desc: 'Antar divisi tidak saling terhubung, minim koordinasi.', icon: Unlink },
    { title: 'Laporan Lambat & Terlambat', desc: 'Butuh berhari-hari untuk menyusun laporan direksi.', icon: Clock },
  ];

  const afterPoints = [
    { title: 'Centralized System', desc: 'Satu database terpusat yang dapat diakses aman sesuai hak akses.', icon: Server },
    { title: 'Automation Pipeline', desc: 'Otomatisasi kalkulasi, pembuatan invoice, dan penarikan laporan.', icon: Zap },
    { title: 'Digital Workflow', desc: 'Persetujuan (approval) digital cepat via web dan perangkat mobile.', icon: Workflow },
    { title: 'Integrated Data Ecosystem', desc: 'Setiap cabang, site, dan departemen saling terhubung langsung.', icon: Network },
    { title: 'Real-time AI Analytics', desc: 'Laporan visual siap saji dalam hitungan detik dilengkapi rekomendasi AI.', icon: TrendingUp },
  ];

  return (
    <section className="py-20 md:py-28 bg-[#06080e] relative overflow-hidden border-y border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0d172e] border border-cyan-500/30 text-cyan-300 text-xs font-mono font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>TRANSFORMASI DIGITAL PROSES BISNIS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white tracking-tight">
            Ubah Proses Manual Menjadi <span className="text-gradient-cyan">Sistem Digital</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            Gantikan kerumitan operasional konvensional dengan infrastruktur aplikasi modern yang terpusat, cepat, dan otomatis.
          </p>
        </div>

        {/* Before vs After Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-center text-left">
          
          {/* LEFT: BEFORE (RED / SLATE TONE) */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-rose-950/20 border border-rose-500/30 space-y-4 relative">
            <div className="flex items-center justify-between pb-3 border-b border-rose-500/20 font-mono">
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
                SEBELUM (PROSES CONVENTIONAL)
              </span>
              <span className="text-[10px] text-rose-300/70">High Risk & Slow</span>
            </div>

            <div className="space-y-3">
              {beforePoints.map((pt) => {
                const IconComp = pt.icon;
                return (
                  <div key={pt.title} className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-rose-950 border border-rose-800/60 text-rose-400 shrink-0">
                      <IconComp className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-200">{pt.title}</div>
                      <div className="text-[11px] text-slate-400 font-normal leading-relaxed">{pt.desc}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* MIDDLE TRANSFORMATION ARROW */}
          <div className="lg:col-span-2 flex flex-col items-center justify-center space-y-3 py-4 lg:py-0">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-rose-500 to-cyan-500 p-0.5 shadow-xl shadow-cyan-500/20 animate-pulse">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-cyan-400">
                <ArrowRight className="w-6 h-6 rotate-90 lg:rotate-0" />
              </div>
            </div>
            <span className="text-[10px] font-mono font-bold text-cyan-300 tracking-wider uppercase bg-cyan-950 px-2.5 py-1 rounded-full border border-cyan-500/30">
              SMART-AI TRANSFORMATION
            </span>
          </div>

          {/* RIGHT: AFTER (CYAN / EMERALD TONE) */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-cyan-950/20 border border-cyan-500/40 space-y-4 relative card-featured">
            <div className="flex items-center justify-between pb-3 border-b border-cyan-500/30 font-mono">
              <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                SESUDAH (SISTEM SMART-AI.ID)
              </span>
              <span className="text-[10px] text-cyan-300 font-semibold bg-cyan-900/60 px-2 py-0.5 rounded">
                High Efficiency & Automated
              </span>
            </div>

            <div className="space-y-3">
              {afterPoints.map((pt) => {
                const IconComp = pt.icon;
                return (
                  <div key={pt.title} className="p-3 rounded-xl bg-slate-900/90 border border-cyan-500/30 flex items-start gap-3 hover:border-cyan-400/60 transition-colors">
                    <div className="p-2 rounded-lg bg-cyan-950 border border-cyan-500/50 text-cyan-300 shrink-0">
                      <IconComp className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">{pt.title}</div>
                      <div className="text-[11px] text-slate-300 font-normal leading-relaxed">{pt.desc}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* CTA */}
        <div className="mt-12">
          <button
            onClick={onOpenConsultation}
            className="btn-primary px-8 py-3.5 text-xs font-bold cursor-pointer inline-flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-cyan-300" />
            <span>Mulai Digitalisasi Sistem Bisnis Anda Hari Ini</span>
          </button>
        </div>

      </div>
    </section>
  );
};
