import React, { useState, useEffect } from 'react';
import { Bot, ShieldCheck, Target, Sparkles, Award, Users, CheckCircle2 } from 'lucide-react';
import { WebsiteCMSContentService } from '../services/WebsiteCMSContentService';

interface AboutPageProps {
  onOpenConsultation: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenConsultation }) => {
  const [aboutContent, setAboutContent] = useState(
    WebsiteCMSContentService.getCMSData().about
  );

  useEffect(() => {
    const unsubscribe = WebsiteCMSContentService.subscribe((cms) => {
      setAboutContent(cms.about);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="py-24 md:py-32 bg-[#06090e] bg-tech-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
            <Bot className="w-3.5 h-3.5 text-cyan-400" />
            <span>{aboutContent.badge || 'TENTANG SMART-AI.ID'}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
            {aboutContent.title || 'Pelopor Software Custom Berbasis AI'}
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            {aboutContent.description1 || 'SMART-AI.ID didirikan untuk membantu perusahaan di Indonesia mengakselerasi transformasi digital melalui pembuatan aplikasi web khusus yang efisien, handal, dan berorientasi hasil.'}
          </p>
        </div>

        {/* Highlight Stats from CMS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          <div className="glass-card p-6 rounded-2xl border border-slate-800 text-center">
            <div className="text-3xl font-display font-black text-cyan-400">{aboutContent.foundedYear || '2022'}</div>
            <div className="text-xs text-slate-400 mt-1">Tahun Berdiri</div>
          </div>
          <div className="glass-card p-6 rounded-2xl border border-slate-800 text-center">
            <div className="text-3xl font-display font-black text-indigo-400">{aboutContent.totalProjectsDelivered || '85+'}</div>
            <div className="text-xs text-slate-400 mt-1">Proyek Sukses Selesai</div>
          </div>
          <div className="glass-card p-6 rounded-2xl border border-slate-800 text-center">
            <div className="text-3xl font-display font-black text-emerald-400">{aboutContent.clientSatisfactionRate || '99.4%'}</div>
            <div className="text-xs text-slate-400 mt-1">Tingkat Kepuasan Klien</div>
          </div>
          <div className="glass-card p-6 rounded-2xl border border-slate-800 text-center">
            <div className="text-3xl font-display font-black text-purple-400">{aboutContent.teamEngineersCount || '28+'}</div>
            <div className="text-xs text-slate-400 mt-1">Engineer & AI Specialist</div>
          </div>
        </div>

        {/* Vision & Mission Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="glass-card rounded-2xl p-8 border border-white/10 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <Target className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-display font-bold text-white">Visi Perusahaan</h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Menjadi mitra teknologi terdepan di Indonesia yang memperdayakan perusahaan skala nasional hingga enterprise dengan solusi software kustom berbasis AI yang mempercepat efisiensi dan pertumbuhan operasional.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-8 border border-white/10 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-950 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
              <Sparkles className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-display font-bold text-white">Misi Utama</h2>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>Merancang arsitektur aplikasi custom yang presisi sesuai alur kerja bisnis.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>Mengintegrasikan teknologi AI generatif dan analitik untuk efisiensi maksimal.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>Memberikan dukungan teknis jangka panjang dan pendampingan implementasi.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Values */}
        <div className="glass-card rounded-2xl p-8 border border-cyan-500/30 text-center space-y-6">
          <h2 className="text-2xl font-display font-bold text-white">Prinsip Rekayasa Perangkat Lunak Kami</h2>
          <div className="grid sm:grid-cols-3 gap-6 text-left pt-4">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-sm font-bold text-cyan-300 font-display">1. Precision Engineering</div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Setiap baris kode dan skema database dirancang dengan standar kualitas tinggi tanpa kompromi.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-sm font-bold text-cyan-300 font-display">2. Human-Centered AI</div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Kecerdasan buatan hadir untuk memperkuat dan mempermudah pekerjaan tim, bukan membingungkan.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-sm font-bold text-cyan-300 font-display">3. Long-Term Partnership</div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Kami mendampingi perkembangan software seiring tumbuhnya skala bisnis perusahaan Anda.
              </p>
            </div>
          </div>

          <div className="pt-6">
            <button
              onClick={onOpenConsultation}
              className="px-8 py-3.5 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 text-white font-bold text-xs rounded-xl shadow-lg shadow-cyan-500/20 transition-all cursor-pointer"
            >
              Mulai Diskusi dengan Tim Arsitek Kami
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
