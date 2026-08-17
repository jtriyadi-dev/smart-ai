import React from 'react';
import { MessageSquare, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

interface ContactCTAProps {
  onOpenConsultation: () => void;
}

export const ContactCTA: React.FC<ContactCTAProps> = ({ onOpenConsultation }) => {
  const openWhatsApp = () => {
    const text = encodeURIComponent('Halo Tim SMART-AI.ID, saya siap berkonsultasi mengenai perancangan aplikasi web custom berbasis AI untuk perusahaan kami.');
    window.open(`https://wa.me/6281234567890?text=${text}`, '_blank');
  };

  return (
    <section id="contact" className="py-20 md:py-28 relative bg-radial-glow overflow-hidden">
      
      {/* Background glow circle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-cyan-500/10 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        <div className="card-featured rounded-3xl p-8 sm:p-14 border border-cyan-500/30 shadow-2xl relative space-y-6">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0d172e] border border-cyan-500/40 text-cyan-300 text-xs font-mono font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>MULAI TRANSFORMASI DIGITAL HARI INI</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white tracking-tight leading-tight">
            Siap Mengubah Ide Anda Menjadi <span className="text-gradient-cyan">Aplikasi?</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
            Ceritakan kebutuhan bisnis Anda kepada kami. Tim SMART-AI.ID akan membantu merancang solusi aplikasi yang sesuai dengan kebutuhan bisnis Anda.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={openWhatsApp}
              className="w-full sm:w-auto px-8 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm rounded-xl shadow-xl shadow-emerald-600/25 transition-all flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Konsultasi Gratis via WhatsApp</span>
            </button>

            <button
              onClick={onOpenConsultation}
              className="w-full sm:w-auto btn-primary px-8 py-3.5 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Isi Form Detail Spesifikasi</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-mono">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Respon Konsultasi &lt; 15 Menit</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Kerahasiaan Data (NDA Ready)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Diskusi Teknis Tanpa Biaya</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

